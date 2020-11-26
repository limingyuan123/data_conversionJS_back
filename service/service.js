const datamap = require('../model/datamap');
const refactor = require('../model/refactor');
const formidable = require('formidable');
// const { ObjectId } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

var DataMap = datamap.dataMap;
var Refactor = refactor.refactor;

exports.getServiceData = function (req, res, next) {
    var form = formidable.IncomingForm();
    // var id = req.url.split('=')[1];
    // form.parse(req, function(err,fields,file){
    id = req.query.oid;
    console.log(req.query.oid + " " + req.query.type);

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        console.log("yes");
    }
    var type = req.query.type;
    var collection;
    if (type === "map") {
        collection = DataMap;
    } else if(type === 'refactor'){
        collection = Refactor;
    }
    collection.findById(id, (err, doc) => {
        if (err) {
            res.send({
                code: -1,
                message: err
            });
            return;
        };

        if (!doc) {
            res.send({
                code: -1,
                message: 'doc is null'
            })
            return;
        } else {
            res.send({
                code: 0,
                message: {
                    name: doc.name,
                }
            })
        }

    })
}