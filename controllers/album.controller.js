const Album = require('../models/album.model.js');

// Create and Save a new Album
exports.create = (req, res) => {

 // Validate request
    if(!req.body.title || !req.body.release ) {
        return res.status(400).send({
            message: "Album title can not be empty"
        });
    }

    // Create an Album
    const album = new Album({
        title:req.body.title,
        release:req.body.release,
        genre:req.body.genre,
        cover_url:req.body.cover_url
    });

    // Save Album in the database
    album.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Album."
        });
    });
};

// Retrieve and return all albums from the database.
exports.findAll = (req, res) => {
    Album.find()
    .then(albums => {
        res.send(albums);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving albums."
        });
    });
};


// Delete an album with the specified albumId in the request
exports.delete = (req, res) => {
    Album.findByIdAndRemove(req.params.albumId)
    .then(album => {
        if(!album) {
            return res.status(404).send({
                message: "Album not found with id " + req.params.albumId
            });
        }
        res.send({message: "Album deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Album not found with id " + req.params.albumId
            });                
        }
        return res.status(500).send({
            message: "Could not delete album with id " + req.params.albumId
        });
    });
};