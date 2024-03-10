package com.example.keybooking.ui.activity

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.core.widget.addTextChangedListener
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.databinding.ActivityLoginBinding
import com.example.keybooking.data.dto.LoginCredentials
import com.example.keybooking.viewModel.Login
import com.example.keybooking.viewModel.ProfileVM
import org.koin.androidx.viewmodel.ext.android.viewModel

class LoginActivity: AbstractActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val viewModel: Login by viewModel()
    private val viewModelProfile: ProfileVM by viewModel()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkFieldsAndEnableButton()

        binding.editTextEmail.addTextChangedListener {
            binding.editTextEmail.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        binding.editTextPassword.addTextChangedListener {
            binding.editTextPassword.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        viewModel.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                viewModelProfile.profileData()
            }
        })

        viewModelProfile.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }
        })

        viewModel.errorLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println(responseData)
                binding.error.visibility = View.VISIBLE
                if (responseData.toString() == "Login failed") {
                    binding.error.text = resources.getString(R.string.login_error)
                }
                else {
                    binding.error.text = responseData.toString()
                }
                binding.editTextEmail.background = getDrawable(R.drawable.error_field)
                binding.editTextPassword.background = getDrawable(R.drawable.error_field)
            }
        })

        binding.backButton.setOnClickListener {
            val intent = Intent(this, StartActivity::class.java)
            startActivity(intent)
        }

        binding.regButton.setOnClickListener {
            val intent = Intent(this, RegistrationActivity::class.java)
            startActivity(intent)
        }

        binding.loginButton.setOnClickListener {
            binding.error.visibility = View.GONE
            binding.editTextEmail.background = getDrawable(R.drawable.form_field)
            binding.editTextPassword.background = getDrawable(R.drawable.form_field)
            val requestDto = LoginCredentials(
                binding.editTextEmail.text.toString(),
                binding.editTextPassword.text.toString())
            viewModel.login(requestDto)
        }
    }

    private fun checkFieldsAndEnableButton () {
        binding.error.visibility = View.GONE
        binding.error.text = ""
        binding.loginButton.setEnable(listOf(
            binding.editTextEmail,
            binding.editTextPassword
        ).all { it.text!!.isNotBlank()})
    }
}