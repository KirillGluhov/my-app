package com.example.keybooking.data.dto

data class CreateRequest(
    val keyId : String,
    val dateToBeBooked : String,
    val timeSlot : String,
    val description : String,
    val isRepetetive: Boolean
)
