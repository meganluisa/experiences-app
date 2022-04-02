const { MongoClient } = require("mongodb");
const url = "mongodb+srv://meganluisa:3zenmNhKUUunY49@cluster0.mongodb.net/experiences?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
const dbName = "experiences";

async function run(){
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    const col = db.collection("photos");
    let photoDocument = {
      "photoPath": ''
    }

    const p = await col.insertOne(photoDocument);
    const myDoc = await col.findOne();
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  }
  finally {
    await client.close();
  }
}

run().catch(console.dir)