const mongoose = require("mongoose");
const { Schema } = mongoose;
const skillShema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter your name!"],
        trim: true,
    },
    manger_skills: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
    },
    category_skill: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
}, {
    timestamps: true,
});

const skillModel = mongoose.model("Skills", skillShema);

module.exports = skillModel;