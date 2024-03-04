package com.example.keybooking.data.dto

import com.example.keybooking.data.dto.DTO

data class UserRegister(val userName: String,
                        val name: String,
                        val password: String,
                        val email: String,
                        val birthDate: String,
                        val gender: Int) : DTO