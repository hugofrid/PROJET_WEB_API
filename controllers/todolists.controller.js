const todolists = require('../models/todolists.model.js');


//var ObjectID = require('mongodb').ObjectID,
  //test = require('assert');
// Get a timestamp in seconds





exports.findAll = (req, res) => {
    todolists.find()
    .then(todos => {
        res.status(200).json(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.deleteList = (req, res) => {
    todolists.findByIdAndRemove(req.params.listId)
    .then(todolist => {
        if(!todolist) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.listId
            });
        }
        res.send({message: "list deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
}



exports.createList = (req, res) => {

 // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a todolist
    const todos = new todolists({
        title: req.body.title || "Untitled Note",
        
    });

    // Save todolist in the todolists database
    todos.save()
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.addTodo = (req, res) => {

	 if(!req.body.todo) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    var timestamp = Math.floor(new Date().getTime()/1000);

    
      // Create a todolist
    const todo = {
      
        todo:req.body.todo,
        checked:0
    };

    todolists.findOneAndUpdate(
    	{_id: req.params.listId},
    	{$push:{
    		list:todo
    		}
    	},{save:true})
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.deleteTodo = (req, res) => {
     todolists.findByIdAndUpdate(
        {_id:req.params.listId},
        {$pull:
            {list:{_id:req.params.todoId}}})
    .then(todolist => {
        if(!todolist) {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoTitle
            });
        }
        res.status(200).send({message: "todo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoTitle
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.todoTitle
        });
    });

}





exports.toggleTodo = (req,res) => {

    todolists.updateOne(
    {   _id:req.params.listId,
       "list._id":req.params.todoId },
    {
        $inc: {"list.$.checked":1}
    }
       
     )
     .then(todolist => {
        if(!todolist) {
            return res.status(404).send({
                message: "todo not found with id " + req.params.listId + " / " + req.params.todoId
            });
        }
        res.send({message: "todo toggle successfully!" + todolist});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId 
            });                
        }
        return res.status(500).send({
            message: "Could not toggle todo with id " + req.params.todoId 
        });
    });
}


