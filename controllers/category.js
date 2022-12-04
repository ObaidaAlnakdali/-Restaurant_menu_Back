const Model = require('../model/category');
const Joi = require('@hapi/joi');

class Controller {

    // get all categories
    getAll(req, res, next) {
        Model.aggregate(
            [{
                $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "category",
                    as: "items",
                },
            }],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get all category successfully",
                    response,
                })
            });
    }
 
    // getAll(req, res, next) {
    //     Model.find({}, (err, response) => {
    //         if (err) return next(err);
    //         res.status(200).send({ success: true, response });
    //     }).catch(err => res.status(400).send({ err }))
    // }
    // getAll(req, res, next) {
    //     Model.find().then(response => res.status(200).json(response))
    //         .catch(error => { res.status(400).send(error) })
    // }


    // get one category
    getbyID(req, res, next) {
        Model.findById(req.params.id ,(err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    // add category
    post(req, res, next) {
        let body = req.body;
        let doc = new Model(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    // Update category
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

    //delete a category
    delete(req, res, next) {
        Model.findOneAndDelete({ _id: req.params.id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
}

const controller = new Controller();
module.exports = controller;