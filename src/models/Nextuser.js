import mongoose from "mongoose";
const { Schema } = mongoose;

const NextuserSchema = new Schema({
  username:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    unique:true,
    require:true,
  },
  password:{
    type:String,
    require:true,
  },
},
{timestamps:true}
);
export default mongoose.models.Nextuser || mongoose.model("Nextuser",NextuserSchema)