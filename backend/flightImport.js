const { flights } = require("./data");
const flightsData = flights.SA231;

const { MongoClient, ServerApiVersion } = require("mongodb");

const flightsImport = async () => {
  const uri =
    "mongodb+srv://helen-tran:3iOVo3tyBfpcmFeS@slingair.2lwzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const assert = require("assert");
  try {
    await client.connect();
    const db = client.db("Slingair");
    console.log("connected");
    // console.log(flightsData);
    const result = await db.collection("flights").insertMany(flightsData);
    assert.equal(1, result.insertedCount);
    const assert = require("assert");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected");
};
flightsImport();
