import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
import Nextuser from "@/models/Nextuser";
import bcrypt from "bcrypt";
export const POST = async (req, res) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const data  = await req.json();
  
  const hash=await bcrypt.hash(data.password,saltRounds);
  try {
    await connect();
    const user = await Nextuser({
      username: data.username,
      email: data.email,
      password: hash,
    });
    await user.save();
    return new NextResponse("hello", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
