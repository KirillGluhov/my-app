package com.example.keybooking.ui.activity

import android.annotation.SuppressLint
import android.view.ContextThemeWrapper
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import com.example.keybooking.R
import com.google.android.material.textfield.TextInputEditText

abstract class AbstractActivity : AppCompatActivity() {
    fun AppCompatButton.setStyle(styleResId: Int) {
        val contextWithTheme = ContextThemeWrapper(context, styleResId)
        val styledButton = AppCompatButton(contextWithTheme, null, 0)
        background = styledButton.background
        setTextColor(styledButton.textColors)
    }

    fun AppCompatButton.setEnable(isEnable : Boolean) {
        isEnabled = isEnable
        alpha = if (isEnable) 1f else 0.45f
    }

    @SuppressLint("UseCompatLoadingForDrawables")
    fun TextInputEditText.checkEmpty(error : TextView) : Boolean {
        if (text.toString().isNotBlank()) {
            background = getDrawable(R.drawable.form_field)
            return true
        }
        else {
            error.text = "Поля не должны быть пустыми"
            background = getDrawable(R.drawable.error_field)
            return false
        }
    }

    fun getTimeSlot(timeSlot: String) : List<String> {
        return when (timeSlot) {
            "S8E10" -> listOf("8:45", "10:20")
            "S10E12" -> listOf("10:35", "12:10")
            "S12E14" -> listOf("12:25", "14:00")
            "S14E16" -> listOf("14:45", "16:20")
            "S16E18" -> listOf("16:35", "18:10")
            "S18E20" -> listOf("18:25", "20:00")
            "S20E21" -> listOf("20:15", "21:50")
            else -> listOf("","")
        }
    }

    //S8E10, S10E12, S12E14, S14E16, S16E18, S18E20, S20E21
}