package com.example.apiconnect.controller;

import com.example.apiconnect.model.Users;
import com.example.apiconnect.service.WeatherService;
import org.bson.Document;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/java/api")
public class WeatherController
{
  @Autowired
  private WeatherService weatherService; // Autowire the service layer



  public WeatherController(WeatherService weatherService)
  {
    this.weatherService = weatherService;
  }

  @GetMapping("/data/{user_id}")
  public List<Document> findUserById(@PathVariable int user_id)
  {

    return weatherService.findUserById(user_id);
  }


    // Method 3
    // Add new user data to the DB
    @PostMapping("/data/add")
    public ResponseEntity addNewUsers(@RequestBody JSONObject jsObj)
    {
      System.out.println("I am here");
      Users user = new Users();
        user.setJsObj(jsObj);
        user.setUserId((int)jsObj.get("user_id"));
        weatherService.addNewUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Method 4
    //Update existing user data
    @PutMapping
    public  ResponseEntity UpdateUser(@RequestBody Users user)
    {
      weatherService.UpdateUser(user);
      return ResponseEntity.ok().build();
    }



    //Method 5
    // Delete an existing users
  @DeleteMapping("/delete/{id}")
    public ResponseEntity DeleteUsers(@PathVariable String id)
    {
        weatherService.DeleteUsers(id);
        return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
