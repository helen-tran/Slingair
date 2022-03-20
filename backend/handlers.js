"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  const data = flights;
  if (data) {
    res.status(200).json({ status: 200, data });
  } else {
    res.status(404).json({
      status: 404,
      message: "There was an error getting the flights.",
    });
  }
};

const getFlight = (req, res) => {
  const flightId = req.params.flight.toUpperCase();
  const flightNumber = flights.SA231;
  const flight = flightNumber.find((flight) => {
    return flightId === flight.id;
  });
  if (!flight) {
    res.status(404).json({ status: 404, message: "Flight not found" });
  }
  res.status(200).json({ flight });
};

const addReservations = (req, res) => {
  const newRes = req.body;
  const givenName = req.body.givenName;
  const surname = req.body.surname;
  const email = req.body.email;
  const seat = req.body.seat;
  const id = uuidv4();
  newRes.id = id;
  newRes.flight = "SA231";

  if (!id) {
    res
      .status(404)
      .json({ status: 404, message: "Missing seating information." });
  } else if (!givenName) {
    res.status(404).json({ status: 404, message: "First Name is missing." });
  } else if (!surname) {
    res.status(404).json({ status: 404, message: "Surname is missing." });
  } else if (!email) {
    res.status(404).json({ status: 404, message: "Email is missing." });
  } else if (!email.includes("@")) {
    res
      .status(404)
      .json({ status: 404, message: "Enter a correct email address." });
  } else if (!seat) {
    res
      .status(404)
      .json({ status: 404, message: "Seat information is missing." });
  }
  reservations.push(newRes);
  res.status(200).json({
    status: 200,
    message: "New reservation was added.",
  });
};

const getReservations = (req, res) => {
  const data = reservations;
  if (data) {
    res.status(200).json({ status: 200, data });
  } else {
    res.status(404).json({
      status: 404,
      message: "There was an error getting the reservations.",
    });
  }
};

const getSingleReservation = (req, res) => {
  const seat = req.params.seat.toUpperCase();
  const findReservation = reservations.find((reservation) => {
    return String(reservation.seat) === String(seat);
  });
  if (!findReservation) {
    res.status(404).json({ status: 404, message: "Reservation not found" });
  }
  res.status(200).json({ findReservation });
};

const deleteReservation = (req, res) => {
  const deleteRes = req.params.seat.toUpperCase();
  const matchSeat = reservations.find((res) => {
    return res.seat === String(deleteRes);
  });
  if (matchSeat) {
    const index = reservations.indexOf(matchSeat);
    reservations.splice(index, 1);
    res.status(200).json({
      status: 200,
      message: "Reservation was deleted.",
    });
  } else {
    return res
      .status(404)
      .json({ status: 404, message: "Seat doesn't exist or wasn't reserved." });
  }
};

const updateReservation = (req, res) => {};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
