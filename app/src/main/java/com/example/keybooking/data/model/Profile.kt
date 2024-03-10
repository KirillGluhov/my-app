package com.example.keybooking.data.model

import com.example.keybooking.data.room.entity.User
import com.example.keybooking.data.dto.EditProfile

data class Profile(
    val fullName : String,
    val email : String,
    val userRole : String
) : Model

fun Profile.toEntity(): User {
    return User(
        fullName = fullName,
        email = email,
        userRole = userRole
    )
}

