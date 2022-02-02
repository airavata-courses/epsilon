package com.example.apiconnect.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.apiconnect.model.Users;
import com.example.apiconnect.service.WeatherService;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.json.JsonObject;
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

  /* @RequestMapping("/test")
    public JSONObject getHelloWorld()
    {
        JSONObject obj = new JSONObject();

        obj.put("success", true);
        obj.put("message", "Server is functioning and active on: 19031");

        return  obj;
    }*/



    // Method 1
    // Get the all the users data from DB
//    @GetMapping
//    public ResponseEntity<List<Users>> findAllUsers()
//    {
//      return ResponseEntity.ok(weatherService.findAllUsers());
//    }
//


    // Method 2
    // Get one user by Id
   /* @GetMapping("/data/{id}")
    public ResponseEntity findUserById(@PathVariable String id)
    {
     return ResponseEntity.ok(weatherService.findUserById(id));
    }*/

  /*@GetMapping("/data/{user_id}")
  public ResponseEntity findUserById(@PathVariable int user_id)
  {
 *//*   BasicDBObject whereQuery = new BasicDbObject();
    whereQuery.put("user_id",user)*//*


    return ResponseEntity.ok(weatherService.findUserById(user_id));
  }*/

  @GetMapping("/data/{user_id}")
  public List<Document> findUserById(@PathVariable int user_id)
  {
 /*   BasicDBObject whereQuery = new BasicDbObject();
    whereQuery.put("user_id",user)*/


    return weatherService.findUserById(user_id);
  }


    // Method 3
    // Add new user data to the DB
    @PostMapping("/data/add")
    public ResponseEntity addNewUsers(@RequestBody JSONObject jsObj)
    {
//      System.out.println(user);
      System.out.println("I am here");
      Users user = new Users();
        user.setJsObj(jsObj);
        user.setUserId((int)jsObj.get("user_id"));
        weatherService.addNewUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//      @PostMapping("/data/add")
//    public void addNewUsers(@RequestBody JSONObject jsObj)
//    {
//      Map<String, Object> map = new HashMap<String,Object>();
//
//      Set<String> keys = jsObj.keySet();
//      Iterator<String> keyItr =  jsObj.keySet().iterator();
//
//      while(keyItr.hasNext())
//      {
//        String key = keyItr.next();
//        Object value = jsObj.get(key);
//
//        System.out.println(key +" "+value);
//
//        map.put(key,value);
//      }
//
//      MongoClient client = MongoClients.create("mongodb://localhost:27017/weather");
//
//        MongoDatabase db = client.getDatabase("weather");
//        MongoCollection collection = db.getCollection("users");
//
//        Document data = new Document(jsObj);
//        user.setJsObj(jsObj);
//        System.out.println(data.toString());
////        collection.insertOne(user);
//      weatherService.addNewUser(user);
//
//        System.out.println("Data Inserted");
//
//    }


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
