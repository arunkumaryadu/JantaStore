<?php 
require("connect.php");  
$tql = "select itemName from  item";
$result = $conn->query($tql);
 if ($result->num_rows > 0) { 
 	while($row = $result->fetch_array(MYSQLI_ASSOC) ) {
 		echo "<option value=\"".$row["itemName"]."\">".$row["itemName"]."</option>"."<br>";
    }
   } else {
   	     echo "unable to load item";
    }

$conn->close(); 
?>
