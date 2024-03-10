package com.example.keybooking.data.repository

import com.example.keybooking.ApiService
import com.example.keybooking.data.model.Profile
import com.example.keybooking.data.room.entity.User
import com.example.moviecatalog2023.data.room.dao.UserDao
import kotlin.coroutines.suspendCoroutine
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.coroutines.resume
import com.example.keybooking.data.Result
import com.example.keybooking.data.dto.EditProfile
import com.example.keybooking.data.model.BaseResult

class UserRepository(private val apiService: ApiService, private val dao: UserDao) : Repository {

    suspend fun getUser(): Result<Profile> {
        val call = apiService.getUserData()
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<Profile> {
                override fun onResponse(call: Call<Profile>, response: Response<Profile>) {
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
                override fun onFailure(call: Call<Profile>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun editUser(requestDto: EditProfile): Result<BaseResult> {
        val call = apiService.putDataProfile(requestDto)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<BaseResult> {
                override fun onResponse(call: Call<BaseResult>, response: Response<BaseResult>) {
                    println(response)
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success())
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> {
                                continuation.resume(Result.Error(response.errorBody().toString()))
                            }
                        }
                    }
                }

                override fun onFailure(call: Call<BaseResult>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

    suspend fun logout(): Result<BaseResult> {
        val call = apiService.logout()
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

    fun saveUser(user: User) {
        dao.insertUser(user)
    }

    fun getUserById(id: Int): User? {
        return dao.getUserById(id)
    }
}