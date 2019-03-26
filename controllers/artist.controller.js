const Artist = require('../models/artist.model.js');

// Create and Save a new Artist
exports.create = (req, res) => {

 // Validate request
    if(!req.body.nom || !req.body.birth ) {
        return res.status(400).send({
            message: "Artist name and birth can not be empty"
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
    .populate("albums")
    .then(artists => {
        res.send(artists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving artists."
        });
    });
};

// Find a single Artist with a artistId
exports.findOne = (req, res) => {
  Artist.findById(req.params.artistId).populate('albums')
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving artist with id ' + req.params.artistId
      });
    });
};

// Update an Artist identified by the artistId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.followers) {
        return res.status(400).send({
            message: "Artist's followers can not be empty"
        });
    }

  // Find artist and update it with the request body
  Artist.findByIdAndUpdate(
    req.params.artistId,
    {
      //nom: req.body.nom,
      //birth: req.body.birth,
      followers : req.body.followers
    },
    { new: true }
  )
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Error updating artist with id ' + req.params.artistId
      });
    });
};



//add an album to the albums array
exports.addAlbum = (req, res) => {
  // Validate Request

Artist.findOneAndUpdate(
      {_id: req.body.artistId},
      {$push:
            {albums:req.body.album_id } 
      },{save:true})
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Error updating artist with id ' + req.params.artistId
      });
    });
};

//add an album to the albums array
exports.removeAlbum = (req, res) => {
  // Validate Request

Artist.findOneAndUpdate(
      {_id: req.params.artistId},
      {$pull:
            {albums:req.params.album_id} 
      },{save:true})
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Error updating artist with id ' + req.params.artistId
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

