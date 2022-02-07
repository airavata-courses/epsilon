package com.example.apiconnect.repository;

import com.example.apiconnect.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WeatherRepository extends MongoRepository<Users,String>{
   // List<Users> findAllUsers();
    

}
