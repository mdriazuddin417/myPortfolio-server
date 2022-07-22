const express = require("express");

const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://clenaCo:B2ylUSF3jWicjcUQ@cluster0.jjz96.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const projectCollection = client.db("mywebsite").collection("project");
    const blogCollection = client.db("mywebsite").collection("blog");

    app.get("/project", async (req, res) => {
      const result = await projectCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    });

    app.get("/blog", async (req, res) => {
      const result = await blogCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const result = await blogCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello This is Consolation session ");
});

app.listen(port, () => {
  console.log("Example Post security check", port);
});
