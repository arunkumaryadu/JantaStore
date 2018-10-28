<?php

require("connect.php");

$customerName=$_POST["customerName"];
$address=$_POST["address"];
$city=$_POST["city"];
$pin=$_POST["pin"];
$contact=$_POST["contact"];
$amount=$_POST["amount"];


$tql = "select * from  customer where contact = '".$contact."'";
$result = $conn->query($tql);
 if ($result->num_rows > 0) {
   while($row = $result->fetch_array(MYSQLI_ASSOC) ) {
        echo json_encode($row);
      }
    }
  else {
    if($amount!==""){
    	$tqll = "insert into customer(customerName,address,city,pin,contact,amount) values(\"$customerName\",\"$address\",\"$city\",$pin,\"$contact\",$amount)";
   	  if ($conn->query($tqll) === TRUE) {
      $res = array("err" =>"inserted Successfully!!");
      echo json_encode($res);
      }
      elseif ($conn->query($tqll) !== TRUE) {
      $res = array("err" =>"inserted Successfully!!");
        echo json_encode($res);
      }
      else {
      $res = array("err" =>"Please try again after some time:");
      echo json_encode($res);
    }}
    else{
      $res = array("err" =>"Please register !!");
      echo json_encode($res);
    }
}

$conn->close();
?>
