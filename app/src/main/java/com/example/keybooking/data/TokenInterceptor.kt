package com.example.keybooking.data

import com.example.keybooking.data.repository.TokenRepository
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response

class TokenInterceptor(private val tokenRepository: TokenRepository) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        val accessToken = runBlocking {
            tokenRepository.getUserToken()
        }
        val requestBuilder = originalRequest.newBuilder()
        if (!accessToken.isNullOrBlank()) {
            requestBuilder.header("Authorization", "Bearer $accessToken")
        }

        val request = requestBuilder.build()
        return chain.proceed(request)
    }
}