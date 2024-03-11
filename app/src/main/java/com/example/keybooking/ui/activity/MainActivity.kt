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
import com.example.keybooking.ui.fragment.RequestFragment
import com.example.keybooking.ui.holders.RequestData
import com.example.keybooking.ui.holders.RequestsAdapter
import com.example.keybooking.ui.holders.RequestsHolder
import com.example.keybooking.ui.holders.Status
import com.example.keybooking.viewModel.Login
import com.example.keybooking.viewModel.ProfileVM
import com.example.keybooking.viewModel.RequestViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel

class MainActivity: AbstractActivity(), RequestListener  {
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
            //binding.black.visibility = View.VISIBLE
        }

        binding.update.setOnClickListener {
            updateList()
        }

        //adapter = RequestsAdapter(this, listOf(RequestData("id!!!","11.11.1111", "12:25", "14:00", "101", Status.WAIT, false, false, false)), this)
        //binding.recyclerView.layoutManager = LinearLayoutManager(this)
        //binding.recyclerView.adapter = adapter


        //viewModelProfile.saveToken("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1cmtpbmEuc29ueWFAeWEucnUiLCJVc2VyUm9sZSI6IlN0dWRlbnQiLCJqdGkiOiIwMGY0MDg2YS01NDk2LTRjNTAtYTE0Zi1hM2FlYzM4YWJkMmYiLCJuYmYiOjE3MTAxMzk0NzAsImV4cCI6MTcxMDE0MzA3MCwiaWF0IjoxNzEwMTM5NDcwLCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.BGCq_kMqLJrawf1Gb3RgvvTgjvAmD9l-G3uV6V7L20SPieOB81gwy27jjikuPWI0L0Clg7L5f3GM4pLXnoQ40w")
        viewModel.getUserKeys()


        viewModel.responseDataLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println("not error" + responseData)

                adapter = RequestsAdapter(this, requestsToData(responseData), this)
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
            if (responseData != null) {
                //val intent = Intent(this, StartActivity::class.java)
                //startActivity(intent)
            }
        })


    }

    private fun requestsToData(keys: MutableList<BookingKeyForUser>) : List<RequestData> {
        val dataList = mutableListOf<RequestData>()
        keys.forEach {
            dataList.add(RequestData(
                it.requestId,
                it.bookingDate,
                getFirstTime(it.timeSlot),
                getSecondTime(it.timeSlot),
                it.key.auditory,
                getStatus(it.requestStatus),
                it.isRepetitive,
                it.isKeyRecieved,
                it.isKeyReturned
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

    override fun showDialogFragment(data: RequestData) {
        val dialogFragment = RequestFragment.newInstance(data)
        dialogFragment.show(supportFragmentManager, "RequestFragment")
    }

    override fun updateList () {
        viewModel.getUserKeys()
    }
}
