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
                    <Link to={`${import.meta.env.BASE_URL}Dashboard`} className="nav-link">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="space-station-moon-alt"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x"
                        >
                            <g className="fa-group">
                                <path
                                    fill="currentColor"
                                    d="M501.70312,224H448V160H368V96h48V66.67383A246.86934,246.86934,0,0,0,256,8C119.03125,8,8,119.0332,8,256a250.017,250.017,0,0,0,1.72656,28.26562C81.19531,306.76953,165.47656,320,256,320s174.80469-13.23047,246.27344-35.73438A250.017,250.017,0,0,0,504,256,248.44936,248.44936,0,0,0,501.70312,224ZM192,240a80,80,0,1,1,80-80A80.00021,80.00021,0,0,1,192,240ZM384,343.13867A940.33806,940.33806,0,0,1,256,352c-87.34375,0-168.71094-11.46094-239.28906-31.73633C45.05859,426.01953,141.29688,504,256,504a247.45808,247.45808,0,0,0,192-91.0918V384H384Z"
                                    className="fa-secondary"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M256,320c-90.52344,0-174.80469-13.23047-246.27344-35.73438a246.11376,246.11376,0,0,0,6.98438,35.998C87.28906,340.53906,168.65625,352,256,352s168.71094-11.46094,239.28906-31.73633a246.11376,246.11376,0,0,0,6.98438-35.998C430.80469,306.76953,346.52344,320,256,320Zm-64-80a80,80,0,1,0-80-80A80.00021,80.00021,0,0,0,192,240Zm0-104a24,24,0,1,1-24,24A23.99993,23.99993,0,0,1,192,136Z"
                                    className="fa-primary"
                                ></path>
                            </g>
                        </svg>
                        <span className="link-text">Space</span>
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

            </ul>
        </nav>
    )
}

export default NavBar;