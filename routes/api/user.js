const router = require("express").Router();
const express = require("express");
const userController = require("../../controllers/userController");
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/config');
require('../../config/passport')(passport);
var jwt = require('jsonwebtoken');
var user = require("../../models/user");
var sessionStorage = require('web-storage')().sessionStorage;
var nodemailer = require('nodemailer');
var emailsend = "";

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'youbrewapp@gmail.com',
                    pass: 'ayiwotgxnabaldbf'
                }
            });

router.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password || !req.body.email || !req.body.name) {
        res.status(401).send('Need name, email, and password');
    } else {
            emailsend = req.body.email;
        var newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
        });
                    var mailOptions = {
                from: 'youbrewapp@gmail.com',
                to: emailsend,
                subject: 'You Brew!',
                html: '<img style="width:200px;height:200px;" src="cid:YouBrewLogoMin.png"/><br/><br/><h3>Hello '+req.body.name+', You are now registered with You Brew.  Contact your administrator for your password</h3> <h4>Log in <a href=https://youbrew.herokuapp.com/>HERE</a></h4><h6>This email was generated automatically, please do not reply.',
                attachments: [{
                filename: 'YouBrewLogoMin.png',
                path: '../../dasboot/youbrew/client/public/assets/images/YouBrewLogoMin.png',
                cid: 'YouBrewLogoMin.png' //same cid value as in the html img src
    }]
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.status(401).send('Username Already Exists');
            }


            return res.status(200).send('User created');

        });
    }
});

router.post('/signin', function(req, res) {
    user.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send('Authentication failed. User not found.');
        } else {
            var admin = user.isAdmin;
            // check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var expires = Math.floor(Date.now() / 1000) + (60 * 60);
                    // if user is found and password is right create a token
                    var token = jwt.sign({
                        expires: expires,
                        data: user
                    }, config.secret);
                    // return the information including token as JSON
                    // res.json({success: true, token: 'Bearer ' + token});
                    res.json({
                        token: 'Bearer ' + token,
                        expires: expires,
                        user: user.toJSON()
                    });

                } else {
                    res.status(401).send('Authentication failed. Wrong password.');
                }
            });
        }
    });
});

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

router.route("/")
    .get(userController.findAll);

module.exports = router;