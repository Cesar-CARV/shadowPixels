function HeaderNav() {
    return (
        <nav>
            <ul className="flex items-center gap-4">
                <li>
                    <a
                        href="https://github.com/Cesar-CARV"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className='bx bxl-github'></i> <span className="hidden md:inline-block">Github</span>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/cesar-agustin-ruiz-vera-edt/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className='bx bxl-linkedin-square' ></i> <span className="hidden md:inline-block">Linkedin</span>
                    </a>
                </li>
                <li>
                    <a
                         href="mailto:cesaruizvera@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className='bx bxl-gmail' ></i> <span className="hidden md:inline-block">Gmail</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default HeaderNav;