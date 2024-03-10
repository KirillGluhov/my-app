package com.example.keybooking.ui.activity

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.DialogFragment.STYLE_NORMAL
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.keybooking.R
import com.example.keybooking.data.model.BookingKeyForUser
import com.example.keybooking.databinding.ActivityMainBinding
import com.example.keybooking.ui.fragment.ProfileFragment
import com.example.keybooking.ui.holders.RequestData
import com.example.keybooking.ui.holders.RequestsAdapter
import com.example.keybooking.ui.holders.RequestsHolder
import com.example.keybooking.ui.holders.Status
import com.example.keybooking.viewModel.Login
import com.example.keybooking.viewModel.ProfileVM
import com.example.keybooking.viewModel.RequestViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel

class MainActivity: AbstractActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var adapter: RequestsAdapter
    private val viewModel: RequestViewModel by viewModel()
    private val viewModelProfile: ProfileVM by viewModel()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.newButton.setOnClickListener {
            val intent = Intent(this, CreateRequestActivity::class.java)
            startActivity(intent)
        }

        binding.profileButton.setOnClickListener {
            val dialogFragment = ProfileFragment()
            dialogFragment.show(supportFragmentManager, "ProfileFragment")
            binding.black.visibility = View.VISIBLE
        }


        viewModelProfile.saveToken("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1cmtpbmEuc29ueWFAeWEucnUiLCJVc2VyUm9sZSI6IlN0dWRlbnQiLCJqdGkiOiIwMTdiZTVkYy1hZmYzLTQ2ZmUtYWZiYi1lOGZkYjMwYjYyYWEiLCJuYmYiOjE3MTAwNzg5NjksImV4cCI6MTcxMDA4MjU2OSwiaWF0IjoxNzEwMDc4OTY5LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.3u4bNokcBZtd4ZrGlzpLrX9jyChhg14dASadYWOUOXKQDnPHTXLU6G_Deg88vcuGoPSjGql6Rh7PAhpGX5xouA")
        viewModel.getUserKeys()


        viewModel.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println("not error" + responseData)

                adapter = RequestsAdapter(this, requestsToData(responseData))
                binding.recyclerView.layoutManager = LinearLayoutManager(this)
                binding.recyclerView.adapter = adapter
            }
        })

        viewModel.errorLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println("error" + responseData)
            }
        })

        viewModel.unauthorizedErrorLiveData.observe(this, Observer { responseData ->
            if (responseData) {

            }
        })


    }

    private fun requestsToData(keys: MutableList<BookingKeyForUser>) : List<RequestData> {
        val dataList = mutableListOf<RequestData>()
        keys.forEach {
            dataList.add(RequestData(
                it.bookingDate,
                getFirstTime(it.timeSlot),
                getSecondTime(it.timeSlot),
                it.key.auditory,
                getStatus(it.requestStatus),
                it.isRepetitive
                ))
        }
        return dataList;
    }

    private fun getFirstTime(timeSlot: String) : String{
        return getTimeSlot(timeSlot)[0]
    }

    private fun getSecondTime(timeSlot: String) : String{
        return getTimeSlot(timeSlot)[1]
    }

    private fun getStatus(status: String) : Status {
        return when(status) {
            "Approved" -> Status.ACCEPT
            "InProcess" -> Status.WAIT
            "Declined" -> Status.REJECT
            else -> Status.WAIT
        }
    }
}
