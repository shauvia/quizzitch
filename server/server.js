require('@dotenvx/dotenvx').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const storage = require('./index.js');



const saveDataMongo = storage.saveDataMongo;
const loadDatafromMongo = storage.loadDatafromMongo;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded( {extended: false} ));
// strict:false is needed to accept raw string
app.use(bodyParser.json({strict:false}));

const port = process.env.PORT || 3001 // default is port 3000 (locally) but if there a different environment then use port that is default for the environment (np. strona serwowana z azurowego dysku bedzie miala domyslny port uzyty w srodowisku azura)

// let quizesList;

function listening(){
  console.log('server runnning');
  console.log(`runnning on localhost ${port}`);
}

app.get('/', (req, res) => {
  res.send('Hello from Jasna Cholera!');
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Idź w cholere!" });
});

app.get("/ruskisaper", (req,res) => {
  res.json({message: 'Nie cierpię programować jak ruski saper!!!!!!!!'})
});

app.post("/quiz", async (req, res)=> {
  try{
    let quizzesList = req.body;
    await saveDataMongo(quizzesList);
    console.log("server posting quizzes, quizesList", quizzesList);
  } catch(error){
    if (error.httpCode) {
      res.status(error.httpCode).send(error.httpMsg);
    } else {
      res.status(500).send();
      console.log('Error on the server, posting task failed: ', error);
    }
  }  
    
})

app.get("/quiz", async (req,res) => {
  try{
    let quizzesList =  await loadDatafromMongo();
    console.log("server get, data", quizzesList)
    if (!quizzesList){
      let qArr = []
      res.send(qArr);
    } else {
      res.send(quizzesList);
    }
  } catch(error){
      if (error.httpCode) {
        res.status(error.httpCode).send(error.httpMsg);
      } else {
        res.status(500).send();
        console.log('Error on the server, retrieveQuizzes failed: ', error)
      }
    }   
});

const server = app.listen(port, listening);

