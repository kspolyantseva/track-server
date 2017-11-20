var User=require('../db/models/user').User;

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
      if(err) return res.status(400).send('user not found');
      req.session.regenerate(function(err) {
        if(!err){req.session.userName=user.name;
          req.session.UserId=user._id;
        }
        res.send({"login":!err});
      });
    });
  };
