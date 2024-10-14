const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded( {extended: false} ));
// strict:false is needed to accept raw string
app.use(bodyParser.json({strict:false}));

const port = process.env.PORT || 3001 // default is port 3000 (locally) but if there a different environment then use port that is default for the environment (np. strona serwowana z azurowego dysku bedzie miala domyslny port uzyty w srodowisku azura)

let quizesList;

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

app.post("/quiz", (req, res)=> {
  try{
    quizesList = req.body;
    console.log("server posting quizzes, quizesList", quizesList);
  } catch(error){
    if (error.httpCode) {
      res.status(error.httpCode).send(error.httpMsg);
    } else {
      res.status(500).send();
      console.log('Error on the server, posting task failed: ', error);
    }
  }  
    
})

app.get("/quiz", (req,res) => {
  try{
    res.send(quizesList);
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




// app.post('/users/tasks', async function(req, res){
//   try {    
//     let user = await getUserfromMongo(req);
//     let nextTaskId = user.nextTaskId;
//     const singleTask = {
//       taskName: "",
//       checked: false,
//       taskId: -1
//     }
//     singleTask.taskId = nextTaskId;
//     nextTaskId = nextTaskId + 1;
//     user.nextTaskId = nextTaskId;
//     console.log("nextTaskId", nextTaskId)
//     singleTask.taskName = req.body.userTask;
//     user.tasks.push(singleTask);
//     console.log("user", user);
//     await saveDataMongo(user);
//     // console.log("allTasks", allTasks);
//     res.send("OK");
//   }catch(error){
//     if (error.httpCode) {
//       res.status(error.httpCode).send(error.httpMsg);
//     } else {
//       res.status(500).send();
//       console.log('Error on the server, posting task failed: ', error);
//     }
//   }
// })



// app.get('/users/tasks', async function (req, res){
//   try{
//     let user = await getUserfromMongo(req);
//     let taskArr = user.tasks
//     console.log("Sending tasks", taskArr.length);
//     res.send(taskArr);
//   } catch(error){
//     if (error.httpCode) {
//       res.status(error.httpCode).send(error.httpMsg);
//     } else {
//       res.status(500).send();
//       console.log('Error on the server, getting task list failed: ', error)
//     } 
//   }  
// })

// app.delete('/users/tasks/:id', async function (req, res){
//   try{
//     let taskNum = req.params.id;
//     let user = await getUserfromMongo(req);
//     let taskArr = user.tasks
//     for (let i = 0; i < taskArr.length; i++){
//       if (taskNum == taskArr[i].taskId){
//         taskArr.splice(i, 1);
//         await saveDataMongo(user);
//         res.send();
//       }
//     }
//   }catch(error){
//     if (error.httpCode) {
//       res.status(error.httpCode).send(error.httpMsg);
//     } else {
//     res.status(500).send();
//     console.log('Error on the server, deleting task failed: ', error);
//     }
//   }  
// })