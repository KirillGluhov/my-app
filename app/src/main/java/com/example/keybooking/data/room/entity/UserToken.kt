package com.example.keybooking.data.room.entity

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_token")
data class UserToken(
    @PrimaryKey
    val id: Int = 1,
    @ColumnInfo(name = "access_token")
    val accessToken: String
)
