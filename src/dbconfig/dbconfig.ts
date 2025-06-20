import mongoose from "mongoose";
export async function Connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on('connected',()=>{
        console.log("MongoDb Connected");
        
    })
    connection.on('error',(err)=>{
        console.log("MongoDb Connection Error");
        console.log(err);
        process.exit();
        
    })

  } catch (error) {
    console.log("Something went wrong in db connection");
    console.log(error);
    
  }
}
