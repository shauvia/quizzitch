const { MongoClient } = require("mongodb");



const url = process.env.DB_URL;
console.log(`Hello ${process.env.HELLO}`)

const client = new MongoClient(url);

async function saveDataMongo(data) {
  try {
          await client.connect();
          console.log("Successfully connected to Atlas");

          // Get the database and collection on which to run the operation
          const db = client.db("quizAppDatabase");
          //  console.log("db", db)
          const col = db.collection("allQuizzes");
          //  console.log('id', id)
          const id = "lisWitalis";
          const filter = {_id : id};
          console.log("filter", filter);
          await col.deleteOne(filter);
          const userdData = {
            _id: "lisWitalis",
            quizzesList: data
          }
          const result = await col.insertOne(userdData);
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
    
  
        } finally {await client.close();}
} 

async function loadDatafromMongo(){
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
    const db = client.db('quizAppDatabase');
    const col = db.collection('allQuizzes');

    const id = "lisWitalis";
    const query = {_id : id};
    const allRecords = await col.findOne(query);
    console.log(`2Records has been read with _id: ${allRecords._id}`);
    return allRecords.quizzesList;

    
  } finally {
    // await client.close();
  }
}
     

let storage = {
  saveDataMongo: saveDataMongo,
  loadDatafromMongo: loadDatafromMongo,
};

module.exports = storage;