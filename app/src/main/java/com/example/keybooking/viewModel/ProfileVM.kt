package com.example.moviecatalog2023.service.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.UserRepository
import com.example.keybooking.data.room.entity.User
import com.example.keybooking.data.model.Profile
import com.example.keybooking.data.repository.TokenRepository
import kotlinx.coroutines.launch

class ProfileVM(private val repository: UserRepository, private val tokenRepository: TokenRepository) : ViewModel() {
    val _responseDataLiveData = MutableLiveData<Profile?>()
    val responseDataLiveData: LiveData<Profile?>
        get() = _responseDataLiveData

    private val _errorLiveData = MutableLiveData<String>()
    val errorLiveData: LiveData<String>
        get() = _errorLiveData

    val _messageLiveData = MutableLiveData<String?>()
    val messageLiveData: LiveData<String?>
        get() = _messageLiveData

    private val _unauthorizedErrorLiveData = MutableLiveData<Boolean>()
    val unauthorizedErrorLiveData: LiveData<Boolean>
        get() = _unauthorizedErrorLiveData

    /*
    fun profileData() {
        viewModelScope.launch {
            when (val result = repository.getUser()) {
                is Result.Success -> {
                    repository.saveUser(result.data!!.toEntity())
                    _responseDataLiveData.postValue(result.data)
                }
                is Result.Error -> {
                    _errorLiveData.postValue(result.message)
                }
                is Result.Unauthorized -> {
                    _unauthorizedErrorLiveData.postValue(true)
                }
            }
        }
    }

    fun profileUpdate(requestDto : EditProfile) {
        viewModelScope.launch {
            when (val result = repository.editUser(requestDto)) {
                is Result.Success -> {
                    //println("success")
                    profileData()
                    _messageLiveData.postValue("OK!!!")
                }
                is Result.Error -> {
                    //println("error")
                    _errorLiveData.postValue(result.message)
                }
                is Result.Unauthorized -> {
                    _unauthorizedErrorLiveData.postValue(true)
                }
            }
        }
    }

     */

    fun test() : String {
        return "OK!"
    }

    fun saveToken(accessToken: String) {
        viewModelScope.launch {
            tokenRepository.saveUserToken(accessToken)
        }
    }

    fun getToken(): String? {
        //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InFxcXFxcSIsImVtYWlsIjoic3RyaW5nIiwibmJmIjoxNzA0Nzk3OTYwLCJleHAiOjE3MDQ4MDE1NjAsImlhdCI6MTcwNDc5Nzk2MCwiaXNzIjoiaHR0cHM6Ly9yZWFjdC1taWR0ZXJtLmtyZW9zb2Z0LnNwYWNlLyIsImF1ZCI6Imh0dHBzOi8vcmVhY3QtbWlkdGVybS5rcmVvc29mdC5zcGFjZS8ifQ.vkLBXMEcGbgzWYAcx2bkjQvlBmNd9J_x0WsfiDM_Bm0"
        return tokenRepository.getUserToken()
    }

    fun saveUser(user: User) {
        viewModelScope.launch {
            repository.saveUser(user)
        }
    }

    fun getCurrentUser() : User? {
        return repository.getUserById(1)
    }

    fun getCurrentUserId() : String? {
        return repository.getUserIdById(1)
    }
}