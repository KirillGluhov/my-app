package com.example.moviecatalog2023.data.model

import com.example.moviecatalog2023.data.dto.EditProfile
import com.example.moviecatalog2023.data.room.entity.User

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
