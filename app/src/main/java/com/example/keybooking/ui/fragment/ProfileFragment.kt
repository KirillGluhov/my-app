package com.example.keybooking.ui.fragment

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.databinding.FragmentProfileBinding
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



        return binding.root
    }
}

