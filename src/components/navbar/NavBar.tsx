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
                    <Link to={`${import.meta.env.BASE_URL}/`} className="nav-link">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#FFCC29" stroke-width="1.5" stroke-linecap="round">
                            </path>
                            <path d="M15 18H9" stroke="#FFCC29" stroke-width="1.5" stroke-linecap="round">
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
                    <a href="#" className="nav-link">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="space-shuttle"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="svg-inline--fa fa-space-shuttle fa-w-20 fa-5x"
                        >
                            <g className="fa-group">
                                <path
                                    fill="currentColor"
                                    d="M32 416c0 35.35 21.49 64 48 64h16V352H32zm154.54-232h280.13L376 168C243 140.59 222.45 51.22 128 34.65V160h18.34a45.62 45.62 0 0 1 40.2 24zM32 96v64h64V32H80c-26.51 0-48 28.65-48 64zm114.34 256H128v125.35C222.45 460.78 243 371.41 376 344l90.67-16H186.54a45.62 45.62 0 0 1-40.2 24z"
                                    className="fa-secondary"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M592.6 208.24C559.73 192.84 515.78 184 472 184H186.54a45.62 45.62 0 0 0-40.2-24H32c-23.2 0-32 10-32 24v144c0 14 8.82 24 32 24h114.34a45.62 45.62 0 0 0 40.2-24H472c43.78 0 87.73-8.84 120.6-24.24C622.28 289.84 640 272 640 256s-17.72-33.84-47.4-47.76zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.91 0 31.94 80 0 80z"
                                    className="fa-primary"
                                ></path>
                            </g>
                        </svg>
                        <span className="link-text">Shuttle</span>
                    </a>
                </li>

            </ul>
        </nav>
    )
}

export default NavBar;