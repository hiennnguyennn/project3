const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement=require('mongoose-sequence')(mongoose);
const slug=require('mongoose-slug-generator');

mongoose.plugin(slug)
const Person=new Schema({
    _id:Number,
    name:String,
    dob:Date,
    email:String,
    part:String,
    pass:{type:String,minLength:6},
    avatar:String,
    order:[Number],
    slug:{type:String, slug:'name',unique:true},
},{
    versionKey:false,
    _id:false,
    timestamps:true,
});
Person.plugin(autoIncrement,{
    id:'user',
    inc_field:'_id'
})
module.exports=mongoose.model('Person',Person);