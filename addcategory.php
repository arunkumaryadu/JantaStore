<?php 
require("connect.php");  

$catName=$_POST["catName"]; 
$tql = "select * from  category where categoryname = '".$catName."'";
$result = $conn->query($tql);
 if ($result->num_rows > 0) {    
   echo "entered category name is already present so please enter another category name or update it";
   } else {
   	$tqll = "insert into category(categoryname) values('$catName')";
   	if ($conn->query($tqll) === TRUE) {
    echo " inserted successfully";
} else {
    echo "Please try again after some time: " . $conn->error;
}
    }

$conn->close(); 
?>
