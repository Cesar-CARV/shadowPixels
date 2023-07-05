import Logo from './Logo';
import HeaderNav from './HeaderNav';

function Header() {
    return (
        <header id="top" className='bg-zinc-950 sticky top-0 flex justify-between px-4 md:px-16 py-2 items-center'>
            <Logo />
            <HeaderNav />
        </header>
    )
}

export default Header;