package com.example.keybooking.data.model

import com.example.keybooking.data.model.Model

data class PageInfo(
    val pageSize: Int,
    val pageCount: Int,
    val currentPage: Int
) : Model