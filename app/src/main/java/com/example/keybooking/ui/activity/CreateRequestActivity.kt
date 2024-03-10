package com.example.keybooking.ui.activity

import android.content.Intent
import android.icu.util.LocaleData
import android.os.Bundle
import android.view.View
import androidx.appcompat.widget.AppCompatButton
import androidx.core.widget.addTextChangedListener
import androidx.lifecycle.Observer
import com.example.keybooking.R
import com.example.keybooking.data.dto.ConcreteKeyBookingInfo
import com.example.keybooking.data.dto.CreateRequest
import com.example.keybooking.databinding.ActivityCreateRequestBinding
import com.example.keybooking.databinding.RequestDayBinding
import com.example.keybooking.viewModel.ProfileVM
import com.example.keybooking.viewModel.RequestViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel
import java.text.SimpleDateFormat
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Calendar
import java.util.Date
import java.util.Locale

class CreateRequestActivity : AbstractActivity() {
    private lateinit var binding: ActivityCreateRequestBinding
    lateinit var monday : Date
    lateinit var sunday : Date
    private val viewModel: RequestViewModel by viewModel()
    private val viewModelProfile: ProfileVM by viewModel()
    var selectedBtn : AppCompatButton? = null
    var selectedDate : String = ""
    var selectedTimeSlot : String = ""
    var isRepeat : Boolean = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCreateRequestBinding.inflate(layoutInflater)
        setContentView(binding.root)

        var keyId = ""

        var selectedWeek : Int = 0

        val listOfDates = listOf(
            binding.mon,
            binding.tue,
            binding.wed,
            binding.thu,
            binding.fri,
            binding.sat,
            binding.sun,
            )
        binding.dates.text = setWeekAndDates(selectedWeek, listOfDates)

        binding.buttonWeekPrevious.setOnClickListener {
            if (Calendar.getInstance().time < monday) {
                selectedWeek -= 1
                clearWithWeekChanged(selectedWeek, listOfDates)
            }


        }

        binding.buttonWeekNext.setOnClickListener {
            selectedWeek += 1
            clearWithWeekChanged(selectedWeek, listOfDates)
        }

        binding.editTextAud.addTextChangedListener {
            if (binding.editTextAud.text?.isBlank() == true) {
                binding.note.alpha = 1f
                binding.message.text = resources.getString(R.string.note)
                binding.createButton.alpha = 0.45f
                binding.createButton.setEnable(false)
            }
            else {
                sendRequest()
            }
        }

        listOfDates.forEach {
            it.buttonS8E10.setListener(it.buttonS8E10, it.date.text.toString(), "S8E10")
            it.buttonS10E12.setListener(it.buttonS10E12, it.date.text.toString(), "S10E12")
            it.buttonS12E14.setListener(it.buttonS12E14, it.date.text.toString(), "S12E14")
            it.buttonS14E16.setListener(it.buttonS14E16, it.date.text.toString(), "S14E16")
            it.buttonS16E18.setListener(it.buttonS16E18, it.date.text.toString(), "S16E18")
            it.buttonS18E20.setListener(it.buttonS18E20, it.date.text.toString(), "S18E20")
            it.buttonS20E21.setListener(it.buttonS20E21, it.date.text.toString(), "S20E21")
        }

        binding.createButton.setOnClickListener {
            if (selectedBtn != null) {
                val btn = selectedBtn
                val year = binding.dates.text.substring(binding.dates.text.length - 4)
                if (keyId.isNotBlank()) {
                    println(btn)
                    val requestDto = CreateRequest(
                        keyId,
                        getCorrectDate(year),
                        selectedTimeSlot,
                        "create from mobile at " + LocalDateTime.now(),
                        isRepeat
                    )
                    println(requestDto)
                    viewModel.createRequest(requestDto)
                }
            }
        }

        binding.backButton.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        binding.repeat.setOnClickListener {
            isRepeat = !isRepeat
            binding.repeat.background =
                if (isRepeat) getDrawable(R.drawable.round_btn)
                else getDrawable(R.drawable.round_disable)
        }

        binding.createButton.alpha = 0.45f
        binding.createButton.setEnable(false)

        viewModelProfile.saveToken("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1cmtpbmEuc29ueWFAeWEucnUiLCJVc2VyUm9sZSI6IlN0dWRlbnQiLCJqdGkiOiJjMmU4Zjg0MC0xZmIyLTQwMmMtOGY4My01OWQyMGMxNzU1ZDIiLCJuYmYiOjE3MTAwNzIxMjAsImV4cCI6MTcxMDA3NTcyMCwiaWF0IjoxNzEwMDcyMTIwLCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.-2ff7d3-m7ofbm8mdVaTrKR-lPHbX_2b4iVuZscqtGBQJX3-St3Ojrl23YaqhMcYxewndl5lC-SCffnpVHWYMQ"
        )

        viewModel.responseBookingInfoLifeData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println("not error" + responseData)
                binding.note.alpha = 0f

                keyId = responseData.keyId

                if (Calendar.getInstance().time > monday) {
                    when(Calendar.getInstance().get(Calendar.DAY_OF_WEEK)) {
                        Calendar.MONDAY -> {}
                        Calendar.TUESDAY -> {setDisableTimeSlots(listOfDates, 1)}
                        Calendar.WEDNESDAY -> {setDisableTimeSlots(listOfDates, 2)}
                        Calendar.THURSDAY -> {setDisableTimeSlots(listOfDates, 3)}
                        Calendar.FRIDAY -> {setDisableTimeSlots(listOfDates, 4)}
                        Calendar.SATURDAY -> {setDisableTimeSlots(listOfDates, 5)}
                        Calendar.SUNDAY -> {setDisableTimeSlots(listOfDates, 6)}
                    }
                }
                else {
                    listOfDates.forEach {
                        it.buttonS8E10.setTimeSlotEnable()
                        it.buttonS10E12.setTimeSlotEnable()
                        it.buttonS12E14.setTimeSlotEnable()
                        it.buttonS14E16.setTimeSlotEnable()
                        it.buttonS16E18.setTimeSlotEnable()
                        it.buttonS18E20.setTimeSlotEnable()
                        it.buttonS20E21.setTimeSlotEnable()
                    }
                }

                responseData.keyBookings.forEach {
                    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.getDefault())
                    when (LocalDate.parse(it.dateToBeBooked, formatter).dayOfWeek) {
                        DayOfWeek.MONDAY -> {listOfDates[0].setTimeslotDisable(it.timeSlot)}
                        DayOfWeek.TUESDAY -> {listOfDates[1].setTimeslotDisable(it.timeSlot)}
                        DayOfWeek.WEDNESDAY -> {listOfDates[2].setTimeslotDisable(it.timeSlot)}
                        DayOfWeek.THURSDAY -> {listOfDates[3].setTimeslotDisable(it.timeSlot)}
                        DayOfWeek.FRIDAY -> {listOfDates[4].setTimeslotDisable(it.timeSlot)}
                        DayOfWeek.SATURDAY -> {listOfDates[5].setTimeslotDisable(it.timeSlot)}
                        DayOfWeek.SUNDAY -> {listOfDates[6].setTimeslotDisable(it.timeSlot)}
                        else -> {}
                    }
                }


                //binding.createButton.alpha = 1f
                //binding.createButton.setEnable(true)
            }
        })

        viewModel.responseCreateLifeData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println(responseData)
            }
        })

        viewModel.errorLiveData.observe(this, Observer { responseData ->
            if (responseData != null) {
                println("error" + responseData)
                binding.note.alpha = 1f
                if (responseData == "404") {
                    binding.message.text = resources.getString(R.string.aud_error)
                }
                else {
                    binding.message.text = responseData
                }

            }
        })

        viewModel.unauthorizedErrorLiveData.observe(this, Observer { responseData ->
            if (responseData) {
                binding.message.text = "Вы не авторизованы"
            }
        })

    }

    private fun clearWithWeekChanged(selectedWeek: Int, listOfDates: List<RequestDayBinding>) {
        binding.dates.text = setWeekAndDates(selectedWeek, listOfDates)
        sendRequest()
        binding.createButton.alpha = 0.45f
        binding.createButton.setEnable(false)
        selectedBtn = null
        selectedDate = ""
        selectedTimeSlot = ""
        listOfDates.forEach {
            it.buttonS8E10.setListener(it.buttonS8E10, it.date.text.toString(), "S8E10")
            it.buttonS10E12.setListener(it.buttonS10E12, it.date.text.toString(), "S10E12")
            it.buttonS12E14.setListener(it.buttonS12E14, it.date.text.toString(), "S12E14")
            it.buttonS14E16.setListener(it.buttonS14E16, it.date.text.toString(), "S14E16")
            it.buttonS16E18.setListener(it.buttonS16E18, it.date.text.toString(), "S16E18")
            it.buttonS18E20.setListener(it.buttonS18E20, it.date.text.toString(), "S18E20")
            it.buttonS20E21.setListener(it.buttonS20E21, it.date.text.toString(), "S20E21")
        }
    }

    private fun getCorrectDate(year: String) : String {
        val inputFormat = SimpleDateFormat("dd.MM.yyyy", Locale.getDefault())
        val outputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        val output = outputFormat.format(inputFormat.parse(selectedDate + "." + year))
        println(output)
        return output
    }

    private fun RequestDayBinding.setTimeslotDisable(timeSlot : String) {
        when (timeSlot) {
            "S8E10" -> {buttonS8E10.setTimeSlotDisable()}
            "S10E12" -> {buttonS10E12.setTimeSlotDisable()}
            "S12E14" -> {buttonS12E14.setTimeSlotDisable()}
            "S14E16" -> {buttonS14E16.setTimeSlotDisable()}
            "S16E18" -> {buttonS16E18.setTimeSlotDisable()}
            "S18E20" -> {buttonS18E20.setTimeSlotDisable()}
            "S20E21" -> {buttonS20E21.setTimeSlotDisable()}
        }
    }

    private fun AppCompatButton.setListener(button : AppCompatButton, date : String, timeSlot: String) {
        setOnClickListener {
            setTimeSlotSelected()
            if (selectedBtn != null) {
                selectedBtn!!.setTimeSlotEnable()
            }
            selectedBtn = button
            selectedDate = date
            selectedTimeSlot = timeSlot
            binding.createButton.alpha = 1f
            binding.createButton.setEnable(true)
        }
    }


    private fun sendRequest() {
        val dateFormat = SimpleDateFormat("MM.dd.yyyy", Locale.getDefault())
        val requestDto = ConcreteKeyBookingInfo(
            dateFormat.format(Calendar.getInstance().time),
            dateFormat.format(sunday),
            binding.editTextAud.text.toString())
        viewModel.getKeyBookingInfo(requestDto)
    }


    private fun setWeekAndDates(selectedWeek: Int, dates: List<RequestDayBinding>) : String {
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
            it.date.text = dateDateFormat.format(date)
            calendar.add(Calendar.DAY_OF_WEEK, 1)
            date = calendar.time
        }
        calendar.add (Calendar.DAY_OF_WEEK, -1)
        sunday = calendar.time
        val weekDateFormat = SimpleDateFormat("dd.MM.yyyy", Locale.getDefault())
        return weekDateFormat.format(monday) + " - " + weekDateFormat.format(sunday)
    }

    private fun setDisableTimeSlots(date: List<RequestDayBinding>, to : Int) {
        var now = 0
        date.takeWhile { now++ < to}.forEach {
            it.buttonS8E10.setTimeSlotDisable()
            it.buttonS10E12.setTimeSlotDisable()
            it.buttonS12E14.setTimeSlotDisable()
            it.buttonS14E16.setTimeSlotDisable()
            it.buttonS16E18.setTimeSlotDisable()
            it.buttonS18E20.setTimeSlotDisable()
            it.buttonS20E21.setTimeSlotDisable()
            now+=1
        }
    }

    private fun AppCompatButton.setTimeSlotEnable() {
        isEnabled = true
        background = getDrawable(R.drawable.btn_timeslot_enable)
    }

    private fun AppCompatButton.setTimeSlotDisable() {
        isEnabled = false
        background = getDrawable(R.drawable.btn_timeslot_disable)
    }

    private fun AppCompatButton.setTimeSlotSelected() {
        isEnabled = false
        background = getDrawable(R.drawable.btn_timeslot_selected)
    }
}