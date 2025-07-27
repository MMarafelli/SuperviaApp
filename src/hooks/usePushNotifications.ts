import { useState, useEffect } from 'react';

interface PushNotificationsHook {
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<boolean>;
  sendUpdateNotification: () => Promise<void>;
}

export const usePushNotifications = (): PushNotificationsHook => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verifica se as notificações são suportadas
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão para notificações:', error);
      return false;
    }
  };

  const sendUpdateNotification = async (): Promise<void> => {
    if (!isSupported || permission !== 'granted') {
      console.log('Notificações não suportadas ou sem permissão');
      return;
    }

    try {
      // Verifica se há um service worker registrado
      const registration = await navigator.serviceWorker.ready;
      
      // Envia uma notificação local através do service worker
      const notificationData = {
        title: 'SuperVia App Atualizado! 🚀',
        body: 'Uma nova versão do app foi instalada com melhorias e correções.',
        icon: '/SuperviaApp/assets/icons/sv_192x192.png',
        badge: '/SuperviaApp/assets/icons/sv_48x48.png',
        timestamp: Date.now(),
        requireInteraction: true
      };

      // Usa o service worker para mostrar a notificação
      await registration.showNotification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        requireInteraction: true,
        data: notificationData
      });

      console.log('Notificação de atualização enviada');
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  return {
    isSupported,
    permission,
    requestPermission,
    sendUpdateNotification
  };
};
