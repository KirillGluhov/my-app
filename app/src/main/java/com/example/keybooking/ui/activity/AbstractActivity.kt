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
}