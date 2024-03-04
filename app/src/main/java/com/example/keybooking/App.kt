package com.example.keybooking

import android.app.Application
import androidx.room.Room
import com.example.keybooking.data.repository.AuthRepository
import com.example.keybooking.data.repository.UserRepository
import com.example.keybooking.data.TokenInterceptor
import com.example.keybooking.data.repository.TokenRepository
import com.example.keybooking.data.room.AppDatabase
import com.example.keybooking.viewModel.Login
import com.example.moviecatalog2023.service.viewModel.ProfileVM
import com.example.keybooking.viewModel.Register
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
            single { appDatabase.userDao() }

            factory { provideForecastApi(get()) }

            single { TokenRepository(get()) }
            single { AuthRepository(get()) }
            single { UserRepository(get(), get()) }

            viewModel { Login(get(), get()) }
            viewModel { Register(get(), get()) }
            viewModel { ProfileVM(get(), get()) }

            factory { TokenInterceptor(get()) }
            factory { provideOkHttpClient(get()) }
            single { provideRetrofit(get()) }
        }

        println("module created")

        startKoin() {
            androidContext(this@App)
            modules(mainModule)
        }

        println("koin start")
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