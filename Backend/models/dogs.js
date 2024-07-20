const mongoose = require('mongoose')

const collectionName = 'dogs'
const dogsSchema = new mongoose.Schema(
    {

        chipId: {
            type: String, required: true, trim: true
        },

        name : {
            type : String, required: true, trim: true
        },

        age : {
            type : Number, required: true, trim: true
        },

        gender : {
            type: String, enum: ['male', 'female']
        },

        physical : {
            type: String, enum: ['small', 'medium', 'large']
        },

        arrivalDate : {
            type: Date, required: true, trim: true
        },

        sterilized : {
            type: String, enum: ['yes', 'no']
        },

        adopdedStatus : {
            type: String, enum: ['yes', 'no']
        },

    },
    { strict: false, autoCreate: true, timestamps: true }
)

module.exports = mongoose.model(collectionName, dogsSchema);