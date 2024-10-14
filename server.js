const express=require("express")
const cors=require('cors')

const app=express()

const PORT = process.envPORT || 5000;
const mysql=require("mysql")

// step 1 establishing connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbthesis"
})

// step 2 sending queries (get)
connection.connect()
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.get("/api/facts", (req,res) => {
    connection.query("SELECT * FROM tblfacts ORDER BY RAND() LIMIT 1", (err, rows, fields) => {
        if (err) throw err;
        
        console.log(rows); // Log the rows to inspect the structure

        res.json(rows[0]); // Return the first row
    });
})

// new API link
app.get("/api/facts/:id", (req, res) => {
    const num = req.params.id

    connection.query(`SELECT * FROM tblfacts WHERE id="${num}"`, (err, rows, fields) => {
        if(err) throw err;
        if(rows.length > 0){
            res.json(rows)
        }else{
            res.status(400).json({msg: `${num} not found!`})
        }
    })
})

// route that returns a random fact



// post - insert/create database
app.post("/api/facts", (req, res)=>{
    const fact = req.body.fact;

    connection.query(`INSERT INTO tblfacts (fact) VALUES ('${fact}')`, (err, rows, fields) => {
        //check if Ã‚ there are errors, then throwing the error
      if (err) throw err;
      //if successful
      res.json({msg: `Fact successfully inserted!`});
    })
})

// put - Update
app.put("/api/facts", (req,res) => {
    const fact = req.body.fact;

    connection.query(`UPDATE tblfacts SET fact='${fact}' WHERE id=${id}`, (err, rows, fields) => {
        //check if Ã‚ there are errors, then throwing the error
      if (err) throw err;
      //if successful
      res.json({msg: `Fact successfully updated!`});
    })

})

// delete database
app.delete("/api/facts", (req,res) => {
    const id = req.body.id;

    connection.query(`DELETE FROM tblfacts WHERE id=${id}`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Fact successfully deleted!`})
    })
})

app.listen(5000,()=>{
    console.log(`Server is running in port no. ${PORT}`)
})