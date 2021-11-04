const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement=require('mongoose-sequence')(mongoose);


const Ticket=new Schema({
    _id:Number,
    user_id:Number,
    tour_id:Number,
    message:String,
    used:{type:Boolean, default:false},
    count:Number,
    phone:String,
},{
    versionKey:false,
    _id:false,
    timestamps:true,
});
Ticket.plugin(autoIncrement,{
    id:'ticket',
    inc_field:'_id'
})
module.exports=mongoose.model('Ticket',Ticket);