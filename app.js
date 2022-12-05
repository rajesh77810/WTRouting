const express = require('express')
const app = express()
const cors = require('cors')
const { getConnection } =require('./connection')
var bodyParser = require('body-parser')
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({
  origin:'*'
}));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/List', async function(req, res){

  const getCon =await getConnection();
  console.log(getCon, 'getconnection')
  const result = await getCon.query(
     "SELECT * FROM RecipeList rl"
  ); 
  res.send(result.recordsets[0])
})


app.post('/api/SignUp', async function (req, res) {

  try{
  const { emailId, Password } = req.body;
  const getCon =await getConnection();
  const result = await getCon.query(
     `INSERT INTO credentials
      VALUES ('${emailId}', '${Password}')`
       ); 
  res.send(result.recordsets[0])
  }
  catch(err){
    console.log(err.message)
    res.send('')
  }
})

app.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT}`)
})