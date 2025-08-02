import { useState, useEffect } from 'react';
import { usePWAUpdate } from '../../hooks/usePWAUpdate';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import './UpdateNotification.css';

const UpdateNotification: React.FC = () => {
  const { needRefresh, updateServiceWorker, isOnline } = usePWAUpdate();
  const { requestPermission, sendUpdateNotification, permission } = usePushNotifications();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasShownUpdateToday, setHasShownUpdateToday] = useState(false);
  const [isUpdateInProgress, setIsUpdateInProgress] = useState(false);

  // Verifica se já foi mostrada uma atualização hoje ou se há atualização em progresso
  useEffect(() => {
    const today = new Date().toDateString();
    const lastUpdateShown = localStorage.getItem('last-update-notification');
    const lastUpdateExecuted = localStorage.getItem('sw-update-executed');
    
    if (lastUpdateShown === today) {
      setHasShownUpdateToday(true);
    }
    
    // Se uma atualização foi executada nos últimos 2 minutos, não mostra
    if (lastUpdateExecuted) {
      const timeSinceUpdate = Date.now() - parseInt(lastUpdateExecuted);
      if (timeSinceUpdate < 120000) { // 2 minutos
        setIsUpdateInProgress(true);
      }
    }
  }, [needRefresh]); // Reexecuta quando needRefresh muda

  // Solicita permissão para notificações quando o componente monta
  useEffect(() => {
    if (permission === 'default') {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setIsDismissed(true); // Imediatamente esconde a notificação
    
    // Marca que uma atualização foi iniciada hoje e agora
    const today = new Date().toDateString();
    const now = Date.now().toString();
    localStorage.setItem('last-update-notification', today);
    localStorage.setItem('sw-update-executed', now);
    
    try {
      // Envia notificação de que a atualização está sendo aplicada
      try {
        await sendUpdateNotification();
      } catch (error) {
        console.log('Erro ao enviar notificação:', error);
      }
      
      // Aguarda um pouco para mostrar o estado "Atualizando..."
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Executa a atualização do service worker
      await updateServiceWorker();
    } catch (error) {
      console.error('Erro durante a atualização:', error);
      setIsUpdating(false);
      setIsDismissed(false); // Se houver erro, permite mostrar novamente
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Marca que foi dispensada hoje
    const today = new Date().toDateString();
    localStorage.setItem('last-update-notification', today);
  };

  // Não mostra se foi dispensado, se não precisa de refresh, se está offline, se já foi mostrada hoje, ou se há atualização em progresso
  if (isDismissed || !needRefresh || !isOnline || hasShownUpdateToday || isUpdateInProgress) {
    return null;
  }

  return (
    <div className="update-notification-container">
      <div className="update-notification-card">
        <div className="update-notification-header">
          <div className="update-icon-container">
            <svg 
              className="update-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
          </div>
          <div className="update-content">
            <h4 className="update-title">
              Nova versão disponível!
            </h4>
            <p className="update-description">
              Uma nova versão da aplicação está disponível. Atualize para obter as últimas melhorias.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="update-close-btn"
            aria-label="Fechar notificação"
          >
            <svg 
              className="close-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        
        <div className="update-actions">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`update-btn-primary ${isUpdating ? 'updating' : ''}`}
          >
            {isUpdating ? (
              <>
                <div className="loading-spinner"></div>
                Atualizando...
              </>
            ) : (
              'Atualizar agora'
            )}
          </button>
          <button
            onClick={handleDismiss}
            className="update-btn-secondary"
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
