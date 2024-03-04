package com.example.moviecatalog2023.data.room.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.keybooking.data.room.entity.User

@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUser(user: User)

    @Query("SELECT * FROM user WHERE id = :userId")
    fun getUserById(userId: Int): User?

    @Query("SELECT user_id FROM user WHERE id = :userId")
    fun getUserId(userId: Int): String?
}