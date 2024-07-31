package com.example.crud_javaapplication;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import com.google.gson.GsonBuilder;

public class RetrofitUsers {

    static final String BASE_URL = "http://192.168.100.17:3000";
    private Retrofit retrofit;

    public RetrofitUsers() {
        // Constructor vacío
    }

    public Retrofit getRetrofit() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create(new GsonBuilder().create()))
                    .build();
        }
        return retrofit;
    }
}
