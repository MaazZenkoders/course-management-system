const mysql = require('mysql2/promise');

const connectToDb = async (query) => {

    const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      
     if(db){
     console.log("Database connected")
    //  db.query("SELECT * FROM STUDENTS",(err,res) => {
    //  console.log(res || err)
    //  } )
     }
     return db
     
}

module.exports = {connectToDb};