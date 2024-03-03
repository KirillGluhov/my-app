package com.example.moviecatalog2023.data.room

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.moviecatalog2023.data.room.dao.UserDao
import com.example.moviecatalog2023.data.room.dao.UserTokenDao
import com.example.moviecatalog2023.data.room.entity.UserToken

@Database(entities = [
    UserToken::class
    ],
    version = 25,
    exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userTokenDao(): UserTokenDao
    abstract fun userDao(): UserDao
}