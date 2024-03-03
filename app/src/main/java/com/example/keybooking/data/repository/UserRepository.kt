package com.example.keybooking.data.repository

import com.example.keybooking.ApiService
import com.example.keybooking.data.room.entity.User
import com.example.moviecatalog2023.data.room.dao.UserDao

class UserRepository(private val apiService: ApiService, private val dao: UserDao) : Repository {
    /*
    suspend fun getUser(): Result<Profile> {
        val call = apiService.getUserData()
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<Profile> {
                override fun onResponse(call: Call<Profile>, response: Response<Profile>) {
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

    suspend fun editUser(requestDto: EditProfile): Result<Void> {
        val call = apiService.putDataProfile(requestDto)
        println(requestDto)
        return suspendCoroutine { continuation ->
            call.enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        continuation.resume(Result.Success())
                    } else {
                        when (response.code()) {
                            401 -> continuation.resume(Result.Unauthorized)
                            else -> {
                                val errorBody = response.errorBody()?.string()
                                val error = Gson().fromJson(errorBody, Result.Error::class.java)
                                continuation.resume(error)
                            }
                        }
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    continuation.resume(Result.Error(t.message ?: "Unknown error"))
                }
            })
        }
    }

     */

    fun saveUser(user: User) {
        dao.insertUser(user)
    }

    fun getUserById(id: Int): User? {
        return dao.getUserById(id)
    }

    fun getUserIdById(id: Int): String? {
        return dao.getUserId(id)
    }
}