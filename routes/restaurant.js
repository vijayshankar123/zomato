const express = require("express");
//const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
//const authm = require("../middleware/authm");
//const dateFormat = require("dateformat");
var MongoClient = require("mongodb").MongoClient;

const config = require("config");
const db = config.get("mongoURI");
const router = express.Router();

//get all restaurants and queries
router.get("/api/restaurant", async (req, res) => {
  try {
    await MongoClient.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },

      (err, db) => {
        if (err) throw err;
        var dbo = db.db("restaurant");

        //both search and sort
        if (req.query.search && req.query.sortBy) {
          const regex = new RegExp(escapeRegex(req.query.search), "gi");
          dbo
            .collection("restaurants")
            .find({ Restaurant_Name: regex })
            .sort({ Aggregate_rating: req.query.sortBy === "desc" ? -1 : 1 })
            .toArray(function(err, result) {
              if (err) throw err;
              else {
                if (result.length === 0) {
                  var nomatch = "Sorry! Restaurant not found";
                  return res.send(nomatch);
                }
                return res.send(result);
              }
            });

          //sort
        } else if (req.query.sortBy) {
          dbo
            .collection("restaurants")
            .find()
            .sort({ Aggregate_rating: req.query.sortBy === "desc" ? -1 : 1 })
            .toArray(function(err, result) {
              if (err) throw err;
              return res.send(result);
              db.close();
            });

          //search
        } else if (req.query.search) {
          const regex = new RegExp(escapeRegex(req.query.search), "gi");
          dbo
            .collection("restaurants")
            .find({ Restaurant_Name: regex })
            .toArray(function(err, result) {
              if (err) throw err;
              else {
                if (result.length === 0) {
                  var nomatch = "Sorry! Restaurant not found";
                  res.send(nomatch);
                } else {
                  return res.send(result);
                  db.close();
                }
              }
            });
        } else {
          dbo
            .collection("restaurants")
            .find()
            .toArray(function(err, result) {
              if (err) throw err;
              return res.send(result);
              db.close();
            });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

function escapeRegex(search) {
  return search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = router;
