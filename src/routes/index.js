const express = require("express");
const router = express.Router();
const dbClient = require("../dbHandler/dbConnection");
const config = require("../config");
const CheckAuth = require("../auth/check-auth");

router.get("/", CheckAuth, async (req, res) => {
  try {
    dbClient
      .connect()
      .then(async (db) => {
        console.log("DataBase connected !");
        var dbo = db.db(`${config.dbName}`);

        dbo
          .collection("movies")
          .aggregate([
            { $unwind: "$genres" },
            {
              $group: {
                _id: "$genres",
                // tags: { $sum: 1 },
                movies: {
                  $push: {
                    title: "$title",
                    director: "$director",
                    imdb_rating: "$imdb_rating",
                    length: "$length",
                    poster: "$poster",
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                category: "$_id",
                movies: 1,
              },
            },

            //   { $sort: { finalTotal: -1 } },
          ])
          .toArray((err, results) => {
            if (err) {
              res.status(400).send({ err });
            }
            res.status(200).send({ results });
          });
      })
      .catch((e) => {
        console.log("error connecting DB ", e);
      });
  } catch (e) {
    console.log("err catched :", e);
  }
});

module.exports = router;
