const Model = require('../model/item');
const Joi = require('@hapi/joi');
const fs = require('fs');
const image_path = './public/images/'

class Controller {

    // get all items
    // getAll(req, res, next) {
    //     Model.find((err, response) => {
    //         if (err) return next(err);
    //         res.status(200).send({ success: true, response });
    //     }).catch(err => res.status(400).send({ err }))
    // }

    getAll(req, res, next) {
        Model.find().then(response => res.status(200).json(response))
            .catch(error => { res.status(400).send(error) })
    }

    // add item
    post(req, res, next) {
        let body = req.body;
        let doc = new Model(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    // Update item
    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Model.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    //delete a item
    delete(req, res, next) {
        console.log(JSON.stringify(req.body.name))
        Model.findOneAndDelete({ _id: req.params.id }, (err, response) => {
            if (err) return next(err);
            //let name = req.body.name
            if(req.body.length > 0 && req.body.name !== "" || undefined || null){
              fs.unlinkSync(image_path + name)
            }
            res.status(200).send({ success: true, response });
        })
    }

}
const controller = new Controller();
module.exports = controller;