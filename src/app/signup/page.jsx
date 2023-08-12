"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './signup.module.css';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const router=useRouter()
    const onsubmit= async(data)=>{
        console.log(data)
        
       try {
        const res=await fetch("http://localhost:3000/api/auth/register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
    })
    if (res.status===200) {
        router.push("/")
    }
       } catch (error) {
        console.log(error)
       }
    }
   
  return (
    <div className={styles.container}>
      <ToastContainer/>
        <h1 className={styles.heading}>Signup page</h1>
      <form className={styles.form}  onSubmit={handleSubmit(onsubmit)}>
       <div><label htmlFor="username"> 
        <PersonIcon/>
       </label>
       <input id='username' type="text" placeholder='Username' name='username'className={styles.input} {...register('username', { required: true ,minLength:2})}/></div>
       
       <div><label htmlFor="email"> 
        <AlternateEmailIcon/>
       </label>
       <input id='email' type="email" placeholder='Email' name='email'className={styles.input} {...register('email', { required: true })}/></div>
       
       <div><label htmlFor="password"> 
        <LockOpenIcon/>
       </label>
       <input id='password' type="password" placeholder='Password' name='password'className={styles.input} {...register('password', { required: true , })}/></div>
      
       <Link href="/login"className={styles.shift}>Alredy have an account?</Link>
       <input type="submit" name='submit' value={"Registor"} className={styles.submit}/>
       
      </form>
    </div>
  )
}
