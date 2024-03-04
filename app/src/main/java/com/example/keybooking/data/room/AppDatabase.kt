package com.example.keybooking.data.room

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.keybooking.data.room.entity.User
import com.example.moviecatalog2023.data.room.dao.UserDao
import com.example.moviecatalog2023.data.room.dao.UserTokenDao
import com.example.keybooking.data.room.entity.UserToken

@Database(entities = [
    UserToken::class,
    User::class
    ],
    version = 3,
    exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userTokenDao(): UserTokenDao
    abstract fun userDao(): UserDao
}