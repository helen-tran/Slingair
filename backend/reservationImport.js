const { reservations } = require("./data");

const { MongoClient, ServerApiVersion } = require("mongodb");

const reservationImport = async () => {
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
    // console.log(reservations);
    const result = await db.collection("reservations").insertMany(reservations);
    assert.equal(1, result.insertedCount);
    const assert = require("assert");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected");
};
reservationImport();
