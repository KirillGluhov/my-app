package com.example.keybooking.ui.activity

import android.os.Bundle
import android.widget.TextView
import com.example.keybooking.databinding.ActivityCreateRequestBinding
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class CreateRequestActivity : AbstractActivity() {
    private lateinit var binding: ActivityCreateRequestBinding
    lateinit var monday : Date
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