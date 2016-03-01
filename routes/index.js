var express = require('express');
var router = express.Router();



// function pollItemsFun(pollItem) {
//     return pollItem;
// }

// router.use(function(req,res,next){

   
//                  next();
//             // });

        
// // });


    
// });





router.get('/', function(req, res) {
    // res.json(pollData);
    // res.send('effe');
    res.render('index');
});


module.exports = router;