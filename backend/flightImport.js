const { flights } = require("./data");

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
    const flightNumbers = Object.keys(flights);
    const data = flightNumbers.map((flightNumber) => {
      return {
        flightNumber: flightNumber,
        seats: flights[flightNumber],
      };
    });

    const result = await db.collection("flights").insertMany(data);
    assert.equal(1, result.insertedCount);
    const assert = require("assert");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected");
};
flightsImport();
