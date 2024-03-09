package com.example.keybooking.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.RequestRepository
import com.example.keybooking.data.Result
import com.example.keybooking.data.model.BookingKeyForUser
import com.example.keybooking.data.model.KeysForUser
import kotlinx.coroutines.launch

class RequestViewModel(val repository: RequestRepository) : ViewModel() {

    val _responseDataLiveData = MutableLiveData<MutableList<BookingKeyForUser>?>()
    val responseDataLiveData: LiveData<MutableList<BookingKeyForUser>?>
        get() = _responseDataLiveData

    private val _errorLiveData = MutableLiveData<String>()
    val errorLiveData: LiveData<String>
        get() = _errorLiveData

    private val _unauthorizedErrorLiveData = MutableLiveData<Boolean>()
    val unauthorizedErrorLiveData: LiveData<Boolean>
        get() = _unauthorizedErrorLiveData


    fun getUserKeys() {
        viewModelScope.launch {
            println("start view model")
            when (val result = repository.getUserKeyList()) {
                is Result.Success -> {
                    println("SUCCESS " + result.data)
                    _responseDataLiveData.postValue(result.data)
                }
                is Result.Error -> {
                    println("ERROR " + result.message)
                    _errorLiveData.postValue(result.message)
                }
                is Result.Unauthorized -> {
                    _unauthorizedErrorLiveData.postValue(true)
                }
            }
        }
    }
}