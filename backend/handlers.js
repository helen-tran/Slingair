"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

// get flights
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

// get single flight - fix this
const getFlight = (req, res) => {
  const flightNumber = req.params.flight.toUpperCase();

  const findFlight = flights[flightNumber];
  if (!findFlight) {
    res.status(404).json({ status: 404, message: "Flight not found" });
  }
  res.status(200).json(findFlight);
};

// adding reservations
const addReservations = (req, res) => {
  const newRes = req.body;
  const givenName = req.body.firstName;
  const surname = req.body.lastName;
  const email = req.body.email;
  const seat = req.body.seat;
  const flight = req.body.flight;
  const id = uuidv4();
  newRes.id = id;

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

// get all reservations
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

// get single reservation
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

// delete reservation
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
// update reservation
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
