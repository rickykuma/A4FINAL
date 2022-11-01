/********************************************************************************* 
 * * WEB322 – Assignment 04
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
 * * of this assignment has been copied manually or electronically from any other source 
 * * (including 3rd party web sites) or distributed to other students. 
 * * 
 * * Name: Mohammad Rashidi Khorsand   Student ID: 134713213 Date: 30/10/22 * 
 * ********************************************************************************/

const express = require("express");
const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");
const data = require("./modules/officeData");
express.urlencoded({ extended: true }); 
middleware (using ,app.use());

const app = express();


 const HTTP_PORT = process.env.PORT || 8080;
 app.use(express.static("public"));


 app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "views/home.html"));
 });

 app.get("/audio", (req,res)=>{
    res.sendFile(path.join(__dirname, "views/audio.html"));
 });

 app.get("/video", (req,res)=>{
    res.sendFile(path.join(__dirname, "views/video.html"));
 });
 
 app.get("/list", (req,res)=>{
    res.sendFile(path.join(__dirname, "views/list.html"));
 });
  
 app.get("/table", (req,res)=>{
    res.sendFile(path.join(__dirname, "views/table.html"));
 });

 app.get("/storefront", (req,res)=>{
   res.sendFile(path.join(__dirname, "views/storefront.html"));
});


 app.get("/PartTimer", (req,res)=>{
    data.getPartTimers().then((data)=>{
        res.json(data);
    });
 });

 app.get("/employee/:employeeNum",(req,res)=>{
    data.getEmployeeByNum(req.params.employeeNum).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json({message:"no results"});
    });
 });


 app.use((req,res)=>{
    res.status(404).send("Page Not Found");
 });

 data.initialize().then(function(){
   app.listen(HTTP_PORT, function(){
      console.log("app listening on: " +  HTTP_PORT)
   });
 }).catch(function(err){
   console.log("Unable to start server: " + err);
 });