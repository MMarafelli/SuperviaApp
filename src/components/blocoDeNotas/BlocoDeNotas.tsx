// src/components/BlocoDeNotas.tsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function BlocoDeNotas({ data }: { data: Date }) {
  const [nota, setNota] = useState<string>('');

  useEffect(() => {
    // Carregar nota do cache
    const notaSalva = localStorage.getItem(format(data, 'yyyy-MM-dd'));
    setNota(notaSalva || '');
  }, [data]);

  const handleNotaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const novaNota = event.target.value;
    setNota(novaNota);
    // Salvar nota no cache automaticamente
    localStorage.setItem(format(data, 'yyyy-MM-dd'), novaNota);
  };

  return (
    <div className="div-geral-bloco-de-notas flex flex-col mt-4">
      <div className="data-selecionada-bloco-de-notas text-lg font-bold mb-2">
        {format(data, 'dd/MM/yyyy')}
      </div>
      <textarea
        className="area-de-texto-do-bloco-de-notas w-full p-2"
        placeholder="Adicionar nota..."
        value={nota}
        onChange={handleNotaChange}
      />
    </div>
  );
}

export default BlocoDeNotas;
