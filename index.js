const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const {writeFile} = require('fs/promises');
const bodyparser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
 




app.post('/:departmentCode',(request,response)=>{
    let departmentCode = request.params.departmentCode;
    let rs;
    const con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"kitk@t112",
        database:"attendance"
    });
    con.connect( (err)=>{
        if(err) throw err;
    
        console.log("Connected",departmentCode);
        let query = `SELECT emp_code,punch_time,area_alias FROM iclock_transaction WHERE emp_code LIKE '${departmentCode}%' ORDER BY punch_time `;
        console.log(query);
        
        con.query(query, async function (err, result, fields) {
            if (err) response.send("result no found ").status(404);
            console.log( result,"re");
            response.send(result).status(200);
            result.forEach(record => {
                record.punch_time= new Date(record.punch_time );
                console.log(record.punch_time);
                
                
            });
            await writeFile('data.json',JSON.stringify(result));
            console.log("written successfully" , typeof(result));
           rs=result;
            
          });
         
    });
    
});

app.listen(3000,()=> console.log("the server is runnning in the port 3000"));