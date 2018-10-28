<?php 
require("connect.php");  
$tql = "select * from  category";
$result = $conn->query($tql);
 if ($result->num_rows > 0) { 
 	while($row = $result->fetch_array(MYSQLI_ASSOC) ) {
 		echo "<option value=\"".$row["categoryname"]."\">".$row["categoryname"]."</option>"."<br>";
    }
   } else {
   	     echo "unable to load cotegory";
    }

$conn->close(); 
?>
