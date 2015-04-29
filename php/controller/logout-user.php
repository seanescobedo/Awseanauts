<?php
        require_once(__DIR__ . "/../model/config.php"); 
        // signs out the user from to blog\\
        unset($_SESSION["authenticated"]);
        //makes all of the sessions things die\\
        session_destroy();
        //sends it to the index page not logged in\\
        header("Location: " . $path . "index.php");