package com.example.apiconnect.model;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mongodb.client.MongoCollection;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
@Document(collection= "users")
public class Users {

    //Parameterized Constructor
  /*  public Users(String id, String name, int salary)
    {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }*/

    //toString Method
   /* public String toString()
    {
        return id+" "+name+" "+salary;
    }*/
    @Id
    @JsonIgnoreProperties
    private String id;
    private JSONObject jsObj;
    private int user_id;


    //Set
    public void setUserId(int user_id)
    {
        this.user_id = user_id;
    }
    //Get
    public int getUserId()
    {
        return user_id;
    }

    //Set
    public void setId(String id)
    {
        this.id = id;
    }
    //Get
    public String getId()
    {
        return id;
    }

    public void setJsObj(JSONObject jsObj) {
        this.jsObj = jsObj;
    }

    public JSONObject getJsObj() {
        return jsObj;
    }

    @Override
    public String toString() {
        return "Users{" +
                "mongoCollection=" + jsObj +
                ", id='" + id + '\'' +
                '}';
    }
//    private String name;
//    //Set
//    public void setName(String name){
//        this.name = name;
//    }
//    //Get
//    public String getName(){
//        return name;
//    }
//
//    int salary;
//    // Get
//    public int getSalary()
//    {
//        return salary;
//    }
//    // Set
//    public void setSalary(int salary)
//    {
//        this.salary = salary;
//    }


    // Extra attributes which are not in my model
/*    private Map<String, Object> extra;

    // Set
    @JsonAnySetter
    public void setExtra(final String key, final Object value){
        this.extra.put(key, value);
    }

    // Get
    @JsonAnyGetter
    public Map<String, Object> getExtra() {
        return Collections.unmodifiableMap(this.extra);
    }*/
}
