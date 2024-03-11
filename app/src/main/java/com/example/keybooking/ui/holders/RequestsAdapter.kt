package com.example.keybooking.ui.holders

import android.content.Context
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.keybooking.databinding.RequestBinding
import com.example.keybooking.ui.activity.RequestListener

class RequestsAdapter(
    private val context: Context,
    private val dataList: List<RequestData>,
    private val listener: RequestListener
) : RecyclerView.Adapter<RequestsHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RequestsHolder {
        return RequestsHolder.create(parent)
    }

    override fun onBindViewHolder(holder: RequestsHolder, position: Int) {
        val data = dataList[position]
        holder.bind(data)
        holder.itemView.setOnClickListener {
            listener.showDialogFragment(data)
        }
    }

    override fun getItemCount(): Int {
        return dataList.size
    }
}