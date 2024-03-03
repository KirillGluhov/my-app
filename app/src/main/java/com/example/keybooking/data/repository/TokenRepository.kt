package com.example.moviecatalog2023.data.repository

import com.example.keybooking.data.repository.Repository
import com.example.moviecatalog2023.data.room.dao.UserTokenDao
import com.example.moviecatalog2023.data.room.entity.UserToken

class TokenRepository(private val dao: UserTokenDao) : Repository {
    fun getUserToken(): String? {
        return dao.getUserToken()?.accessToken
    }

    fun saveUserToken(accessToken: String) {
        dao.insertUserToken(UserToken(accessToken = accessToken))
    }
}