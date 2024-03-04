package com.example.keybooking.data

sealed class Result<out T> {
    data class Success<out T>(val data: T? = null) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    data object Unauthorized : Result<Nothing>()
}