import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONSTR);
  } catch (error) {
    console.log("Connection failed!"+error);
  }
};

export default connect;