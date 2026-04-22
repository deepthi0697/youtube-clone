'use client';

import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import SignIn from './sign-in'
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from '../firebase/firebase';
import { User } from "firebase/auth";



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
        <h1>Navbar Page</h1>
        <Link href='/' >
        <span>
                <Image width={90} height={90} src= '/youtube.png' alt='youtube-logo' />
                </span>

        </Link>
        <SignIn user={user}/>
        </nav>
    )
}