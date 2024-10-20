const express = require('express')
const mongoDB = require('./db')
//satya
const app = express()

const port =process.env.PORT || 5000;

mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin.X-requested-With,Content-Type,Accept"
    );
    next();
})

app.get('/', (req, res) => {

    res.send('Hello World!')

})
app.use(express.json());
app.use('/api',require("./routes/createuser"));
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
