const Model = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');

const schemaSignup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: true } }).required(),
    password: Joi.string().min(8).required(),
});

const schemaSignin = Joi.object({
    email: Joi.string().email({ tlds: { allow: true } }),
    password: Joi.string().min(8).required(),
});

class Controller {

    getAll(req, res, next) {
        Model.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        }).catch(err => res.status(400).send({ err }))
    }

    // Signup User
    async signup(req, res) {
        //validate data entry to new user
        const { error } = schemaSignup.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        //validate if the user is exist or not
        const emailExist = await Model.findOne({ email: req.body.email })
        if (emailExist) return res.status(400).send("the email is exists");
        //Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create a new user
        const User = new Model({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
        })
        await User.save().then(user => {res.json(user)});
    }
 

    // Signin User
    async signin(req, res) {
        const user = await Model.findOne({ email: req.body.email.toLowerCase() })
        //validate data entry to new user
        const { error } = schemaSignin.validate(req.body)
        if (error) return res.status(400).send({status:400, message: error.details[0].message})
        //Check if email is exsist
        if (!user) return res.status(400).send({status:400, message: 'the email or password is wrong' });
        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send({status:400, message: 'the email or password is wrong' })
        // if all information is true
        // Create a token and assign it to the user
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).status(200).send({message: 'success', token: token })
    }
}

const controller = new Controller();
module.exports = controller;