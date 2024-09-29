const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/project");

const productSchema = mongoose.Schema({
  productName: String,
  Price: Number,
  productImage: {
      type: String,
  },
  productImage2: {
      type: String,
  }
});

module.exports = mongoose.model("product", productSchema);
