package com.example.moviecatalog2023

import android.app.Application
import androidx.room.Room
import com.example.keybooking.ApiService
import com.example.moviecatalog2023.data.TokenInterceptor
import com.example.moviecatalog2023.data.repository.TokenRepository
import com.example.moviecatalog2023.data.room.AppDatabase
import com.example.moviecatalog2023.service.viewModel.Login
import com.example.moviecatalog2023.service.viewModel.ProfileVM
import com.example.moviecatalog2023.service.viewModel.Register
import okhttp3.OkHttpClient
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class App : Application() {

    private val BASE_URL = "https://react-midterm.kreosoft.space/"

    lateinit var appDatabase: AppDatabase
    override fun onCreate() {
        super.onCreate()

        appDatabase = Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java,
            "app-database"
        ).fallbackToDestructiveMigration()
            .allowMainThreadQueries()
            .build()

        val mainModule = module {
            single { appDatabase.userTokenDao() }

            factory { provideForecastApi(get()) }

            single { TokenRepository(get()) }

            viewModel { Login(get(), get()) }
            viewModel { Register(get(), get()) }
            viewModel { ProfileVM(get(), get()) }

            factory { TokenInterceptor(get()) }
            factory { provideOkHttpClient(get()) }
            single { provideRetrofit(get()) }
        }

        startKoin() {
            androidContext(this@App)
            modules(mainModule)
        }
    }

    private fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder().baseUrl(BASE_URL).client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create()).build()
    }

    private fun provideOkHttpClient(tokenInterceptor: TokenInterceptor): OkHttpClient {
        return OkHttpClient().newBuilder().addInterceptor(tokenInterceptor).build()
    }

    private fun provideForecastApi(retrofit: Retrofit): ApiService = retrofit.create(ApiService::class.java)

}