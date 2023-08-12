import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import Nextuser from "@/models/Nextuser";
import bcrypt from 'bcrypt'
 const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: "71751331676-h1s9s6efn47e7ujl504gi0eg096ghcrc.apps.googleusercontent.com",
        clientSecret: "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",
    }),
    CredentialsProvider({
      id:"credentials",
      name:"Credentials",
      async authorize(credentials){
        await connect();
        try {
          const user=await Nextuser.findOne({email:credentials.email})
          if (user) {
            const isPassCorrect=bcrypt.compare(credentials.password,user.password);
            if(isPassCorrect){
                return user;
            }else{
              throw new Error("Incroccet password")  
            }
          }else{
            throw new Error("user not found")
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
    
  ],
  pages:{
    error:"/login"

  }
  
} )
export {handler as GET, handler as POST};