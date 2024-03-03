package com.example.moviecatalog2023.service.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.AuthRepository
import com.example.moviecatalog2023.data.dto.LoginCredentials
import com.example.moviecatalog2023.data.Result
import com.example.moviecatalog2023.data.model.Token
import com.example.moviecatalog2023.data.repository.TokenRepository
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
                    _responseDataLiveData.postValue(result.data)
                    saveToken(result.data!!.token)
                }
                is Result.Error -> _errorLiveData.postValue(result.message)
                is Result.Unauthorized -> {}
            }
        }
    }

    /*
    fun getTokenToActivity() : String? {
        return getToken()
    }

    fun getToken(): String? {
        return tokenRepository.getUserToken()
    }

     */

    private fun saveToken(accessToken: String) {
        viewModelScope.launch {
            tokenRepository.saveUserToken(accessToken)
        }
    }
}
