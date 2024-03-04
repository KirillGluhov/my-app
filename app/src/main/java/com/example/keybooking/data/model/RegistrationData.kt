package com.example.keybooking.data.model

import com.example.keybooking.data.model.Model

data class RegistrationData(val userName: String,
                            val name: String,
                            val email: String,
                            val birthDate: String,
                            val gender: Int) : Model
