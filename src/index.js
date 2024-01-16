const express = require('express');
require('./database/database')
const groceriesRouter = require('./routes/groceries');
const marketsRouter = require('./routes/markets');
const cookieParser = require('cookie-parser');
const authRouter= require('./routes/auth')

const app = express();
const session=require('express-session');
const PORT = 3001; //assigning the port for the server
app.use(express.json()) /*Middleware => This middleware invokes when user send the request to the server, and server will give
                                         the response back to ther server, in between this time it will execute.      
                                     => Middleware should be on the top.     */
                                
    
app.use(cookieParser())

app.use(session({
    secret: "sldfkjsdjlkflksdjfksdf",
    resave:false,
    saveUninitialized:false
}));
app.listen(PORT,() => console.log(`Running expres server on port ${PORT} !`)) 
app.use((req,res,next) => {   // next is a function which is used transfer the request and response to the next app.use
    console.log(`${req.method}: ${req.url}`);
    next();
})
app.use('/auth',authRouter);
app.use((req,res,next) =>{
    if(req.session.user)
        next();
    else
        res.sendStatus(401);
});

app.use('/groceries',groceriesRouter);  // /api is prefix , you can add it if you want or if you dont add it then it is also okay
                                  //if the the original route is /groceries which is in the route,but after adding /api prefix.
                                 // your parth become /api/groceries
app.use('/markets',marketsRouter);


 // app.listen is used to assing the port to the server
                                                                                 // where the server will run on the given port. 








