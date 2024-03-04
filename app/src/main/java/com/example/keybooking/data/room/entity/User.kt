package com.example.keybooking.data.room.entity

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.keybooking.data.model.Profile

@Entity(tableName = "user")
data class User(
    @PrimaryKey
    val id : Int = 1,
    @ColumnInfo(name = "user_id")
    val user_id: String,
    @ColumnInfo(name = "nick")
    val nickName: String,
    @ColumnInfo(name = "email")
    val email: String,
    @ColumnInfo(name = "avatar")
    var avatarLink: String?,
    @ColumnInfo(name = "name")
    val name: String,
    @ColumnInfo(name = "bd")
    val birthDate: String,
    @ColumnInfo(name = "gender")
    val gender: Int
) : AbsEntity

fun User.toModel(): Profile {
    return Profile(
        id = user_id,
        nickName = nickName,
        email = email,
        avatarLink = avatarLink,
        name = name,
        birthDate = birthDate,
        gender = gender
    )
}