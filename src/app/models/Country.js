const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement=require('mongoose-sequence')(mongoose);
const slug=require('mongoose-slug-generator');

mongoose.plugin(slug)
const Country=new Schema({
    _id:Number,
    name:String,
    nickname:String,
    language:String,
    visa:String,
    currency:String,
    area:Number,
    intro:String,
    des:String,
    img:[String],
    slug:{type:String, slug:'name',unique:true},
},{
    versionKey:false,
    _id:false,
    timestamps:true,
});
Country.plugin(autoIncrement,{
    id:'country',
    inc_field:'_id'
})
module.exports=mongoose.model('Country',Country);