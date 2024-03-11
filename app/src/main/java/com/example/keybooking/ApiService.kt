package com.example.keybooking

import com.example.keybooking.data.dto.ConcreteKeyBookingInfo
import com.example.keybooking.data.dto.CreateRequest
import com.example.keybooking.data.dto.EditProfile
import com.example.keybooking.data.dto.LoginCredentials
import com.example.keybooking.data.dto.UserRegister
import com.example.keybooking.data.model.BaseResult
import com.example.keybooking.data.model.BookingInfo
import com.example.keybooking.data.model.BookingKeyForUser
import com.example.keybooking.data.model.KeysForUser
import com.example.keybooking.data.model.Profile
import com.example.keybooking.data.model.Token
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET

import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @POST("api/auth/login")
    fun postDataLogin(@Body request: LoginCredentials): Call<Token>
    @POST("api/auth/register")
    fun postDataRegister(@Body request: UserRegister): Call<Token>

    @GET("api/requests/GetUserRequests")
    fun getUserKeys(): Call<MutableList<BookingKeyForUser>>

    @GET("api/keys/GetConcreteKeyBookingInfo")
    fun getBookingInfo(
        @Query("Period.Key") period : String,
        @Query("Period.Value") value : String,
        @Query("Auditory") aud : String
    ): Call<BookingInfo>

    @POST("api/requests/CreateRequest")
    fun postNewRequest(@Body request: CreateRequest): Call<String>

    @GET("api/account/profile")
    fun getUserData(): Call<Profile>

    @PUT("api/account/profile")
    fun putDataProfile(@Body request: EditProfile): Call<BaseResult>

    @POST("/api/keys/{requestId}/confirm")
    fun confirm(@Path("requestId") id : String): Call<BaseResult>

    @POST("/api/keys/ReturnKeyToPrincipal")
    fun returnKey(@Query("requestId") id : String): Call<BaseResult>

    @POST("/api/requests/cancel/{requestId}")
    fun delete(@Path("requestId") id : String): Call<Void>

    @POST("/api/auth/logout")
    fun logout(): Call<BaseResult>

}