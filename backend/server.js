"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const {
  getFlights,
  getFlight,
  addReservations,
  getReservations,
  getSingleReservation,
  deleteReservation,
} = require("./handlers");
const PORT = process.env.PORT || 8000;
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  //
  // add new endpoints here ☝️
  // getting flights
  .get("/api/flights", getFlights)

  // getting flight
  .get("/api/:flight", getFlight)

  // adding reservation
  .post("/reservations", addReservations)

  // getting reservation
  .get("/reservations", getReservations)

  // get a single reservation
  .get("/reservations/:seat", getSingleReservation)

  // delete reservation
  .delete("/reservations/:seat", deleteReservation)
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
