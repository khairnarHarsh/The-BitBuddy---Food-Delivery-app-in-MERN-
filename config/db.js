import mongoose from  'mongoose';

export const connectDB= async()=>{
    await mongoose.connect(process.env.MY_DB).then(()=>{
        console.log('db connected');
    })

}
