import { useState, useEffect } from 'react';

interface UpdateNotificationProps {
  onUpdate?: () => void;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({ onUpdate }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setShowNotification(true);
    };

    // Escutar evento personalizado de atualização
    window.addEventListener('updateAvailable', handleUpdateAvailable);
    
    // Verificar se service worker está registrado e há atualização
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setShowNotification(true);
      });
    }

    return () => {
      window.removeEventListener('updateAvailable', handleUpdateAvailable);
    };
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    try {
      // Notificar o service worker para pular a espera
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      }
      
      // Aguardar um pouco antes de recarregar
      setTimeout(() => {
        onUpdate?.();
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setIsUpdating(false);
    }
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-slide-in">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold flex items-center">
          🔄 Atualização Disponível
        </h4>
        <button
          onClick={handleDismiss}
          className="text-white hover:text-gray-200 text-lg leading-none"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
      <p className="text-sm mb-3">
        Uma nova versão do app está disponível. Deseja atualizar agora?
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Atualizando...' : 'Atualizar'}
        </button>
        <button
          onClick={handleDismiss}
          disabled={isUpdating}
          className="border border-white text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          Depois
        </button>
      </div>
    </div>
  );
};

export default UpdateNotification;
