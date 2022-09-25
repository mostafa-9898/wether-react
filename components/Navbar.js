// Style
import Style from '../styles/navbar.module.scss'

// from next
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={Style.navbar}>
            <Link href='/'>
                <a>
                    <Image src='/cloudy-day.svg' width='60' height='60' alt='image' />
                    <h1>Weather App</h1>
                </a>
            </Link>
        </nav>
    );
}

export default Navbar;