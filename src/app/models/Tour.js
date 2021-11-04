const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement=require('mongoose-sequence')(mongoose);
const slug=require('mongoose-slug-generator');

mongoose.plugin(slug);
const Tour=new Schema({
    _id:Number,
    name:String,
    destination:String,
    cost:Number,
    start:String,
    end:String,
    departure:String,
    dress:String,
    included:[String],
    notInclude:[String],
    sold:{type:Number,default:0},
    age:Number,
    plan:[{
        plan_title:String,
        plan_description:String,
        plan_include:[String],
        plan_notInclude:[String]
    }],
    category:[String],
    description:String,
    img:[String],
    order:{type:[Number]},
    slug:{type:String,slug:'city_name',unique:true}
},{
    versionKey:false,
    _id:false,
    timestamps:true,
}
);
Tour.plugin(autoIncrement,{
    id:'tour',
    inc_field:'_id'
});
module.exports=mongoose.model('Tour',Tour);