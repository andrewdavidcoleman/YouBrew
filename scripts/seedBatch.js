// Initial database seed information.
// !! ONLY USE FOR DEVELOPMENT !!
// This script empties and replaces the Batch collection

const mongoose = require("mongoose");
const db = require("../models");

function seedBatch() {

  const convertedDate = new Date(Date.now());

  const batchSeed = [
    {
        name: "Queen's Weiss",
        style: "hefeweissen",
        availVol: 20,
        totalVol: 20,
        date: Date.now(),
        endDate: Date.now() + 6000,
        isReady: false
    },
    {
        name: "Southern BEL",
        style: "Belgian single",
        availVol: 40,
        totalVol: 40,
        date: Date.now(),
        endDate: Date.now() + 10000,
        isReady: false
    },
    {
        name: "Equilibrium",
        style: "pale ale",
        availVol: 20,
        totalVol: 20,
        date: Date.now(),
        endDate: Date.now() + 6000,
        isReady: false
    },
    {
        name: "EveryDay",
        style: "pilsner",
        availVol: 20,
        totalVol: 20,
        date: Date.now(),
        endDate: Date.now() + 6000,
        isReady: false
    }
  ];

    db.Batch
        .remove({})
        .then(() => db.Batch.collection.insertMany(batchSeed))
        .then(data => {
            console.log(data.insertedIds.length + " records inserted!");
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

module.exports = seedBatch;
