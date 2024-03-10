package com.example.keybooking.ui.activity

import android.os.Bundle
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.keybooking.data.dto.ConcreteKeyBookingInfo
import com.example.keybooking.databinding.ActivityCreateRequestBinding
import com.example.keybooking.ui.holders.RequestsAdapter
import com.example.keybooking.viewModel.ProfileVM
import com.example.keybooking.viewModel.RequestViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class CreateRequestActivity : AbstractActivity() {
    private lateinit var binding: ActivityCreateRequestBinding
    lateinit var monday : Date
    private val viewModel: RequestViewModel by viewModel()
    private val viewModelProfile: ProfileVM by viewModel()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCreateRequestBinding.inflate(layoutInflater)
        setContentView(binding.root)

        var selectedWeek : Int = 0

        val listOfDates = listOf(
            binding.mon.date,
            binding.tue.date,
            binding.wed.date,
            binding.thu.date,
            binding.fri.date,
            binding.sat.date,
            binding.sun.date,
            )
        binding.dates.text = setWeekAndDates(selectedWeek, listOfDates)

        binding.buttonWeekPrevious.setOnClickListener {
            selectedWeek -= 1
            binding.dates.text = setWeekAndDates(selectedWeek, listOfDates)
        }

        binding.buttonWeekNext.setOnClickListener {
            selectedWeek += 1
            binding.dates.text = setWeekAndDates(selectedWeek, listOfDates)
        }

        viewModelProfile.saveToken("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1cmtpbmEuc29ueWFAeWEucnUiLCJVc2VyUm9sZSI6IlN0dWRlbnQiLCJqdGkiOiIzODU5NGFlNC02YmQwLTQ1MzEtOWNlNC03ZmFlM2YzNjEwYTAiLCJuYmYiOjE3MTAwNDkwMzksImV4cCI6MTcxMDA1MjYzOSwiaWF0IjoxNzEwMDQ5MDM5LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.JWmeo4kLlsqiJDxAvJq3L7qkxXT7F-dhyTctOGjDamIspaZs-2X79wPqbgo1lOhq2sOolGBCK1iaXL45g_N9Bg")
        viewModel.getKeyBookingInfo(ConcreteKeyBookingInfo("10.07.2024", "10.13.2024", 1))

        viewModel.responseBookingInfoLifeData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println("not error" + responseData)
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


    private fun setWeekAndDates(selectedWeek: Int, dates: List<TextView>) : String {
        val calendar = Calendar.getInstance()
        val dayUntilMonday = if(calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY)
                                    6
                                    else calendar.get(Calendar.DAY_OF_WEEK) - Calendar.MONDAY
        calendar.add(Calendar.DAY_OF_WEEK, -dayUntilMonday)
        calendar.add(Calendar.DAY_OF_WEEK, selectedWeek * 7)
        monday = calendar.time
        val dateDateFormat = SimpleDateFormat("dd.MM", Locale.getDefault())
        var date = monday
        dates.forEach {
            it.text = dateDateFormat.format(date)
            calendar.add(Calendar.DAY_OF_WEEK, 1)
            date = calendar.time
        }
        calendar.add (Calendar.DAY_OF_WEEK, -1)
        val sunday = calendar.time
        val weekDateFormat = SimpleDateFormat("dd.MM.yyyy", Locale.getDefault())
        return weekDateFormat.format(monday) + " - " + weekDateFormat.format(sunday)
    }
}