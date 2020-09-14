const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('../models/User.model');

module.exports = {
    register(req, res) {
        User.create(req.body)
        .then(newUser => {
            const token = jwt.sign({
                id: newUser._id,
                email: newUser.email
            }, process.env.SECRET_KEY);

            // console.log(token)
            res.cookie('token', token, {
                httpOnly: true
            })
            .json({status: 'success'})
        })
        .catch(err => res.status(400).json(err));
    },

    async login(req, res){
        const {email, password} = req.body;
        const errorMessage = 'please check your email and password.';
        try {
            const user = await User.findOne({ email });

            if(user == null){
                throw new Error(errorMessage)
            }

            const result = await bcrypt.compare(password, user.password);

            if(result == false){
                throw new Error(errorMessage)
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, process.env.SECRET_KEY);

            // console.log(token)
            res.cookie('token', token, {
                httpOnly: true
            });

            res.json({ status: 'Success', token, name: user.firstName })

        } catch(e) {
            res.status(400).json({message: errorMessage });
        }
        // find user by email
        // confirm the password is a match
        // somehow store some information about the user
    },
    logout(req, res){
        res.clearCookie('token');
        res.json({status: 'Success'})
    }
}