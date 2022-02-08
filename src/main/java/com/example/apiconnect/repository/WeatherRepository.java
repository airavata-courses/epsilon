package com.example.apiconnect.repository;

import com.example.apiconnect.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeatherRepository extends MongoRepository<Users,String>{
   // List<Users> findAllUsers();
    

}
