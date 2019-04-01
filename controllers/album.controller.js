const Album = require('../models/album.model.js');
const Artist = require('../controllers/artist.controller.js');
const Track = require('../models/track.model.js');


// Create and Save a new Album
exports.create = (req, res) => {

 // Validate request
    if(!req.body.title || !req.body.release ) {
        return res.status(400).send({
            message: "Album title and release can not be empty"
        });
    }

    // Create an Album
    const album = new Album({
        title:req.body.title,
        release:req.body.release,
        genre:req.body.genre,
        cover_url:req.body.cover_url,
        artist_id:req.body.artist_id
    });

    // Save Album in the database
    album.save()
    .then(data => {
        Artist.addAlbum({body:{album_id:data._id,artistId:req.body.artist_id}}, res);
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Album."
        });
    });
};

// Retrieve and return all albums from the database.
exports.findAll = (req, res) => {
    Album.find().populate('tracks artist_id')
    .then(album => {
        res.send(album);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving albums."
        });
    });
};

// Find a single Album with a albumId
exports.findOne = (req, res) => {
  Album.findById(req.params.albumId).populate('artist_id tracks')
    .then(album => {
      if (!album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      res.status(200).json(album);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving album with id ' + req.params.albumId
      });
    });
};
/*
// Update an Album identified by the albumId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.title || !req.body.release ) {
        return res.status(400).send({
            message: "Album title and release can not be empty"
        });
    }

  // Find album and update it with the request body
  Album.findByIdAndUpdate(
    req.params.albumId,
    {
      title:req.body.title,
      release:req.body.release,
      genre:req.body.genre,
      cover_url:req.body.cover_url
    },
    { new: true }
  )
    .then(album => {
      if (!album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      res.send(album);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      return res.status(500).send({
        message: 'Error updating album with id ' + req.params.albumId
      });
    });
};

*/
// Delete an album with the specified albumId in the request
exports.delete = (req, res) => {
    Album.findByIdAndRemove(req.params.albumId)
    .then(album => {
        Artist.removeAlbum({params:{album_id:album._id,artistId:req.body.artist_id}}, res);
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



//add a track to the tracks array
exports.addTrack = (req, res) => {

Album.findOneAndUpdate(
      {_id: req.body.album_id},
      {$push:
            {tracks:req.body.track_id } 
      },{save:true})
    .then(album => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.album_id
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.album_id
        });
      }
      return res.status(500).send({
        message: 'Error updating artist with id ' + req.params.album_id
      });
    });
};


exports.removeTrack = (req, res) => {

Album.findOneAndUpdate(
      {_id: req.params.album_id},
      {$pull:
            {tracks:req.params.track_id } 
      },{save:true})
    .then(album => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.album_id
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.album_id
        });
      }
      return res.status(500).send({
        message: 'Error updating artist with id ' + req.params.album_id
      });
    });
};


//obtenir le nombre de like par album
exports.findLikesAlbum = (req, res) => {
Album.aggregate([
   {"$lookup":{
        "from":"tracks", // name of the foreign collection
        "localField":"_id",
        "foreignField":"album_id",
        "as":"lookup-data",
  }},
  {"$lookup":{
        "from":"artists", // name of the foreign collection
        "localField":"artist_id",
        "foreignField":"_id",
        "as":"lookup-data-artist"
  }},
  {"$addFields":{
    "likes":{
      "$sum":"$lookup-data.likes"
    }}},
    {"$addFields":{
      "artist":"$lookup-data-artist.nom"
    }}
  ,
  {"$project":{"lookup-data":0}}
]).then(album => {
        res.send(album);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving albums."
        });
    });
}


