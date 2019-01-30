const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
app.use(express.static('Public'));
var sess="";

app.get("/", function(req, res) {
    sess = req.session;
   res.sendFile(__dirname + "/Public/" + "loginPage.html");
});
app.get("/foremployee", function(req, res) {

  res.sendFile(__dirname + "/Public/" + "UserStuff.html");
});
app.get("/forowner", function(req, res) {
 res.sendFile(__dirname + "/Public/" + "AdminStuff2.html");

});

// connect with database

app.get("/getLogin", function(req, res) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arundb',
    database: 'jantastoredb'
  });

  var pagename = "/loginPage.html";
  var userName1 = req.query.userName;
  var password = req.query.password;
  connection.query('select * from login Where userName = ? and password = ?', [userName1, password], function(err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      console.log("1");
      if (result[0].userType == "owner") {
        pagename = "/forowner";
      } else {
        pagename = "/foremployee";
      }
    }
    console.log(pagename);
    res.end(JSON.stringify({
      "pagename": pagename
    }));
  });
});
// insert Category
/*
                                          For Category Stuff

*/
app.get('/add_category', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  var categoryname = req.query.categoryname;

  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT * FROM category where categoryname=? ", [categoryname], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        res.end(JSON.stringify({
          "status": "Category Name is Already Present!!!"
        }));
      } else {
        con.query('insert into category(categoryname) values(?)', [categoryname], function(err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.end(JSON.stringify({
            "status": "Successfully inserted!!!!"
          }));

        });
      }

    });

  });
});

// update Category
app.get('/update_category', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  var CatNewUpdate = req.query.CatNewUpdate;
  var CatOldUpdate = req.query.CatOldUpdate;
  console.log(CatNewUpdate + " " + CatOldUpdate);
  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT * FROM category where categoryname=? ", [CatNewUpdate], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        res.end(JSON.stringify({
          "status": "Category Name is Already Present!!!"
        }));
      } else {
        con.query("SELECT * FROM category where categoryname=? ", [CatOldUpdate], function(err, result1, fields) {
          con.query('UPDATE category SET categoryname =? where cid =?', [CatNewUpdate, result1[0].cid], function(err, result2, fields) {
            if (err) throw err;
            console.log(result2);
            res.end(JSON.stringify({
              "status": "Successfully Updated!!!!"
            }));

          });

        });

      }

    });
  });
});
// delete Category
app.get('/delete_category', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  var categoryname = req.query.categoryname;
  console.log(categoryname);
  con.connect(function(err) {
    if (err) throw err;

    con.query("DELETE FROM category where categoryname=? ", [categoryname], function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify({
        "status": "Seccessfully delete!!!"
      }));
    });
  });
});

// cat choice
app.get('/catChoice', function(req, res) {
  console.log("BGBN");
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT categoryname FROM category", function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
});


/*

                            Item Stuff

*/
app.get('/itemChoice', function(req, res) {
  console.log("itemChoice");
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT itemName FROM item", function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
});


// insert Item
app.get('/add_item', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  var itemName = req.query.itemName;
  var quantity = req.query.quantity;
  var price = req.query.price;
  var categoryname = req.query.categoryname;

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM item where itemName=?", [itemName], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        res.end(JSON.stringify({
          "status": "Item Name is Already Present!!!"
        }));
      } else {
          con.query('insert into item(itemName,quantity,price,categoryname) values(?,?,?,?)', [itemName, quantity, price, categoryname], function(err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify({
              "status": "Successfully inserted!!!!"
            }));
          });

      }

    });

  });
});

app.get('/display_category', function(req, res) {

  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  // select employee
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM category", function(err, result, fields) {
      if (err) throw err;
      //  console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  });
});
//cust_check
//             manish work started



app.get('/display_item_list', function (req, res) {

// database connect
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "arundb",
database: "jantastoredb"
});

// select employee
con.connect(function(err) {
if (err) throw err;
con.query("SELECT * FROM item", function (err, result, fields) {
if (err) throw err;
console.log(JSON.stringify(result));
res.end(JSON.stringify(result));
});
});
});

app.get('/update_item_details', function (req, res) {

// database connect
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "arundb",
database: "jantastoredb"
});

var itemName1=req.query.name;
var quantity1=req.query.quantity;
var price1=req.query.price;
var categoryname1=req.query.categoryname;

con.connect(function(err) {
if (err) throw err;

  con.query('UPDATE item SET quantity =?,price = ?,categoryname=? WHERE itemName = ?',[quantity1,price1,categoryname1,itemName1], function (err, result1, fields) {
  if (err) throw err;
  console.log(result1);
  res.end(JSON.stringify({"status":"Successfully Updated!!!!"}));

  });

});
});

app.get('/show_item_details_by_name', function (req, res) {
// database connect
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "arundb",
database: "jantastoredb"
});

console.log(req.query.itemnameUpdate);
var itemnameUpdate=req.query.itemnameUpdate;

con.connect(function(err) {
if (err) throw err;
con.query("SELECT * FROM item WHERE itemName =?",[itemnameUpdate], function (err, result, fields) {
if (err) throw err;
console.log(result);
if(result.length>0){
   res.end(JSON.stringify(result));
}
else{
    res.end(JSON.stringify(result));
}
});
});
});
//             Manish work end


app.get('/ListOfItem', function(req, res) {

  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  // select employee
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM item", function(err, result, fields) {
      if (err) throw err;
      //  console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  });
});

app.get('/delete_item', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  var itemname = req.query.itemname;
  console.log(itemname);
  con.connect(function(err) {
    if (err) throw err;
    con.query("DELETE FROM item where itemName=? ", [itemname], function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify({
        "status": "Seccessfully delete!!!"
      }));
    });
  });
});


app.get('/ListOfItemForDisplayByItemName', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });
  var itemName=req.query.itemname;
  // select employee
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM item where itemName=?",[itemName], function(err, result, fields) {
      if (err) throw err;
      //  console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  });
});

app.get('/ListOfItemForDisplayByCategoryName', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });
  var catname=req.query.catname;
  // select employee
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM item where categoryname=?",[catname], function(err, result, fields) {
      if (err) throw err;
      //  console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  });
});


app.get('/ListOfItemForDisplayByQuantity', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });
  var quantity=req.query.quantity;
  // select employee
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM item where quantity < ? order by quantity",[quantity], function(err, result, fields) {
      if (err) throw err;
      //  console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  });
});



app.get('/cust_check', function(req, res) {
  // database connect
  console.log("in");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

  var custMobile = req.query.custMobile;
  console.log(custMobile);
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customer where contact=? ", [custMobile], function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
});
// add_update_cust
app.get('/add_update_cust', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });
  var custMobile=req.query.custMobile
  var custName= req.query.custName;
  var custAddress= req.query.custAddress;
  var custCity= req.query.custCity;
  var custPin=req.query.custPin;
  var custOA=req.query.custOA;

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customer where contact=?", [custMobile], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        con.query("UPDATE customer SET customerName=?,address=?,city=?,pin=?,amount=? where contact=?", [custName,custAddress,custCity,custPin,custOA,custMobile], function(err, result1, fields) {
          if (err) throw err;
          res.end(JSON.stringify({
          "status": "Information is updated !!!"
        }));
      });
      } else {
        con.query("insert into customer (customerName,address,city,pin,contact,amount) values(?,?,?,?,?,?)", [custName,custAddress,custCity,custPin,custMobile,custOA], function(err, result1, fields) {
          if (err) throw err;
              console.log(result1);
            res.end(JSON.stringify({
              "status": "Successfully inserted!!!!"
            }));
        });
      }

    });

  });
});

// add_on_bill
app.get('/add_on_bill', function(req, res) {
  // database connect
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });
  var custMobile=req.query.custMobile
  var itemname= req.query.itemnameAdd;
  var quantity= req.query.quantity;
  //console.log(custMobile);
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customer where contact=?", [custMobile], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        con.query("SELECT * FROM item where itemName=?", [itemname], function(err, result1, fields) {
          if (err) throw err;
          var nqty=(result1[0].quantity)-quantity;
          if(result1[0].quantity>=quantity){
            var d = new Date();
            var DateOfSale=d.getFullYear()+":"+(d.getMonth() + 1)+":"+d.getDate();
            con.query("insert into sales(itemName,customerNo,DateOfSale,unitSold) values(?,?,?,?)", [itemname,result[0].customerNo,DateOfSale,quantity], function(err, result1, fields) {
            if (err) throw err;
            con.query("UPDATE item set quantity=? where itemName=?", [nqty,itemname], function(err, result4, fields) {
            if (err) throw err;});
            res.end(JSON.stringify({"status":"Successfully inserted On Sales Register !!"}));


      });
    }
    else {
        res.end(JSON.stringify({"status":"only "+result1[0].quantity+"  "+itemname+" is Present on stock !!"}));
    }
    });
      } else {
            res.end(JSON.stringify({"status":"Entered Mobile Number Is not registered!!!"}));
      }

    });

  });
});

// ListOfCustomer

app.get('/ListOfCustomer', function(req, res) {
  // database connect
  console.log("ListOfCustomer");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });

con.connect(function(err) {
    if (err) throw err;
    con.query(" select * from customer where amount>0 order by amount desc; ", function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
});

// Check OA
// ListOfCustomer

app.get('/checkOA', function(req, res) {
  // database connect
  console.log("checkOA");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
  });
var contact=req.query.custMobile;
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customer where contact =?",[contact], function(err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
});

app.get('/send_dates', function (req, res) {
    // database connect
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arundb",
    database: "jantastoredb"
    });
    console.log("dates sent");
    var date1=req.query.date1;
    var date2=req.query.date2;
    con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM sales where DateOfSale between ? and ? order by unitSold desc",[date1,date2], function (err, result, fields) {
        if (err) throw err;
          res.end(JSON.stringify(result));
        });
    });
});


server = app.listen(8081, function() {
  console.log("please go to localhost:8081 ");
});
