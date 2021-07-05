const trains = require("../model/train");
const userinfo = require("../model/userinfo")
const axios = require('axios');
const { Mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");


module.exports.trains_get = (req, res) => {
    trains.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).json({ message: "Trains not available" });
        })
}


module.exports.trains_getbyId = (req, res) => {
    const id = req.params.id;
    trains.findById(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).json({ message: "Trains not found" });
        })
}

module.exports.trains_post = async(req, res) => {
    // const Trains = new trains(req.body)

    trains.create(req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        })
}


module.exports.trains_update = (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    trains.findOneAndUpdate(id, updates)
        .then(() => {
            Flight.findById(id)
                .then((result) => {
                    res.status(200).send(result);
                })
        })
        .catch((err) => {
            res.status(400).json({ message: "Train not updated" });
        })

}


module.exports.trains_delete = (req, res) => {
    const id = req.params.id;
    trains.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send("Train deleted");
        })
        .catch((err) => {
            res.status(400).json({ message: "Train not deleted" });
        })

}




module.exports.UpdateTrainSeat = (req, res) => {

    trains.findByIdAndUpdate({ _id: req.params.id }, { $inc: { numOfticket: -req.body.numOfticket } })
        .then(
            data => {

                res.send("succ")
            }).catch(err => {
            res.send("error")

        })
}