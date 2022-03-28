"use strict";
const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
// const { flights, reservations } = require("./data");

// GET ALL FLIGHTS
const getFlights = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("Slingair");

    const mongoFlights = await db.collection("flights").find().toArray();
    if (mongoFlights) {
      return res
        .status(200)
        .json({ status: 200, message: "Flights found!", data: mongoFlights });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Flights not found",
        data: mongoFlights,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET SINGLE FLIGHT
const getFlight = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Slingair");
    const flightNumber = req.params.flightNumber;

    const flight = await db.collection("flights").findOne({ flightNumber });
    if (flight) {
      return res
        .status(200)
        .json({ status: 200, message: "Found flights!", data: flight });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Didn't find any flights",
        data: flight,
      });
    }
  } finally {
    client.close();
  }
};

// ADDING RESERVATION
const addReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Slingair");
    const newRes = req.body;
    const flightNumber = req.body.flight;
    const seat = req.body.seat;
    const id = uuidv4();
    newRes.id = id;

    const reservations = await db.collection("reservations").insertOne(newRes);
    await db
      .collection("flights")
      .updateOne(
        { flightNumber: flightNumber, "seats.id": seat },
        { $set: { "seats.$.isAvailable": false } }
      );
    if (reservations) {
      return res.status(200).json({
        status: 200,
        message: "Reservations added!",
        data: newRes,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Reservations fail to add",
        data: newRes,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET ALL RESERVATION
const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("Slingair");

    const reservations = await db.collection("reservations").find().toArray();
    if (reservations) {
      return res.status(200).json({
        status: 200,
        message: "Reservations found!",
        data: reservations,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Reservations not found",
        data: reservations,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET SINGLE RESERVATION
const getSingleReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Slingair");
    const seat = req.params.seat.toUpperCase();

    const reservation = await db.collection("reservations").findOne({ seat });
    if (reservation) {
      return res.status(200).json({
        status: 200,
        message: "Found your reservation!",
        data: reservation,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Didn't find your reservation",
        data: reservation,
      });
    }
  } finally {
    client.close();
  }
};

// DELETE RESERVATION
const deleteReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Slingair");
    const flightNumber = req.params.flightNumber;

    const flight = await db.collection("flights").findOne({ flightNumber });
    if (flight) {
      return res
        .status(200)
        .json({ status: 200, message: "Found flights!", data: flight });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Didn't find any flights",
        data: flight,
      });
    }
  } finally {
    client.close();
  }
};
// UPDATE RESERVATION
const updateReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const flight = req.body.flight;
  const seatRes = req.body.seat;
  const givenName = req.body.givenName;
  const surname = req.body.surname;
  const email = req.body.email;
  const id = req.params.idRes;

  try {
    await client.connect();
    const db = client.db("Slingair");

    const reservation = await db
      .collection("reservations")
      .findOne({ _id: ObjectId(id) });

    if (!reservation) {
      return res.status(404).json({
        status: 404,
        message: "Reservation not found or reservation number is invalid.",
        data: reservation,
      });
    }
    // update flight
    if (flight) {
      await db
        .collection("reservations")
        .updateOne({ _id: ObjectId(id) }, { $set: { flightNumber: flight } });
    }
    // update seat
    if (seatRes) {
      const flightData = await db
        .collection("flights")
        .findOne({ flightNumber: flight });

      const matchSeat = flightData.seats.find((seat) => {
        return seatRes === seat.id;
      });

      if (matchSeat.isAvailable) {
        await db
          .collection("reservations")
          .updateOne({ _id: ObjectId(id) }, { $set: { seat: seatRes } });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Please choose another seat, the chosen seat is reserved.",
          data: matchSeat,
        });
      }
    }
    // update given name
    if (givenName) {
      await db
        .collection("reservations")
        .updateOne({ _id: ObjectId(id) }, { $set: { givenName: givenName } });
    }
    // update surname
    if (surname) {
      await db
        .collection("reservations")
        .updateOne({ _id: ObjectId(id) }, { $set: { surname: surname } });
    }
    // update email
    if (email) {
      await db
        .collection("reservations")
        .updateOne({ _id: ObjectId(id) }, { $set: { email: email } });
    }

    const updateData = await db
      .collection("reservations")
      .findOne({ _id: ObjectId(id) });
    return res.status(200).json({
      status: 200,
      message: `The reservation has been updated!`,
      data: updateData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
