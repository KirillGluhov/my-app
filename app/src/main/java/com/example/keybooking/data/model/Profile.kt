package com.example.keybooking.data.model

import com.example.keybooking.data.room.entity.User
import com.example.keybooking.data.dto.EditProfile

data class Profile(
    val id: String,
    val nickName: String,
    val email: String,
    val avatarLink: String?,
    val name: String,
    val birthDate: String,
    val gender: Int
) : Model

fun Profile.toEntity(): User {
    return User(
        user_id = id,
        nickName = nickName,
        email = email,
        avatarLink = avatarLink,
        name = name,
        birthDate = birthDate,
        gender = gender
    )
}

fun Profile.toDto(): EditProfile {
    return EditProfile(
        id = id,
        nickName = nickName,
        email = email,
        avatarLink = avatarLink,
        name = name,
        birthDate = birthDate,
        gender = gender
    )
}
