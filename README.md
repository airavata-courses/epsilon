# epsilon
Spring 2022 Project


APIs will take the JSON data of the a specific user and insert into the MongoDB.
Also it will fetch all the details of the user with specific user_id.


To install Mongo please follow the below youtube video

https://www.youtube.com/watch?v=qP5jCg62nYo

Please create C:/data/db Folder


Go to C:\Program Files\MongoDB\5.0\bin> mongod
After executing mongod the mongo server will start

Now again to the same folder C:\Program Files\MongoDB\5.0\bin> mongo
After executing mongo the mongo shell or the mongo client will start

show dbs()
It will show all the existing dbs

user weather
It will create a weather db and switch to weather db (or switch to the weather db if already there)

db.createCollections("users")
It will create one collection users

Now we will insert data to this collection 
db.users.insert({user_id : 1, "name" : "Abhinav"})

Now we will check the data in the collection

db.users.find().pretty()
