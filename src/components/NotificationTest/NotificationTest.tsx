import { usePushNotifications } from '../../hooks/usePushNotifications';

const NotificationTest: React.FC = () => {
  const { isSupported, permission, requestPermission, sendUpdateNotification } = usePushNotifications();

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      console.log('Permissão concedida para notificações');
    }
  };

  const handleTestNotification = async () => {
    await sendUpdateNotification();
  };

  if (!isSupported) {
    return <div>Notificações não suportadas neste navegador</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Teste de Notificações</h3>
      <p className="mb-2">Status da permissão: <strong>{permission}</strong></p>
      
      <div className="space-y-2">
        {permission === 'default' && (
          <button 
            onClick={handleRequestPermission}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Solicitar Permissão
          </button>
        )}
        
        {permission === 'granted' && (
          <button 
            onClick={handleTestNotification}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Testar Notificação de Atualização
          </button>
        )}
        
        {permission === 'denied' && (
          <p className="text-red-600">
            Permissão negada. Habilite as notificações nas configurações do navegador.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationTest;
