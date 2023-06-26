import HeaderNav from "./HeaderNav";

function Footer() {
    return (
        <footer className='bg-gray-900 flex flex-col justify-between px-4 md:px-16 py-8 gap-4 items-center'>
            <HeaderNav/>
            <p>Created by Cesar Agustin Ruiz Vera </p>
        </footer>
    )
}

export default Footer;