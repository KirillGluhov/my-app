package com.example.keybooking.ui.holders

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.keybooking.R
import com.example.keybooking.databinding.RequestBinding
import com.example.keybooking.ui.fragment.ProfileFragment

class RequestsHolder(private val binding: RequestBinding) : RecyclerView.ViewHolder(binding.root) {

    fun bind(data: RequestData) {
        binding.date.text = data.date
        binding.firstTime.text = data.firstTime
        binding.secondTime.text = data.secondTime
        binding.aud.text = data.aud
        when (data.status) {
            Status.ACCEPT -> {
                binding.status.setImageResource(R.drawable.request_accept)
            }
            Status.REJECT -> {
                binding.status.setImageResource(R.drawable.request_deny)
            }
            Status.WAIT -> {
                binding.status.setImageResource(R.drawable.request_wait)
            }
        }
        binding.repeat.visibility = if (data.isRepetitive) View.VISIBLE else View.GONE
    }

    companion object {
        fun create(parent: ViewGroup): RequestsHolder {
            val inflater = LayoutInflater.from(parent.context)
            val binding = RequestBinding.inflate(inflater, parent, false)
            return RequestsHolder(binding)
        }
    }
}