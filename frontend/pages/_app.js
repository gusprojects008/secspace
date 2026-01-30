import {ThemeProvider} from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import ToggleTheme from '../components/ThemeToggle';
import '../styles/globals.css';

export default function App({Component, pageProps}) {
  return (
    <ThemeProvider>
      <Navbar/>
      <ToggleTheme/>
      <Component {...pageProps}/>
    </ThemeProvider>
  );
};
