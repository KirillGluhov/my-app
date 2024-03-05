package com.example.keybooking.data.dto

import com.example.keybooking.data.dto.DTO

data class UserRegister(
    val password: String,
    val fullName: String,
    val email: String
) : DTO