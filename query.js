const { connectToDb } = require("./src/utils/db");

const pool = connectToDb()
const res = pool.query(`SELECT * FROM students`,function(err,result){
    if (err){
        console.log(err)
    }
    else{
        console.log(result)
    }
})
