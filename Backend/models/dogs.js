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
            type : Number, required: true
        },

        gender : {
            type: String, enum: ['male', 'female'], required: true
        },

        physical : {
            type: String, enum: ['small', 'medium', 'large'], required: true
        },

        arrivalDate : {
            type: Date, required: true
        },

        sterilized : {
            type: String, enum: ['yes', 'no'], required: true
        },

        adopdedStatus : {
            type: String, enum: ['yes', 'no'], required: true
        },

    },
    {
        autoCreate: true,
        timestamps: true
    }
)

module.exports = mongoose.model(collectionName, dogsSchema);