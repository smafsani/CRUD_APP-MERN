const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/useRoute');
const cors = require('cors');

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection success"))
.catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.use("/user", userRoute);




function errorHandler(err, req, res, next){
    if(res.headerSend){
        return next(err);
    }
    res.status(500).json({error : err});
}
app.use(errorHandler);



module.exports = app;