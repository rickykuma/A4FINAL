/********************************************************************************* 
 * * WEB322 – Assignment 04
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
 * * of this assignment has been copied manually or electronically from any other source 
 * * (including 3rd party web sites) or distributed to other students. 
 * * 
 * * Name: Mohammad Rashidi Khorsand   Student ID: 134713213 Date: 30/10/22 * 
 * ********************************************************************************/

const HTTP_PORT = process.env.PORT || 8080;


const path = require("path");


const data = require("./modules/officeData.js");



const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.get("/audio", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/audio.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});


app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/video.html"));
});

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/list.html"));
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/table.html"));
});

app.get("/storefront", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/storefront.html"));
});

app.get("/PartTimer", (req, res) => {
  data.getPartTimers().then((data) => {
    res.json(data);
  });
});

app.get("/employee/:employeeNum", (req, res) => {
  data
    .getEmployeeByNum(req.params.employeeNum)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

data
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, () => {
      console.log("app listening on port: " + HTTP_PORT);
    });
  })
  .catch(function (err) {
    console.log("unable to start server: " + err);
  });