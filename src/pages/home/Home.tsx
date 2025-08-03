
import { useEffect, useState } from "react";
import "./Home.css";
import styles from "./HomeCarousel.module.css";
import { PageTitle } from "../../design-system";
import { formatDateToPtBR } from "../../utils/dateUtils";

interface CalcTintaEsferaData {
  quantidade: number;
  cor: string;
  data: string;
  nomeEstrada?: string;
  equipe?: string;
  kmInicial?: string;
  kmFinal?: string;
  esfera?: string;
  totalMetrosPista?: string;
  resultadoEsferas?: string;
  resultadoTinta?: string;
}

interface TintaEsferaCard {
  id: string;
  resumo: string;
  data: CalcTintaEsferaData;
  show: boolean;
}

const Home = () => {
  const [cards, setCards] = useState<TintaEsferaCard[]>([]);

  useEffect(() => {
    const loadCards = () => {
      try {
        const saved = localStorage.getItem("tintaEsferaCards");
        if (saved) {
          const parsed = JSON.parse(saved) as TintaEsferaCard[];
          
          // Função para migrar o formato de data no resumo
          const migratedCards = parsed.map(card => {
            try {
              // Verifica se o resumo contém data no formato AAAA-MM-DD
              const dateRegex = /\((\d{4}-\d{2}-\d{2})\)/;
              const match = card.resumo.match(dateRegex);
              
              if (match) {
            const oldDate = match[1]; // AAAA-MM-DD
            const newDate = formatDateToPtBR(oldDate); // DD/MM/AAAA
            const newResumo = card.resumo.replace(dateRegex, `(${newDate})`);
            
            return {
              ...card,
              resumo: newResumo
            };
          }
          
              return card;
            } catch (error) {
              console.warn('Erro ao processar card:', error);
              return card; // Retorna o card original em caso de erro
            }
          });
          
          // Salva os dados migrados de volta no localStorage
          localStorage.setItem("tintaEsferaCards", JSON.stringify(migratedCards));
          
          setCards(migratedCards.filter(card => card.show !== false));
        }
      } catch (error) {
        console.error('Erro ao carregar cards do localStorage:', error);
        setCards([]);
      }
    };
    
    loadCards();
  }, []);

  const handleEdit = (id: string) => {
    // Redirecionar para calcTintaEsfera com dados do card
    window.location.href = `/SuperviaApp/calcTintaEsfera?id=${id}`;
  };

  const handleDelete = (id: string) => {
    const updated = cards.map(card =>
      card.id === id ? { ...card, show: false } : card
    );
    setCards(updated.filter(card => card.show !== false));
    localStorage.setItem("tintaEsferaCards", JSON.stringify(updated));
  };

  return (
    <div className="sv-calc-container sv-fade-in">
      <PageTitle title="SEUS CÁLCULOS SALVOS" />
      {cards.length === 0 ? (
        <div className="mt-8 text-center text-gray-500 px-4">
          <div className="mb-2 text-lg">📋 Nenhum cálculo salvo ainda</div>
          <div className="text-sm text-gray-400">
            Os cálculos são salvos automaticamente quando você gera um levantamento na página de Pintura Automática
          </div>
        </div>
      ) : (
        <div className={styles.carousel}>
          {cards.map(card => (
            <div className={styles.card} key={card.id}>
              <div className={styles["card-content"]}>
                {/* Header do Card */}
                <div className="border-b border-gray-200 pb-3 mb-3">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {card.data.nomeEstrada || 'Estrada não informada'}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {card.data.cor || 'Estado não informado'}
                    </span>
                    <span className="text-gray-500">
                      {formatDateToPtBR(card.data.data) || 'Data não informada'}
                    </span>
                  </div>
                </div>

                {/* Informações do Trecho */}
                {(card.data.kmInicial || card.data.kmFinal || card.data.equipe) && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2 text-sm">
                      {(card.data.kmInicial || card.data.kmFinal) && (
                        <div className="flex items-center text-gray-700">
                          <span className="text-gray-500 mr-1">📍</span>
                          <span>KM {card.data.kmInicial || '0'} → {card.data.kmFinal || '0'}</span>
                        </div>
                      )}
                      {card.data.equipe && (
                        <div className="flex items-center text-gray-700">
                          <span className="text-gray-500 mr-1">👥</span>
                          <span>Equipe {card.data.equipe}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Resumo de Medições */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">📊 Resumo das Medições</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {card.data.totalMetrosPista && (
                      <div>
                        <span className="text-gray-500">Total m²:</span>
                        <span className="font-medium ml-1">{card.data.totalMetrosPista}</span>
                      </div>
                    )}
                    {card.data.esfera && (
                      <div>
                        <span className="text-gray-500">Esfera:</span>
                        <span className="font-medium ml-1">{card.data.esfera} kg</span>
                      </div>
                    )}
                    {card.data.quantidade && (
                      <div>
                        <span className="text-gray-500">Tinta:</span>
                        <span className="font-medium ml-1">{card.data.quantidade} baldes</span>
                      </div>
                    )}
                    {card.data.resultadoEsferas && (
                      <div>
                        <span className="text-gray-500">Rend. Esfera:</span>
                        <span className="font-medium ml-1">{card.data.resultadoEsferas} kg/m²</span>
                      </div>
                    )}
                    {card.data.resultadoTinta && (
                      <div>
                        <span className="text-gray-500">Rend. Tinta:</span>
                        <span className="font-medium ml-1">{card.data.resultadoTinta} m²/balde</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles["card-actions"]}>
                <button className={styles["edit-btn"]} onClick={() => handleEdit(card.id)}>
                  ✏️ Editar
                </button>
                <button className={styles["delete-btn"]} onClick={() => handleDelete(card.id)}>
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
