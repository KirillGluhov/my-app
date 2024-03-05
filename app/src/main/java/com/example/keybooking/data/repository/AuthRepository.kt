package com.example.keybooking.data.repository

import com.example.keybooking.ApiService
import com.example.keybooking.data.dto.LoginCredentials
import com.example.keybooking.data.model.Token
import com.example.keybooking.data.Result
import com.example.keybooking.data.dto.UserRegister
import com.google.gson.Gson
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

class AuthRepository(private val apiService: ApiService) : Repository {
    suspend fun postLogin(requestDto: LoginCredentials): Result<Token> {
        val call = apiService.postDataLogin(requestDto)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<Token> {
                override fun onResponse(call: Call<Token>, response: Response<Token>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            400 -> {
                                var errors = ""
                                val errorBody = response.errorBody()?.string()
                                if (errorBody != null) {
                                    val jsonObject = JSONObject(errorBody)
                                    val errorsObject = jsonObject.getJSONObject("errors")
                                    val keys = errorsObject.keys()
                                    while (keys.hasNext()) {
                                        val errorName = keys.next()
                                        println(errorName)
                                        val errorMessage = errorsObject.getJSONArray(errorName).getString(0)
                                        errors += "$errorMessage "
                                    }
                                }
                                println(errors)
                                continuation.resume(Result.Error(errors))
                            }
                            403 -> continuation.resume(Result.Error("Login failed"))
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }

                override fun onFailure(call: Call<Token>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun postRegister(requestDto: UserRegister): Result<Token> {
        val call = apiService.postDataRegister(requestDto)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<Token> {
                override fun onResponse(call: Call<Token>, response: Response<Token>) {
                    println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        when (response.code()) {
                            400 -> {
                                var errors = ""
                                val errorBody = response.errorBody()?.string()
                                if (errorBody != null) {
                                    val jsonObject = JSONObject(errorBody)
                                    try {
                                        val errorsObject = jsonObject.getJSONObject("errors")
                                        val keys = errorsObject.keys()
                                        while (keys.hasNext()) {
                                            val errorName = keys.next()
                                            println(errorName)
                                            val errorMessage = errorsObject.getJSONArray(errorName).getString(0)
                                            errors += "$errorMessage "
                                            println(errors)
                                            continuation.resume(Result.Error(errors))
                                        }
                                    }
                                    catch (e : Exception) {
                                        continuation.resume(Result.Error(jsonObject.getString("title")))
                                    }
                                }
                            }
                            403 -> continuation.resume(Result.Error("Login failed"))
                            else -> continuation.resume(Result.Error(response.errorBody()!!.string()))
                        }
                    }
                }

                override fun onFailure(call: Call<Token>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }
}