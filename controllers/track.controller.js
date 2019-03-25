const Track = require('../models/track.model.js');

// Create and Save a new Track
exports.create = (req, res) => {

 // Validate request
    if(!req.body.title || !req.body.duration ) {
        return res.status(400).send({
            message: "Track title and duration can not be empty"
        });
    }

    // Create a Track
    const track = new Track({
        title:req.body.title,
        duration:req.body.duration,
        listenings:req.body.listenings,
        likes:req.body.likes
    });

    // Save Track in the database
    track.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Track."
        });
    });
};

// Retrieve and return all tracks from the database.
exports.findAll = (req, res) => {
    Track.find()
    .then(tracks => {
        res.send(tracks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tracks."
        });
    });
};

// Find a single Album with a albumId
exports.findOne = (req, res) => {
  Track.findById(req.params.trackId)
    .then(track => {
      if (!track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      res.send(track);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving track with id ' + req.params.trackId
      });
    });
};

// Update an Track identified by the trackId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.title || !req.body.duration ) {
        return res.status(400).send({
            message: "Track title and duration can not be empty"
        });
    }

  // Find track and update it with the request body
  Track.findByIdAndUpdate(
    req.params.trackId,
    {
      title: req.body.title,
      duration: req.body.duration,
      listenings: req.body.listenings,
      likes: req.body.likes
    },
    { new: true }
  )
    .then(track => {
      if (!track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      res.send(track);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      return res.status(500).send({
        message: 'Error updating track with id ' + req.params.trackId
      });
    });
};


// Delete a track with the specified trackId in the request
exports.delete = (req, res) => {
    Track.findByIdAndRemove(req.params.trackId)
    .then(track => {
        if(!track) {
            return res.status(404).send({
                message: "Track not found with id " + req.params.trackId
            });
        }
        res.send({message: "Track deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Track not found with id " + req.params.trackId
            });                
        }
        return res.status(500).send({
            message: "Could not delete track with id " + req.params.trackId
        });
    });
};