package com.example.keybooking.ui.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.Window
import androidx.appcompat.widget.AppCompatButton
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.databinding.FragmentProfileBinding
import com.example.keybooking.databinding.FragmentRequestBinding
import com.example.keybooking.databinding.RequestBinding
import com.example.keybooking.ui.holders.RequestData
import com.example.keybooking.ui.holders.Status
import com.example.keybooking.viewModel.ProfileVM
import com.example.keybooking.viewModel.RequestViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class RequestFragment : DialogFragment() {

    private lateinit var binding: FragmentRequestBinding
    private val viewModel: RequestViewModel by viewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
        }
    }

    companion object {
        fun newInstance(data : RequestData) : RequestFragment {
            val fragment = RequestFragment()
            val args = Bundle()
            args.putParcelable("data", data)
            fragment.arguments = args
            return fragment
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentRequestBinding.inflate(inflater, container, false)

        var data = arguments?.getParcelable<RequestData>("data")

        if (data != null) {

            println(data)

            setButtonsStatus(data)

            binding.confirmButton.setOnClickListener {
                println("confirm")
                viewModel.confirmKey(data.requestId)
            }

            binding.returnButton.setOnClickListener {
                println("return")
                viewModel.returnKey(data.requestId)
            }

            binding.deleteButton.setOnClickListener {
                println("delete")
                viewModel.deleteRequest(data.requestId)
            }
        }
        else {
            dismiss()
        }

        binding.error.text = ""

        binding.backButton.setOnClickListener {
            dismiss()
        }

        //for confirm and return
        viewModel.responseRequestLifeData.observe(this, Observer { responseData ->
            if (responseData != null) {
                binding.error.text = "Успешно"
                if (!data!!.isKeyRecieved && !data.isKeyReturned) { //был нажат получить
                    data.isKeyRecieved = true
                    data.isKeyReturned = false
                    setButtonsStatus(data)
                    binding.returnButton.setEnable(true)
                }
                else { //был нажат вернуть
                    data.isKeyReturned = true
                    setButtonsStatus(data)
                }

                binding.returnButton.setEnable(false)
                binding.confirmButton.setEnable(false)
            }
        })

        //for delete
        viewModel.responseCreateLifeData.observe(this, Observer { responseData ->
            if (responseData != null) {
                binding.error.text = "Заявка успешно удалена"
                binding.returnButton.setEnable(false)
                binding.confirmButton.setEnable(false)
            }
        })

        //for errors
        viewModel.errorLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println(responseData)
                binding.error.text = "Что-то пошло не так"
            }
        })



        return binding.root
    }

    private fun setButtonsStatus(data : RequestData) {
        binding.confirmButton.setEnable(false)
        binding.returnButton.setEnable(false)
        if (data.status == Status.ACCEPT) {
            if (data.isKeyRecieved) {
                binding.confirmButton.setEnable(false)
                binding.returnButton.setEnable(true)
            }
            else {
                val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
                if (LocalDate.now() == LocalDate.parse(data.date, formatter)) {
                    binding.confirmButton.setEnable(true)
                }
                binding.returnButton.setEnable(false)
            }
            if (data.isKeyReturned) {
                binding.confirmButton.setEnable(false)
                binding.returnButton.setEnable(false)
            }
        }
    }

    private fun AppCompatButton.setEnable(isEnable : Boolean) {
        isEnabled = isEnable
        alpha = if (isEnable) 1f else 0.45f
    }

}
