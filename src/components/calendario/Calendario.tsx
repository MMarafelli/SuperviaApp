// Calendario.tsx
import React, { useState, useEffect } from 'react';
import { format, isToday, isSameDay, subMonths, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import './Calendario.css';

interface CalendarioProps {
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function Calendario({ setSelectedDate }: CalendarioProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDateLocal] = useState<Date | null>(null);

    useEffect(() => {
        setSelectedDate(selectedDate);
    }, [selectedDate, setSelectedDate]);

    const handleDayClick = (day: number) => {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDateLocal(newSelectedDate);
    };

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(event.target.value, 10);
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), newMonth, prevDate.getDate()));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(event.target.value, 10);
        setCurrentDate((prevDate) => new Date(newYear, prevDate.getMonth(), prevDate.getDate()));
    };

    function renderMonthOptions() {
        const monthOptions = [];
        for (let i = 0; i < 12; i++) {
            const monthDate = new Date(currentDate.getFullYear(), i, 1);
            const monthLabel = format(monthDate, 'MMMM', { locale: ptBR });
            monthOptions.push(<option key={i} value={i}>{monthLabel}</option>);
        }
        return monthOptions;
    }

    const renderYearOptions = () => {
        const years = Array.from({ length: 10 }, (_, index) => currentDate.getFullYear() - 5 + index);
        return years.map((year) => (
            <option key={year} value={year}>{year}</option>
        ));
    };

    const diasNoMes = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    return (
        <div className="div-geral-do-calendario flex flex-col items-center mb-4">
            <div className="flex items-center mb-2">
                <button className="mr-2" onClick={handlePrevMonth}>&lt; Anterior</button>
                <select className="mr-2" value={currentDate.getMonth()} onChange={handleMonthChange}>
                    {renderMonthOptions()}
                </select>
                <select className="mr-2" value={currentDate.getFullYear()} onChange={handleYearChange}>
                    {renderYearOptions()}
                </select>
                <button onClick={handleNextMonth}>Próximo &gt;</button>
            </div>
            <div className="flex flex-wrap">
                <div className="div-dos-dias-do-calendario flex flex-wrap p-2">
                    {Array.from({ length: diasNoMes }, (_, index) => index + 1).map((day) => (
                        <div
                            key={day}
                            className={`cada-dia w-8 h-8 flex items-center justify-center cursor-pointer 
                            ${selectedDate && isSameDay(new Date(currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day), selectedDate) ? 'bg-amarelo' : 'bg-cinza'}
                            ${(isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                                    || isSameDay(new Date(), new Date(currentDate.getFullYear(),
                                        currentDate.getMonth(), day))) ? 'data-atual bg-amarelo' : ''}
                            `}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendario;
