package com.example.keybooking.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.UserRepository
import com.example.keybooking.data.room.entity.User
import com.example.keybooking.data.model.Profile
import com.example.keybooking.data.repository.TokenRepository
import kotlinx.coroutines.launch
import com.example.keybooking.data.Result
import com.example.keybooking.data.dto.EditProfile
import com.example.keybooking.data.model.toEntity


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

    fun saveToken(accessToken: String) {
        viewModelScope.launch {
            tokenRepository.saveUserToken(accessToken)
            println("token saved!!")
        }
    }

    fun getToken(): String? {
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
}