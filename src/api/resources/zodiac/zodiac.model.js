const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate');
const Schema = mongoose.Schema;

const zodiac = new Schema(
    {
        name: { type: String, required: true },
        dayBegin:{type:String,require:[true,'must have Day Begin']},
        dayEnd:{type:String,require:[true,'must have Day End']},
        imgURL:{type:String,require:[true,'must have image URL']},
        description:{type:String},
        createBy:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        updateBy:{
            type:Schema.Types.ObjectId,
            ref:'user'
        }

    },
    {
        timestamps: true,
    },
    {
        collection: 'zodiac'
    }
);

zodiac.plugin(mongoosePaginate);
module.exports = mongoose.model('zodiac', zodiac);
