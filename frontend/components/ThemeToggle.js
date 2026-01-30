import Image from 'next/image';
import {useTheme} from '../context/ThemeContext';
import styles from '../styles/ToggleTheme.module.css';

export default function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  return (
    <button className={`${styles.toggle_theme} icons`} onClick={toggleTheme}>
      <Image src={theme === 'dark' ? '/icons/sun.png' : '/icons/moon.png'} alt='Toggle Theme' priority width='50' height='50'/>
    </button>
  );
};

