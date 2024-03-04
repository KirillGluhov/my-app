package com.example.keybooking.data.dto

import com.example.keybooking.data.dto.DTO

data class EditProfile (
    val id: String,
    val nickName: String,
    val email: String,
    val avatarLink: String?,
    val name: String,
    val birthDate: String,
    val gender: Int
) : DTO