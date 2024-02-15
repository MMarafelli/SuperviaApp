import "./Header.css"
import logo from '../../../public/assets/icons/logo-sv.png';

const Header = () => {
    return (
        <div className="header">
            <div className="divLogoHeader">
                <img src={logo} className="logo" alt="logo"></img>
            </div>
            <div className="divFillerHeader"></div>
            <nav>
                <p>Engenharia e sinalização</p>
            </nav>
        </div>
    )
}

export default Header;