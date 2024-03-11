package com.example.keybooking.ui.activity

import com.example.keybooking.ui.holders.RequestData

interface RequestListener {
    fun showDialogFragment(data : RequestData)
}