package com.example.moviecatalog2023.data.room.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.keybooking.data.room.entity.UserToken

@Dao
interface UserTokenDao {
    @Query("SELECT * FROM user_token WHERE id = 1")
    fun getUserToken(): UserToken?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUserToken(userToken: UserToken)
}