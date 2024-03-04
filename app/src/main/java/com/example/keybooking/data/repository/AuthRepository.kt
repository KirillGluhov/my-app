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
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        val errorBody = response.errorBody()?.string()
                        val error = Gson().fromJson(errorBody, Result.Error::class.java)
                        continuation.resume(error)
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
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success(response.body()!!))
                    } else {
                        var errors = ""
                        val errorBody = response.errorBody()?.string()
                        //println(errorBody)
                        val jsonObject = JSONObject(errorBody)
                        val errorsObject = jsonObject.getJSONObject("errors")
                        val keys = errorsObject.keys()
                        while (keys.hasNext()) {
                            val errorName = keys.next()
                            val errorMessage = errorsObject.
                                        getJSONObject(errorName).
                                        getJSONArray("errors").
                                        getJSONObject(0).
                                        getString("errorMessage")
                            errors += "$errorMessage "
                        }
                        //val error = Gson().fromJson(errorBody, Result.Error::class.java)
                        continuation.resume(Result.Error(errors))
                    }
                }

                override fun onFailure(call: Call<Token>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }
}