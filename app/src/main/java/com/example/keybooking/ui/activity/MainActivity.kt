package com.example.keybooking.ui.activity

import android.content.Intent
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.keybooking.databinding.ActivityMainBinding
import com.example.keybooking.ui.holders.RequestData
import com.example.keybooking.ui.holders.RequestsAdapter
import com.example.keybooking.ui.holders.RequestsHolder
import com.example.keybooking.ui.holders.Status

class MainActivity: AbstractActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var adapter: RequestsAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val dataList = mutableListOf<RequestData>(
            RequestData(
                "12.11.24",
                "12:25",
                "14:00",
                "302",
                Status.ACCEPT
            ),
            RequestData(
                "11.01.2024",
                "18:25",
                "20:00",
                "233",
                Status.WAIT
            ),
            RequestData(
                "12.11.24",
                "10:35",
                "12:10",
                "042",
                Status.ACCEPT
            ),
            RequestData(
                "12.11.24",
                "12:25",
                "14:00",
                "302",
                Status.ACCEPT
            ),
            RequestData(
                "11.01.2024",
                "18:25",
                "20:00",
                "233",
                Status.WAIT
            ),
            RequestData(
                "12.11.24",
                "10:35",
                "12:10",
                "042",
                Status.ACCEPT
            ),
            RequestData(
                "12.11.24",
                "12:25",
                "14:00",
                "302",
                Status.ACCEPT
            ),
            RequestData(
                "11.01.2024",
                "18:25",
                "20:00",
                "233",
                Status.WAIT
            ),
            RequestData(
                "12.11.24",
                "10:35",
                "12:10",
                "042",
                Status.ACCEPT
            ),
        )

        adapter = RequestsAdapter(this, dataList)

        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = adapter
    }
}