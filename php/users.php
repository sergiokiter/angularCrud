<?php 
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods:POST,GET,PUT,DELETE');
  header('Access-Control-Allow-Headers: content-type');
  header('Content-Type: application/json');

  $servername = "localhost";
  $username   = "root";
  $password   = "";
  $dbname     = "crud-angular";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  if(isset($_POST['email'])) {
    // Añadir un usuario
    $sql = "INSERT INTO users (email, username)
        VALUES ('".$_POST['email']."', '".$_POST['username']."')";

    if (mysqli_query($conn,$sql)) {
      $data = array("data" => "You Data added successfully");
        echo json_encode($data);
      } else {
        $data = array("data" => "Error: " . $sql . "<br>" . $conn->error);
        echo json_encode($data); 
      }
  } else if(isset($_GET['id'])) {
   // Borrar un usuario
    $sql = "DELETE FROM users WHERE id=" . $_GET['id'];

   if (mysqli_query($conn,$sql)) {
    $data = array("data" => "You Data removed successfully");
     echo json_encode($data);
    } else {
     $data = array("data" => "Error: " . $sql . "<br>" . $conn->error);
     echo json_encode($data); 
    }
  } else {
    // Listar los usuarios
    $trp = mysqli_query($conn, "SELECT * from users ORDER BY id DESC");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
      $rows[] = $r;
    }

    print json_encode($rows);
  }

  die();