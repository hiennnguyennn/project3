const express=require('express');
var app=express();
const path=require('path');

const morgan=require('morgan');
//app.use(morgan,'combined');

app.use(express.json());
app.use(express.urlencoded({extended:true}));



const handlebars=require('express-handlebars');
app.engine('handlebars',handlebars());
app.set('view engine','handlebars');
app.set('views',path.join(__dirname,'resource\\views'));
var hbs = handlebars.create({
    helpers: {
      sum: function (a, b) {
        return a + b;
      }
    },
   
  });
  app.engine('handlebars', hbs.engine);
  

 app.use(express.static(path.join(__dirname,'public')));

const methodOverride=require('method-override');
app.use(methodOverride('_method'));

const cookieParser=require('cookie-parser');
app.use(cookieParser('abcxyz'));

require('dotenv').config({path:'src/.env'});

const db=require('./config/db');
db.connect();

const route=require('./routes');
route(app);



app.listen(process.env.PORT,()=>{
    console.log(`project listening at http://localhost:${process.env.PORT}`)
});

