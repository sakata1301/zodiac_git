const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * role:1 La Admin toan quyen xu li
 * role:2 La Manager chi duoc them sua du lieu,khong co quyen xoa
 */


const user = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 1,
            required: true
        }


    },
    {
        timestamps: true,
    },
    {
        collection: 'user'
    }
);
module.exports = mongoose.model('user', user);
