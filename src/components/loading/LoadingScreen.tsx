import { useEffect } from 'react';
import type { FC } from 'react';
import NProgress from 'nprogress';
import './LoadingScreen.css';
import logo from '/assets/icons/favicon.png';

const LoadingScreen: FC = () => {
  useEffect(() => {
    NProgress.start();

    return (): void => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-content">
          {/* Logo com animação */}
          <div className="logo-container">
            <img src={logo} className="logo-loading" alt="SuperVia App" />
            <div className="logo-pulse"></div>
          </div>
          
          {/* Texto e informações */}
          <div className="loading-text">
            <h2 className="loading-title">SuperVia App</h2>
            <p className="loading-subtitle">Engenharia & Sinalização</p>
          </div>
          
          {/* Barra de progresso animada */}
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="loading-message">Carregando...</p>
          </div>
          
          {/* Spinner adicional */}
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
        
        {/* Efeito de fundo */}
        <div className="loading-background">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;