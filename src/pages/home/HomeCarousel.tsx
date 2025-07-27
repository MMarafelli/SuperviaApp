import { useEffect, useState } from 'react';
import { formatDateToPtBR } from '../../utils/dateUtils';

export type ConsumoCard = {
  id: string;
  data: string;
  equipe: string;
  nomeEstrada: string;
  kmInicial: string;
  kmFinal: string;
  esfera: string;
  resultadoEsferas: string;
  tinta: string;
  resultadoTinta: string;
  totalMetrosPista: string;
  show: boolean;
};

const STORAGE_KEY = 'consumoCards';

function getCardsFromStorage(): ConsumoCard[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const cards = JSON.parse(data) as ConsumoCard[];
    
    // Migração: converte datas no formato AAAA-MM-DD para DD/MM/AAAA
    const migratedCards = cards.map(card => {
      // Verifica se a data está no formato AAAA-MM-DD
      if (card.data && card.data.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return {
          ...card,
          data: formatDateToPtBR(card.data)
        };
      }
      return card;
    });
    
    // Se houve migração, salva os dados atualizados
    if (JSON.stringify(cards) !== JSON.stringify(migratedCards)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedCards));
    }
    
    return migratedCards;
  } catch {
    return [];
  }
}

function saveCardsToStorage(cards: ConsumoCard[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export default function HomeCarousel({ onEdit }: { onEdit: (card: ConsumoCard) => void }) {
  const [cards, setCards] = useState<ConsumoCard[]>([]);

  useEffect(() => {
    setCards(getCardsFromStorage().filter(card => card.show !== false));
  }, []);

  function handleDelete(id: string) {
    const updated = getCardsFromStorage().map(card =>
      card.id === id ? { ...card, show: false } : card
    );
    saveCardsToStorage(updated);
    setCards(updated.filter(card => card.show !== false));
  }

  if (cards.length === 0) {
    return <div className="mt-8 text-center text-gray-500">Nenhum registro salvo.</div>;
  }

  return (
    <div className="flex overflow-x-auto gap-4 p-4 w-full max-w-3xl mx-auto">
      {cards.map(card => (
        <div key={card.id} className="min-w-[300px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col relative">
          <div className="text-xs text-gray-400 mb-1">{formatDateToPtBR(card.data)}</div>
          <div className="font-bold text-lg mb-2">{card.nomeEstrada}</div>
          <div className="text-sm mb-1">Equipe: {card.equipe}</div>
          <div className="text-sm mb-1">KM: {card.kmInicial} - {card.kmFinal}</div>
          <div className="text-sm mb-1">Total m²: {card.totalMetrosPista}</div>
          <div className="text-sm mb-1">Esfera: {card.esfera} | Tinta: {card.tinta}</div>
          <div className="text-sm mb-1">Res. Esferas: {card.resultadoEsferas} | Res. Tinta: {card.resultadoTinta}</div>
          <div className="flex gap-2 mt-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => onEdit(card)}>Editar</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(card.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}
