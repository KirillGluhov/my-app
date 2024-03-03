package com.example.moviecatalog2023.data.model

data class PageInfo(
    val pageSize: Int,
    val pageCount: Int,
    val currentPage: Int
) :Model