package com.example.moviecatalog2023.data.dto

data class UserRegister(val userName: String,
                        val name: String,
                        val password: String,
                        val email: String,
                        val birthDate: String,
                        val gender: Int) : DTO