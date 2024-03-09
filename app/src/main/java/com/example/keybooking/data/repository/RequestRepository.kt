package com.example.keybooking.data.repository

import com.example.keybooking.ApiService
import com.example.keybooking.data.model.KeysForUser
import com.example.keybooking.data.Result
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
}