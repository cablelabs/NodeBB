var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var file = new Schema({
    path: { type: String, required: false },

    name: { type: String, required: false },

    contents : { type: String, required: false },

    type: { type: String, required: false },

    lastUpdated: { type: Date, required: false }

});

exports.getFileSchema = function() {
    return file;
}