/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");
const { findMean, findMedian, findMode } = require("./stats");
const { convertStrNums } = require("./utils");

app.use(express.json());
app.use(express.urlencoded());

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  console.log("nums",req.query.nums)
  const queryNums = req.query.nums.split(','); //TODO: bad request error for all
  const intNums = convertStrNums(queryNums);//TODO: intNums
  console.log("intNum",intNums); //how to see the console.log
  const result = findMean(intNums);

  return res.json({ operation: "mean", value: result });
});

// ** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  const queryNums = req.query.nums.split(',');
  const intNums = convertStrNums(queryNums);
  const result = findMedian(intNums);

  return res.json({ operation: "median", value: `${result}` });
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  const queryNums = req.query.nums.split(',');
  const intNums = convertStrNums(queryNums);
  const result = findMode(intNums);

  return res.json({ operation: "mode", value: `${result}` });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
