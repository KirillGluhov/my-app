package com.example.keybooking.ui.activity

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.core.widget.addTextChangedListener
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.databinding.ActivityLoginBinding
import com.example.moviecatalog2023.data.dto.LoginCredentials
import com.example.moviecatalog2023.service.viewModel.Login
import com.example.moviecatalog2023.service.viewModel.ProfileVM

class LoginActivity: AbstractActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val viewModel: Login by viewModel()
    private val viewModelProfile: ProfileVM by viewModel()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkFieldsAndEnableButton()

        binding.editTextLogin.addTextChangedListener {
            binding.editTextLogin.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        binding.editTextPassword.addTextChangedListener {
            binding.editTextPassword.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        viewModel.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                //binding.error.visibility = View.VISIBLE
                //binding.error.text = "NOT ERROR " + viewModel.getTokenToActivity()
                //viewModelProfile.profileData()
            }
        })

        viewModelProfile.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                //val intent = Intent(this, MainScreenActivity::class.java)
                //startActivity(intent)
            }
        })

        viewModel.errorLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                binding.error.visibility = View.VISIBLE
                if (responseData.toString() == "Login failed") {
                    binding.error.text = resources.getString(R.string.login_error)
                }
                else {
                    binding.error.text = responseData.toString()
                }
                binding.editTextLogin.background = getDrawable(R.drawable.error_field)
                binding.editTextPassword.background = getDrawable(R.drawable.error_field)
            }
        })

        binding.backButton.setOnClickListener {
            val intent = Intent(this, StartActivity::class.java)
            startActivity(intent)
        }
        binding.loginButton.setOnClickListener {
            binding.error.visibility = View.GONE
            binding.editTextLogin.background = getDrawable(R.drawable.form_field)
            binding.editTextPassword.background = getDrawable(R.drawable.form_field)
            val requestDto = LoginCredentials(
                binding.editTextLogin.text.toString(),
                binding.editTextPassword.text.toString())
            viewModel.login(requestDto)
        }
    }

    private fun checkFieldsAndEnableButton () {
        binding.error.visibility = View.GONE
        binding.error.text = ""
        binding.loginButton.setEnable(listOf(
            binding.editTextLogin,
            binding.editTextPassword
        ).all { it.text!!.isNotBlank()})
    }
}