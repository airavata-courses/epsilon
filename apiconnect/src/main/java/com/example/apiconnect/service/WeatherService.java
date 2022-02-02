package com.example.apiconnect.service;

import com.example.apiconnect.model.Users;
import com.example.apiconnect.repository.WeatherRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mongodb.client.MongoCursor;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherService {
    @Autowired
    private WeatherRepository weatherRepository;

    public WeatherService(WeatherRepository weatherRepository)
    {
        this.weatherRepository = weatherRepository;
    }

    public List<Users> findAllUsers()
    {
       return weatherRepository.findAll();


        /*var mongoClient = MongoClients.create("mongodb://localhost:27017");
        List<WeatherUsers> listUsers = new ArrayList<>();
        return  listUsers;*/
    }

    // Method 2
    // Get one user by Id
   /* public Users findUserById(String id)
    {
        System.out.println("I am inside Findby ID method ");


        return weatherRepository.findById(id).
                orElseThrow(()-> new RuntimeException(
                        String.format("Cannot find User by id %s", id)
                ));
    }*/


    // Method 2
    // Get one user by Id
    public List<Document> findUserById(int user_id)
    {

        List<Document> list = new ArrayList<>();
        System.out.println("I am inside Findby ID method ");
        MongoClient client = MongoClients.create("mongodb://localhost:27017/weather");
        MongoDatabase db = client.getDatabase("weather");
        MongoCollection collection = db.getCollection("users");

//        db.getCollection("users").find("userId:");

        BasicDBObject whereQuery = new BasicDBObject();
        whereQuery.put("user_id",user_id);

        MongoCursor cursor  = collection.find(whereQuery).iterator();
        while(cursor.hasNext()) {
            System.out.println(cursor);
                list.add((Document) cursor.next());
        }

        return list;

     /*   return weatherRepository.findById(user_id).
                orElseThrow(()-> new RuntimeException(
                        String.format("Cannot find User by id %s", user_id)
                ));*/
    }

    // Method 3
    // Add new user data to the DB
    public void addNewUser(Users user)
    {
       weatherRepository.insert(user);
    }

    // Method 4
    //Update existing user data
    public  void UpdateUser(Users user)
    {
        Users userFound = weatherRepository.findById(user.getId())
                .orElseThrow(()-> new RuntimeException(
                        String.format("Cannot find id by ID %s", user.getId())
                ));

//        userFound.setName(user.getName());
//        userFound.setSalary(user.getSalary());

        weatherRepository.save(user);
    }

    //Method 5
    // Delete an existing users
    public void DeleteUsers(String id)
    {
        weatherRepository.deleteById(id);
    }
}
