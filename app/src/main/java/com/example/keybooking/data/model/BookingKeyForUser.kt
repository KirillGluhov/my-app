package com.example.keybooking.data.model

data class BookingKeyForUser(
    val key: Key,
    val bookingDate: String,
    val timeSlot: String,
    val description: String,
    val requestStatus: String,
    val requestId: String,
    val isKeyRecieved: Boolean,
    val isKeyReturned: Boolean,
    val isRepetitive: Boolean
) : Model
