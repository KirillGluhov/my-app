package com.example.moviecatalog2023.data.dto

data class EditProfile (
    val id: String,
    val nickName: String,
    val email: String,
    val avatarLink: String?,
    val name: String,
    val birthDate: String,
    val gender: Int
) : DTO