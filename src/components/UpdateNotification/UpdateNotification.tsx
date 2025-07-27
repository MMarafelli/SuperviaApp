import { useState, useEffect } from 'react';
import { usePWAUpdate } from '../../hooks/usePWAUpdate';
import { usePushNotifications } from '../../hooks/usePushNotifications';

const UpdateNotification: React.FC = () => {
  const { needRefresh, updateServiceWorker, isOnline } = usePWAUpdate();
  const { requestPermission, sendUpdateNotification, permission } = usePushNotifications();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Solicita permissão para notificações quando o componente monta
  useEffect(() => {
    if (permission === 'default') {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    // Envia notificação de que a atualização foi aplicada
    try {
      await sendUpdateNotification();
    } catch (error) {
      console.log('Erro ao enviar notificação:', error);
    }
    
    updateServiceWorker();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  // Não mostra se foi dispensado, se não precisa de refresh ou se está offline
  if (isDismissed || !needRefresh || !isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg border border-blue-500">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg 
              className="w-6 h-6 text-blue-200" 
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
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium">
              Nova versão disponível!
            </h4>
            <p className="text-sm text-blue-100 mt-1">
              Uma nova versão da aplicação está disponível. Atualize para obter as últimas melhorias.
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="flex-1 bg-white text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? 'Atualizando...' : 'Atualizar agora'}
          </button>
          <button
            onClick={handleDismiss}
            className="px-3 py-2 text-blue-200 hover:text-white text-sm font-medium"
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
