package com.example.keybooking.ui.activity

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import androidx.core.widget.addTextChangedListener
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.data.dto.UserRegister
import com.example.keybooking.databinding.ActivityRegistrationBinding
import com.example.keybooking.viewModel.ProfileVM
import com.example.keybooking.viewModel.Register
import org.koin.androidx.viewmodel.ext.android.viewModel

class RegistrationActivity : AbstractActivity(){

    private lateinit var binding: ActivityRegistrationBinding
    private val viewModel: Register by viewModel()
    private val viewModelProfile: ProfileVM by viewModel()

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegistrationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkFieldsAndEnableButton()

        binding.backButton.setOnClickListener {
            val intent = Intent(this, StartActivity::class.java)
            startActivity(intent)
        }

        binding.loginButton.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        binding.regButton.setOnClickListener {
            if (checkPasswords()) {
                //println("ON SECOND!!!!!")
                //println(viewModel.registrationData.value)
                val requestDto = UserRegister(
                    fullName = binding.editTextLogin.text.toString(),
                    password = binding.editTextPassword.text.toString(),
                    email = binding.editTextEmail.text.toString()
                )
                viewModel.register(requestDto)

            }
        }

        binding.editTextLogin.addTextChangedListener {
            binding.editTextLogin.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        binding.editTextEmail.addTextChangedListener {
            binding.editTextEmail.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        binding.editTextPassword.addTextChangedListener {
            binding.editTextPassword.checkEmpty(binding.error)
            checkFieldsAndEnableButton()
        }

        binding.editTextRepeatPassword.addTextChangedListener {
            binding.editTextRepeatPassword.checkEmpty(binding.error)
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
                binding.error.visibility = View.VISIBLE
                binding.error.text = responseData.toString()
            }
        })
    }

    private fun checkPasswords() : Boolean {
        if (binding.editTextPassword.text.toString() != binding.editTextRepeatPassword.text.toString()) {
            binding.error.visibility = View.VISIBLE
            binding.error.text = resources.getString(R.string.password_eq_error)
            return false
        }
        return true
    }

    private fun checkFieldsAndEnableButton () {
        binding.error.visibility = View.GONE
        binding.error.text = ""
        binding.regButton.setEnable(listOf(
            binding.editTextLogin,
            binding.editTextEmail,
            binding.editTextPassword,
            binding.editTextRepeatPassword
        ).all { it.text!!.isNotBlank()})
    }
}