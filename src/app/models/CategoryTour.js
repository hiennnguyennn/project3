const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement=require('mongoose-sequence')(mongoose);

const Category=new Schema({
    _id:Number,
    name:String,
    tourId:{type:[Number],}
},{
    versionKey:false,
    _id:false,
    timestamps:true,
}
);
Category.plugin(autoIncrement,{
    id:'category',
    inc_field:'_id'
});
module.exports=mongoose.model('Category',Category);