package com.example.keybooking.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.AuthRepository
import com.example.keybooking.data.Result
import com.example.keybooking.data.dto.UserRegister
import com.example.keybooking.data.model.RegistrationData
import com.example.keybooking.data.model.Token
import com.example.keybooking.data.repository.TokenRepository
import kotlinx.coroutines.launch

class Register(private val repository: AuthRepository, private val tokenRepository: TokenRepository) : ViewModel() {
    val _responseDataLiveData = MutableLiveData<Token?>()
    val responseDataLiveData: LiveData<Token?>
        get() = _responseDataLiveData

    private val _errorLiveData = MutableLiveData<String>()
    val errorLiveData: LiveData<String>
        get() = _errorLiveData

    private val _registrationData = MutableLiveData<RegistrationData?>()
    val registrationData: LiveData<RegistrationData?>
        get() = _registrationData

    fun setRegistrationData(data: RegistrationData) {
        _registrationData.value = data
    }

    fun register(requestDto: UserRegister) {
        viewModelScope.launch {
            when (val result = repository.postRegister(requestDto)) {
                is Result.Success -> {
                    _responseDataLiveData.postValue(result.data)
                    saveToken(result.data!!.token)
                }
                is Result.Error -> _errorLiveData.postValue(result.message)
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