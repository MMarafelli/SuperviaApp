import { useEffect } from 'react';
import type { FC } from 'react';
import NProgress from 'nprogress';
import './LoadingScreen.css';
import logo from '../../../public/assets/icons/favicon.png';

const LoadingScreen: FC = () => {
  useEffect(() => {
    NProgress.start();

    return (): void => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="divLoader">
        <img src={logo} className="logo" alt="logo"></img>
    </div>
  );
};

export default LoadingScreen;