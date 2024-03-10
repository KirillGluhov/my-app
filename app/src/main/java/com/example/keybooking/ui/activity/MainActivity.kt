package com.example.keybooking.ui.activity

import android.content.Intent
import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.keybooking.data.model.BookingKeyForUser
import com.example.keybooking.databinding.ActivityMainBinding
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


        //println("before")

        viewModelProfile.saveToken("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1cmtpbmEuc29ueWFAeWEucnUiLCJVc2VyUm9sZSI6IlN0dWRlbnQiLCJqdGkiOiI1YmMzM2QyMi03YTdhLTRhMzctOGY1My1hNzEzZjc4YWUyMjciLCJuYmYiOjE3MTAwNzM1MzgsImV4cCI6MTcxMDA3NzEzOCwiaWF0IjoxNzEwMDczNTM4LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.Cw_0HH0rAI7EyFQqcVjmYmuHWOgZi7DChNN8X5A6MNKMiQkqrxn5NIq31PaU2zMw9O-w7fTnNpuk7kNng8YtnQ")
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
