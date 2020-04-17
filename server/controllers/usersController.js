const mongoose = require("mongoose");
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/config')
const passport = require('passport');

const getHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    //this needs error handling
}

// Creating new user
exports.create = async(req, res, next) => {
    let errString = "";

    let check = await User.findOne({email:req.body.email});
    if(check){
        errString = "Email already exists";
    } 
    check = null;

    check = await User.findOne({username: req.body.username});
    if(check){
        errString += "    Username already exists";
    } 

    const newUser = req.body;
   
    newUser.password = await getHash(newUser.password);
    
    // Saving new user to the database
    await newUser.save(function(err){
        if(err){
            //console.log(err);
            res.status(200).send(errString);
        }
        else{
            res.status(200).send("Success");
        }
    });

};

exports.remove  = async(req, res) =>{

    let user = req.body;

    User.findOneAndRemove({user, function(err, user) {
        if(err){
            res.status(200).send('error: User could not be removed.')
        }        
        else{
            res.send(user);
        }
    }})
}

exports.login = async (req, res) =>{

    let userExists = false;
    
//passport.authenticate('jwt', async function(err,user,info){

    /*if(err){
        throw err;
    }
    else if(info != undefined){
        user.password = undefined;
        user.salt = undefined;
    }*/

    await User.findOne({username: req.body.username}).then(user =>{

        if(!user) {

            res.status(200).send("Username not found!");
        }
        else{

            userExists = true;
            
            bcrypt.compare(req.body.password, user.password, function(err, isMatch){
                    
                if(err){
                    throw err;
                }
                    
                if (isMatch){
    
                    const payload = {
                        id: user.username,
                        name: user.name
                    };
    
                    jwt.sign(
                        payload,
                        keys.secretOrKey,{
                            expiresIn: 360000
                        },
    
                        (err, token) =>{
                            if(err){
                                throw err;
                            }
                            else{
                                res.status(200).send({
                                    auth: true,
                                    token: token,
                                    message: "User logged in!"
                                });
    
                                res.status(200).send("Success");
    
                            }                                
                        }
                    );
    
                }
                else{
                    return res.status(200).json("Wrong Password.");
                }

            })
        }
    })
};