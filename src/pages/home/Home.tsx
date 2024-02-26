import { useState, useEffect } from 'react';

import './Home.css'

import Relogio from '../../components/relogio/Relogio';
import Calendario from '../../components/calendario/Calendario';
import BlocoDeNotas from '../../components/blocoDeNotas/BlocoDeNotas';

function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  useEffect(() => {
    // Configura selectedDate com a data atual apenas no montante inicial
    setSelectedDate(new Date());
  }, []); //
  return (
    <div className="flex flex-col items-center justify-center">
      <Relogio />
      <Calendario setSelectedDate={setSelectedDate} />
      {selectedDate !== null && (
        <BlocoDeNotas data={selectedDate} />
      )}
    </div>
  );
}

export default Home;
