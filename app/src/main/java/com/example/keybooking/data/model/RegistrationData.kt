package com.example.moviecatalog2023.data.model

data class RegistrationData(val userName: String,
                            val name: String,
                            val email: String,
                            val birthDate: String,
                            val gender: Int) : Model
