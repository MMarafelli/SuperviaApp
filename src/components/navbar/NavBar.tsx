import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {

    function toggleTheme() {
        console.log('clicou');
    }

    const botao = document.getElementById('themeButton');
    if (botao !== null) {
        botao.onclick = toggleTheme;
    }

    return (
        <nav className="navbar dark">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={`${import.meta.env.BASE_URL}`} className="nav-link">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                stroke="#FFCC29" strokeWidth="1.5" strokeLinecap="round">
                            </path>
                            <path d="M15 18H9" stroke="#FFCC29" strokeWidth="1.5" strokeLinecap="round">
                            </path>
                        </svg>
                        <span className="link-text">Home</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={`${import.meta.env.BASE_URL}CalcTintaEsfera`} className="nav-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 500 500">
                            <g>
                                <polygon fill="currentColor" className="fa-primary" points="412.061,152.986 373.039,152.986 447.993,359.014 512,359.014 "></polygon>
                                <polygon fill="currentColor" className="fa-primary" points="99.939,152.986 0,359.014 64.006,359.014 138.961,152.986 "></polygon>
                                <path fill="currentColor" className="fa-primary" d="M265.767,152.986l0.367,12.226H245.86l0.373-12.226h-77.996l-56.201,206.027h127.943l0.911-29.861h30.222 l0.906,29.861h128.019l-56.231-206.027H265.767z M245.15,188.742h21.7l0.823,27.121h-23.346L245.15,188.742z M242.238,284.627 l1.13-37.223h25.263l1.13,37.223H242.238z"></path>
                            </g>
                        </svg>
                        <span className="link-text">Pintura automática</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={`${import.meta.env.BASE_URL}CalcConsumo`} className="nav-link">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M5 9H19M15 18V15M9 18H9.01M12 18H12.01M12 15H12.01M9 15H9.01M15 12H15.01M12 12H12.01M9 12H9.01M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.07989 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z"
                                    stroke="#FFCC29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Cálculos</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={`${import.meta.env.BASE_URL}about`} className="nav-link">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                                    stroke="#FFCC29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Sobre</span>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}

export default NavBar;
