package com.example.keybooking.ui.activity

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.lifecycle.Observer
import com.example.keybooking.databinding.ActivitySplashScreenBinding
import com.example.moviecatalog2023.service.viewModel.ProfileVM
import org.koin.androidx.viewmodel.ext.android.viewModel

@SuppressLint("CustomSplashScreen")
class SplashScreenActivity: AbstractActivity() {
    private lateinit var binding: ActivitySplashScreenBinding
    private val viewModel: ProfileVM by viewModel()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)



        val currentUser =  viewModel.getCurrentUser()
        if (currentUser != null) {
            //println(viewModel.getToken())
            //viewModel.profileData()
        }
        else {
            val intent = Intent(this, StartActivity::class.java)
            startActivity(intent)
            finish()
        }

        viewModel.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println(responseData)
                //val intent = Intent(this, MainScreenActivity::class.java)
                //startActivity(intent)
                finish()
            }
            else {
                val intent = Intent(this, StartActivity::class.java)
                startActivity(intent)
                finish()
            }
        })

        viewModel.errorLiveData.observe(this, Observer { responseData ->
            val intent = Intent(this, StartActivity::class.java)
            startActivity(intent)
            finish()
        })

        viewModel.unauthorizedErrorLiveData.observe(this, Observer { responseData ->
            if (responseData) {
                val intent = Intent(this, StartActivity::class.java)
                startActivity(intent)
                finish()
            }
        })
    }
}