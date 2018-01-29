var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function factory(database){
  function throwErr(response,status,message){
    response.status(status);
    response.locals.title = status+" ¯\\_(ツ)_/¯";
    response.locals.message = message;
    response.render('error');
  }
  
  router.get('', function(request, response){
    var collection = database.collection('colors');
    
    if(!request.query.hasOwnProperty('id')){
      throwErr(response,400,"Oops. I guess that's an error. Please check your URL.");
    }
    try{
      var id = ObjectID(request.query.id);
    } catch(err) {
      throwErr(response,400,"Couldn't find this palette.")
    }
    
    collection.find({_id: id}).toArray(function (err,documents){
      if(documents.length == 0){
        throwErr(response,400,"Couldn't find this palette.");
      }
      if(documents.length > 1){
        throwErr(response,500,"Something really strange is going on here. Please check back later.");
      }
      documents[0].title = documents[0].name;
      response.render('details',documents[0]);
    });
  });
  return router;
}

module.exports = factory;