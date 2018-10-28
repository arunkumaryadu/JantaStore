<?php
$servername = "localhost";
$username = "root";
$password = "arundb";
$dbname = "jantastoredb";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
	echo "connected with database !!!";
}

// Create database
$sql = "CREATE DATABASE $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{ echo "connected with db";
}

// sql to create table
$sql = "create table category(cid INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
categoryname varchar(50) NOT NULL UNIQUE)";
if ($conn->query($sql) === TRUE) {
    echo " category table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// login table
$sql = "create table login(lid INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
userName varchar(50) NOT NULL UNIQUE,password varchar(50) NOT NULL,userType varchar(50) NOT NULL)";
if ($conn->query($sql) === TRUE) {
    echo " login table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql="create table item(itemNo int(10) UNSIGNED AUTO_INCREMENT primary key,itemName varchar(50) not null UNIQUE,
quantity int(100) not null, price int(100) not null,categoryname varchar(50) NOT NULL)";
if ($conn->query($sql) === TRUE) {
    echo " item table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql="create table customer(customerNo int(10) not null AUTO_INCREMENT,customerName varchar(50) not null,
address varchar(100) not null, city varchar(100) not null,pin int(10) not null,
contact varchar(15) not null UNIQUE, amount int(100) not null, primary key(customerNo));
";
if ($conn->query($sql) === TRUE) {
    echo " customer table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}
$sql="create table sales(sid int(10) UNSIGNED AUTO_INCREMENT primary key,itemNo int(10) UNSIGNED, customerNo int(10) not null,
DateOfSale date, unitSold int(100),foreign key(itemNo) references item(itemNo),
foreign key(customerNo) references customer(customerNo));";
if ($conn->query($sql) === TRUE) {
    echo " sales table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}
$conn->close();
?>
