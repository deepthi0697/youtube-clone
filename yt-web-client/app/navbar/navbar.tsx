import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'

export default function Navbar(){
    return(
        <nav className={styles.nav}>
        <h1>Navbar Page</h1>
        <Link href='/' >
        <span>
                <Image width={90} height={90} src= '/youtube.png' alt='youtube-logo' />
                </span>

        </Link>
        </nav>
    )
}