package com.example.keybooking.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.AuthRepository
import com.example.keybooking.data.dto.LoginCredentials
import com.example.keybooking.data.Result
import com.example.keybooking.data.model.Token
import com.example.keybooking.data.repository.TokenRepository
import kotlinx.coroutines.launch

class Login(private val repository: AuthRepository, private val tokenRepository: TokenRepository) : ViewModel() {

    val _responseDataLiveData = MutableLiveData<Token?>()
    val responseDataLiveData: LiveData<Token?>
        get() = _responseDataLiveData

    private val _errorLiveData = MutableLiveData<String>()
    val errorLiveData: LiveData<String>
        get() = _errorLiveData

    fun login(requestDto: LoginCredentials) {
        viewModelScope.launch {
            when (val result = repository.postLogin(requestDto)) {
                is Result.Success -> {
                    println(result)
                    _responseDataLiveData.postValue(result.data)
                    saveToken(result.data!!.accessToken)
                }
                is Result.Error -> {
                    println(result)
                    _errorLiveData.postValue(result.message)
                }
                is Result.Unauthorized -> {}
            }
        }
    }

    private fun saveToken(accessToken: String) {
        viewModelScope.launch {
            tokenRepository.saveUserToken(accessToken)
        }
    }
}
