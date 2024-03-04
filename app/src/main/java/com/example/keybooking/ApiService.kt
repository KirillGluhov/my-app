package com.example.keybooking

import com.example.keybooking.data.dto.LoginCredentials
import com.example.keybooking.data.dto.UserRegister
import com.example.keybooking.data.model.Token
import retrofit2.Call
import retrofit2.http.Body

import retrofit2.http.POST

interface ApiService {
    @POST("api/account/login")
    fun postDataLogin(@Body request: LoginCredentials): Call<Token>
    @POST("api/account/register")
    fun postDataRegister(@Body request: UserRegister): Call<Token>

}