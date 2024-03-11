package com.example.keybooking.ui.holders

import android.os.Parcel
import android.os.Parcelable

data class RequestData(
    val requestId : String,
    val date: String,
    val firstTime: String,
    val secondTime: String,
    val aud: String?,
    val status: Status,
    val isRepetitive : Boolean,
    var isKeyRecieved: Boolean,
    var isKeyReturned: Boolean
) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString(),
        when (parcel.readString().toString()) {
            "ACCEPT" -> {Status.ACCEPT}
            "REJECT" -> {Status.REJECT}
            "WAIT" -> {Status.WAIT}
            else -> {Status.WAIT}
                                   },
        parcel.readByte() != 0.toByte(),
        parcel.readByte() != 0.toByte(),
        parcel.readByte() != 0.toByte()
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(date)
        parcel.writeString(firstTime)
        parcel.writeString(secondTime)
        parcel.writeString(aud)
        parcel.writeValue(when (status) {
            Status.ACCEPT -> {"ACCEPT"}
            Status.REJECT -> {"REJECT"}
            Status.WAIT -> {"WAIT"}
        })
        parcel.writeByte(if (isRepetitive) 1 else 0)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<RequestData> {
        override fun createFromParcel(parcel: Parcel): RequestData {
            return RequestData(parcel)
        }

        override fun newArray(size: Int): Array<RequestData?> {
            return arrayOfNulls(size)
        }
    }

}
