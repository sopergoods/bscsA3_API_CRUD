//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
//port number
const PORT = process.env.PORT || 5000;

const logger = (req,res,next)=>{
    http://google.com
    console.log (`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()} `)
    next()
}
app.use(logger)
//connection to my sql
const connection = mysql.createConnection({
    host:"bg5weyjdz3bjxlhoqpzs-mysql.services.clever-cloud.com", 
    user:"u19r0bw8fxlimcy7",
    password:"CUKhB1vhMBSln8tdmpxI",
    database:"bg5weyjdz3bjxlhoqpzs",
});

// initilization of connection
connection.connect();

app.get("/api/members",(req,res)=>{
    //create a query
    connection.query("SELECT * FROM userdata",(err, rows, fields) =>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair
        res.json(rows);
        
    })
})

//API
//passing the id parameter
//request - >> front end ID
app.get("/api/members/:id", (req,res)=>{
    const id = req.params.id;
    connection.query(`SELECT * FROM userdata WHERE id = '${id}'`,(err,rows,fields)=>{
        if(err) throw err;

        if (rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id} id not found`})
        }
    })




    //res.send(id);
})

//POST - create
app.use(express.urlencoded({extended: false}))
app.post("/api/members", (req,res)=>{
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const gender = req.body.gender

    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}','${lname}','${email}','${gender}') `,(err,rows,fields)=>{
        if(err) throw err
        res.json({msg: `Successfully inserted`})
    })

})

//crud
//API
//PUT -  update
app.use(express.urlencoded({extended: false}))
app.put("/api/members", (req,res)=>{
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const gender = req.body.gender
    const id = req.body.id

    connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}',gender='${gender}'WHERE id = '${id}'`, (err,rows,fields)=>{
        if(err) throw err
        res.json({msg: 'Successfully updated'})
    })

})

// Delete api 
app.use(express.urlencoded({extended: false}))
app.delete("/api/members", (req,res)=>{
    const id = req.body.id
    connection.query(`DELETE FROM userdata WHERE id = '${id}'`,(err,rows,fields)=>{
        if(err)throw err
        res.json({msg:'Successfully updated!'})
    })



})

//importing moment package


app.listen(5000,()=>{
    console.log(`Server is running is port ${PORT}`);
})
 
