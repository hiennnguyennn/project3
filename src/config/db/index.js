const mongoose=require('mongoose');
async function connect(){
    try{
        await mongoose.connect(process.env.db,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('connect sc');
    }
    catch(err){
        console.log('connect f '+err)
    }
};
module.exports={connect};