var express = require('express');
var router = express.Router();


router.get("/", function (request, response) {
  var collection = database.collection('colors');
  var renderObj = {array:[]};
  collection.find({}).toArray((err,documents) => {
    for(var obj of documents){
      renderObj.array.push(obj);
    }
    renderObj.title = "Color Palettes";
    response.render('colors',renderObj);
  });
}); 


module.exports = router;