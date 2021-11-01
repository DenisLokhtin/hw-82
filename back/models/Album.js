const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    release: {
        type: Date,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;