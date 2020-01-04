const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  Restaurant_ID: {
    type: Number
  },
  Restaurant_Name: {
    type: String
  },
  Cuisines: {
    type: String
  },
  Average_Cost_for_two: {
    type: Number
  },
  Currency: {
    type: String
  },
  Has_Table_booking: {
    type: String
  },
  Has_Online_delivery: {
    type: String
  },
  Aggregate_rating: {
    type: Number
  },
  Rating_color: {
    type: String
  },
  Rating_text: {
    type: String
  },
  Votes: {
    type: Number
  }
});
module.exports = mongoose.model("restaurant", RestaurantSchema);
