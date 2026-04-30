'use client';

import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import SignIn from './sign-in'
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from '../firebase/firebase';
import { User } from "firebase/auth";
import Upload from './upload';



export default function Navbar(){
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedHelper((user)=>{
            setUser(user)
        })
        return () => unsubscribe()
    })

    return(
        <nav className={styles.nav}>
        <div className="flex items-center gap-2 cursor-pointer">
            <Image 
            width={32} 
            height={32} 
            src="/youtube.png" 
            alt="youtube-logo" 
            />
            {/* <span className="text-xl font-semibold tracking-tight">
            Navbar Page
            </span> */}
        </div>
        <Link href='/' >
        

        </Link>
        {
            user && <Upload />
        }
        <SignIn user={user}/>
        </nav>
    )
}