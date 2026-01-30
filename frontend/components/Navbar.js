import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link href="/" className={router.pathname === "/" ? styles.active : ""}>Home</Link>
        <Link href="/login" className={router.pathname === "/login" ? styles.active : ""}>Login</Link>
        <Link href="/forum" className={router.pathname === "/forum" ? styles.active : ""}>forum</Link>
      </div>
    </nav>
  );
};
