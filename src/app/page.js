"use client";
import Loader from "@/components/Loader";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
 
  const router = useRouter();
  const session = useSession();
  console.log(session);
  if (session.status === "loading") {
    return <Loader/>
  } 
  return (
    <div>
      <h1>Welcome!</h1>
     {session.status==="authenticated"? <button
        className="logutBtn"
        onClick={(e) => {
          e.preventDefault();
          signOut();
          router.push("/login");
        }}
      >
        Logout
      </button>: <button
        className="logutBtn"
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </button>}
    </div>
  );
}
