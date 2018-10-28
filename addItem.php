<?php 

require("connect.php");  

$itemName=$_POST["itemName"]; 
$quantity=$_POST["quantity"]; 
$price=$_POST["price"]; 
$slt1=$_POST["slt1"]; 
$tql = "select * from  item where itemName = '".$itemName."' and  categoryname ='".$slt1."'";
$result = $conn->query($tql);
 if ($result->num_rows > 0) {    
   echo "entered item is already present so please enter another item name or update it";
   } else {
   	$tqll = "insert into item(itemName,quantity,price,categoryname) values('$itemName','$quantity','$price','$slt1')";
   	if ($conn->query($tqll) === TRUE) {
    echo " inserted successfully";
} else {
    echo "Please try again after some time: " . $conn->error;
}
    }

$conn->close(); 
?>
