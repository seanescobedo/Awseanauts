<?php
     require_once(__DIR__ . "/../model/config.php");
     
     
     $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
             . "id int (11) NOT NULL AUTO_INCREMENT,"
             . "title varchar(255) NOT NULL,"
             . "post text NOT NULL,"
             . "PRIMARY KEY (id))");
     // the table for the post ^ \\
     if($query){
        echo "<p>Successfully created table: post</p>"; 
        // this line of code comes out if your post was successful \\
     }
     else{
         echo "<p>" . $_SESSION["connection"]->error . "</p>";
         // if there was an error with line of code comes out \\
     }
     
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
            . "id int (11) NOT NULL AUTO_INCREMENT,"
             . "username varchar(30) NOT NULL,"
             . "email varchar(50) NOT NULL,"
             . "password char(128) NOT NULL,"
             . "salt char (128) NOT NULL,"
             . "PRIMARY KEY (id))");
    // this is the table for the users \\
    if($query){
        echo "<p>Successfully created table: users</p>"; 
        // this is the code you get when you sign in or register \\
     }
     else{
         echo "<p>" . $_SESSION["connection"]->error . "</p>";
         // if there was an error this pops up \\
     }