package com.example.keybooking.data.repository

import com.example.keybooking.ApiService
import com.example.keybooking.data.model.KeysForUser
import com.example.keybooking.data.Result
import com.example.keybooking.data.dto.ConcreteKeyBookingInfo
import com.example.keybooking.data.dto.CreateRequest
import com.example.keybooking.data.model.BaseResult
import com.example.keybooking.data.model.BookingInfo
import com.example.keybooking.data.model.BookingKeyForUser
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

class RequestRepository(private val apiService: ApiService) : Repository {
    suspend fun getUserKeyList() : Result<MutableList<BookingKeyForUser>> {
        val call = apiService.getUserKeys()
        println("start response")
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<MutableList<BookingKeyForUser>> {
                override fun onResponse(call: Call<MutableList<BookingKeyForUser>>, response: Response<MutableList<BookingKeyForUser>>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }
                override fun onFailure(call: Call<MutableList<BookingKeyForUser>>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun getKeyBookingInfo(requestDto : ConcreteKeyBookingInfo) : Result<BookingInfo> {
        val call = apiService.getBookingInfo(requestDto.period, requestDto.value, requestDto.auditory)
        println("start response")
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<BookingInfo> {
                override fun onResponse(call: Call<BookingInfo>, response: Response<BookingInfo>) {
                    println(response)
                    if (response.isSuccessful) {
                        println("BODY" + response.body())
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            404 -> continuation.resume(Result.Error("404"))
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }
                override fun onFailure(call: Call<BookingInfo>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun postCreateRequest(requestDto : CreateRequest) : Result<String> {
        val call = apiService.postNewRequest(requestDto)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<String> {
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }
                override fun onFailure(call: Call<String>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun confirmKey(requestId : String) : Result<BaseResult> {
        val call = apiService.confirm(requestId)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<BaseResult> {
                override fun onResponse(call: Call<BaseResult>, response: Response<BaseResult>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }
                override fun onFailure(call: Call<BaseResult>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun returnKey(requestId : String) : Result<BaseResult> {
        val call = apiService.returnKey(requestId)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<BaseResult> {
                override fun onResponse(call: Call<BaseResult>, response: Response<BaseResult>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }
                override fun onFailure(call: Call<BaseResult>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun deleteRequest(requestId : String) : Result<Void> {
        val call = apiService.delete(requestId)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()))
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }
                override fun onFailure(call: Call<Void>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }
}