const mongoose = require("mongoose");
const listing = require("../models/listings.js");
const sampleData = require("./data.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wandarlust_project");
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const initDB = async () => {
  await listing.deleteMany({});
  sampleData.data = sampleData.data.map((obj) => ({
    ...obj,
    owner: "6ab2b0533eca67b7320e30d5",
  }));

  await listing.insertMany(sampleData.data);
  const result = await listing.findOne({});
  console.log(result);
  console.log("initialized");
};

initDB();
