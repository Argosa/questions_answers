'use strict';

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("db connection successful");

    const Schema = mongoose.Schema;

    const AnimalSchema = new Schema({
        type: {type: String, default: "goldfish"},
        size: {type: String, default: "small"},
        color: {type:  String, default: "golden"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Angela"}
    });

    const Animal = mongoose.model("Animal", AnimalSchema);

    const elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawrence"
    });

    var animal = new Animal({});

    var whale = new Animal({
        type: "whale",
        size: "big",
        mass: 190.500,
        name: "fig"
    });

    Animal.remove({}, (err) => {
        if (err) console.error("save failed", err);
        elephant.save((err)=> {
            if (err) console.error("save failed", err);
            animal.save((err)=> {
                if (err) console.error("save failed", err);
                whale.save((err) => {
                    if (err) console.error("save failed", err);
                    Animal.find({size: "big"}, (err, animals) => {
                        animals.forEach((animal) => {
                            console.log(animal.name + " the " + animal.color + " " + animal.type);
                        });
                        db.close(() => {
                            console.log("connection closed");
                        });
                    });
                })
            });
        });
    });

});
