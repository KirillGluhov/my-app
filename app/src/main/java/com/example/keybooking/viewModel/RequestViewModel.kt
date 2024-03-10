package com.example.keybooking.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.keybooking.data.repository.RequestRepository
import com.example.keybooking.data.Result
import com.example.keybooking.data.dto.ConcreteKeyBookingInfo
import com.example.keybooking.data.dto.CreateRequest
import com.example.keybooking.data.model.BookingInfo
import com.example.keybooking.data.model.BookingKeyForUser
import com.example.keybooking.data.model.KeysForUser
import kotlinx.coroutines.launch

class RequestViewModel(val repository: RequestRepository) : ViewModel() {

    val _responseDataLiveData = MutableLiveData<MutableList<BookingKeyForUser>?>()
    val responseDataLiveData: LiveData<MutableList<BookingKeyForUser>?>
        get() = _responseDataLiveData


    val _responseBookingInfoLiveData = MutableLiveData<BookingInfo?>()
    val responseBookingInfoLifeData: LiveData<BookingInfo?>
        get() = _responseBookingInfoLiveData

    val _responseCreateLiveData = MutableLiveData<String?>()
    val responseCreateLifeData: LiveData<String?>
        get() = _responseCreateLiveData

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

    fun getKeyBookingInfo(requestDto : ConcreteKeyBookingInfo) {
        viewModelScope.launch {
            when (val result = repository.getKeyBookingInfo(requestDto)) {
                is Result.Success -> {
                    _responseBookingInfoLiveData.postValue(result.data)
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

    fun createRequest(requestDto : CreateRequest) {
        viewModelScope.launch {
            when (val result = repository.postCreateRequest(requestDto)) {
                is Result.Success -> {
                    _responseCreateLiveData.postValue(result.data)
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


}