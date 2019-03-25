const Artist = require('../models/artist.model.js');

// Create and Save a new Artist
exports.create = (req, res) => {

 // Validate request
    if(!req.body.nom || !req.body.birth ) {
        return res.status(400).send({
            message: "Artist name can not be empty"
        });
    }

    // Create an Artist
    const artist = new Artist({
        nom:req.body.nom,
        birth:req.body.birth,
        followers:req.body.followers
    });

    // Save Artist in the database
    artist.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Artist."
        });
    });
};

// Retrieve and return all artists from the database.
exports.findAll = (req, res) => {
    Artist.find()
    .then(artists => {
        res.send(artists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving artists."
        });
    });
};


// Delete an artist with the specified artistId in the request
exports.delete = (req, res) => {
    Artist.findByIdAndRemove(req.params.artistId)
    .then(artist => {
        if(!artist) {
            return res.status(404).send({
                message: "Artist not found with id " + req.params.artistId
            });
        }
        res.send({message: "Artist deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Artist not found with id " + req.params.artistId
            });                
        }
        return res.status(500).send({
            message: "Could not delete artist with id " + req.params.artistId
        });
    });
};