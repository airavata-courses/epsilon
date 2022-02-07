package com.example.apiconnect.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.json.simple.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;


@Component
@Document(collection= "users")
public class Users {

   
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

}
