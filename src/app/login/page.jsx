"use client";
import React from 'react'
import styles from './login.module.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/Loader';
export default function page() {
  const session = useSession()
  console.log(session)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    

    try {
      const email = data.email
      const password = data.password
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res.error) {
        toast.warn('Invalid credentials!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {

      console.log(error)
    }
  }
  if (session.status === "loading") {
    return <Loader />
  }
  else if (session.status === "authenticated") {
    router.push("/")
  }

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className={styles.heading}>Login page</h1>
      <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
        <div><label htmlFor="email">
          <AlternateEmailIcon />
        </label>
          <input id='email' type="texemailt" placeholder='Email' name='email' className={styles.input} {...register('email', { required: true })} />
        </div>

        <div><label htmlFor="password">
          <LockOpenIcon />
        </label>

          <input id='password' type="password" placeholder='Password' name='password' className={styles.input} {...register('password', { required: true, minLength: 8 })} /></div>

        <Link href="/signup" className={styles.shift}>Don't have an account?</Link>
        <input type="submit" name='submit' value={"Login"} className={styles.submit} />
        <span className={styles.or}>or</span>
        <input type="submit" name='submit' value={"Continue using Google"} onClick={() => signIn("google")} className={styles.googleBtn} />

      </form>
    </div>
  )
}
