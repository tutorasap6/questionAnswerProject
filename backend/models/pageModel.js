const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
    
  about: {
    type: String,
    required: true
  },
  how: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Pages", pageSchema);