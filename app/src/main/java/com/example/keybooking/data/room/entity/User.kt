package com.example.keybooking.data.room.entity

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.keybooking.data.model.Profile

@Entity(tableName = "user")
data class User(
    @PrimaryKey
    val id : Int = 1,
    val fullName: String,
    val email: String,
    val userRole: String,
) : AbsEntity
