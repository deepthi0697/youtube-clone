import Link from 'next/link';
import { getVideos } from './firebase/functions';
import styles from './page.module.css'


export default async function Home() {
  const videos = await getVideos();

  return (
    <main>
      {
        videos.map((video) => (
          <Link href={`/watch?v=${video.filename}` } key={video.id}>
            {/* <Image src={'/thumbnail.png'} alt='video' width={120} height={80}
              className={styles.thumbnail}/> */}
          </Link>
        ))
      }
    </main>
  )
}


export const revalidate = 30; // every 30 sec, its gonna re-render page and cache and update the page with the new videos.