package com.example.keybooking.ui.activity

import android.content.Intent
import android.os.Bundle
import com.example.keybooking.databinding.ActivityMainBinding

class MainActivity: AbstractActivity() {
    private lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}