import "./Header.css"
import logo from '/assets/icons/logo-sv.png';

const Header = () => {
    return (
        <header className="modern-header">
            <div className="header-container">
                <div className="logo-section">
                    <div className="brand-info">
                        <img src={logo} className="logo-main" alt="Logo da Super Via" title="Logo da Super Via" />
                        <span className="brand-tagline">Engenharia & Sinalização</span>
                    </div>
                </div>
                
                <div className="header-actions">
                    <div className="user-info">
                        <div className="user-avatar">
                            <span>👤</span>
                        </div>
                        <div className="user-details">
                            <span className="user-role">Operador</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;