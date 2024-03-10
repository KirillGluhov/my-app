package com.example.keybooking.ui.fragment

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.data.dto.EditProfile
import com.example.keybooking.databinding.FragmentProfileBinding
import com.example.keybooking.ui.activity.MainActivity
import com.example.keybooking.ui.activity.StartActivity
import com.example.keybooking.viewModel.ProfileVM
import org.koin.androidx.viewmodel.ext.android.viewModel

class ProfileFragment : DialogFragment() {

    private lateinit var binding: FragmentProfileBinding
    private val viewModel: ProfileVM by viewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentProfileBinding.inflate(inflater, container, false)

        viewModel.profileData()

        binding.backButton.setOnClickListener {
            dismiss()
        }

        binding.saveButton.setOnClickListener {
            if (checkPasswords()) {
                binding.error.visibility = View.GONE
                viewModel.profileUpdate(EditProfile(
                    binding.editTextPassword.text.toString(),
                    binding.editTextLogin.text.toString()
                ))
            }
        }

        binding.logoutButton.setOnClickListener {
            viewModel.logout()
        }


        viewModel.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                when (responseData.userRole) {
                    "Student" -> {
                        binding.role.text = resources.getString(R.string.student)
                    }
                    "Teacher" -> {
                        binding.role.text = resources.getString(R.string.teacher)
                    }
                    "Principal" -> {
                        binding.role.text = resources.getString(R.string.principal)
                    }
                    "Admin" -> {
                        binding.role.text = resources.getString(R.string.admin)
                    }
                }
                binding.editTextLogin.setText(responseData.fullName)
            }
        })

        viewModel.messageLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                binding.error.visibility = View.VISIBLE
                binding.error.text = "успешно"
            }
        })

        viewModel.messageLogoutLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                binding.error.visibility = View.VISIBLE
                binding.error.text = "успешно"
                val intent = Intent(context, StartActivity::class.java)
                startActivity(intent)
            }
        })

        viewModel.unauthorizedErrorLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                val intent = Intent(context, StartActivity::class.java)
                startActivity(intent)
            }
        })



        return binding.root
    }

    private fun checkPasswords() : Boolean {
        if (binding.editTextPassword.text.toString() != binding.editTextRepeatPassword.text.toString()) {
            binding.error.visibility = View.VISIBLE
            binding.error.text = resources.getString(R.string.password_eq_error)
            return false
        }
        return true
    }
}

