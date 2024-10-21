const express = require("express");
const port = 3000;

const app = express();
//create a todo app which lets you store todos on the server and alsso savew in a file
//create a https server in oglang using gurrila framework

app.get('/route-handler', (req,res)=> (res.json
    ({
        name:"Aarul",
        age:"21",
    })
))
app.get("/", (req, res) => res.send("Hello World"));


app.listen(port);
