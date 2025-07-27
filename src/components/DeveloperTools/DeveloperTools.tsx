import { useToast } from '../Toast/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';

const DeveloperTools: React.FC = () => {
  const { showToast } = useToast();
  const { toggleTheme, isDark } = useTheme();

  const handleTestToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const messages = {
      success: 'Operação realizada com sucesso!',
      error: 'Ocorreu um erro durante a operação.',
      info: 'Esta é uma informação importante.',
      warning: 'Atenção: verifique os dados antes de continuar.'
    };
    showToast(messages[type], type);
  };

  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 z-40">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
        🛠️ Dev Tools
      </h3>
      
      <div className="space-y-2">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tema:</p>
          <button
            onClick={toggleTheme}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Toasts:</p>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => handleTestToast('success')}
              className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
            >
              ✅ Success
            </button>
            <button
              onClick={() => handleTestToast('error')}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              ❌ Error
            </button>
            <button
              onClick={() => handleTestToast('warning')}
              className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
            >
              ⚠️ Warning
            </button>
            <button
              onClick={() => handleTestToast('info')}
              className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            >
              ℹ️ Info
            </button>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cache:</p>
          <button
            onClick={() => {
              localStorage.clear();
              showToast('Cache limpo com sucesso!', 'success');
            }}
            className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded w-full"
          >
            🗑️ Limpar Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTools;
