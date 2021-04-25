import express from "express";
// const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());

app.listen(3030, function () {
  console.log("3030 vai ");
});

// app.get("/", (req, res) => {
//   res.send("Hello world2");
// });

const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://admin:admin@basecluster-shard-00-00.hirbx.mongodb.net:27017,basecluster-shard-00-01.hirbx.mongodb.net:27017,basecluster-shard-00-02.hirbx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-12fzsk-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    const query = {rated:"TV-G"};
    const options = {
      sort: { title: 1 },
      projection: { title: 1, genres: 1 },
    };
    // const movie = await movies.findOne(query);
    const moviesAll = await movies.find(query,options);


    let vetorFilmes: Array<Object> = [];
    await moviesAll.forEach((filme:any)=>(
      vetorFilmes.push(filme)
    ));
    app.get("/", (req, res) => {
      res.json(vetorFilmes);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
