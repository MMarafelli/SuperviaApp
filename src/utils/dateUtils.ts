export const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
        // Se já for uma string, tenta converter para o formato correto
        const parts = date.split('/');
        if (parts.length === 3) {
            // Converte de dd/mm/yyyy para yyyy-mm-dd
            const [day, month, year] = parts;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        // Se já estiver no formato yyyy-mm-dd, retorna como está
        if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return date;
        }
        // Se não conseguir converter, retorna a data atual no formato correto
        return new Date().toISOString().split('T')[0];
    }
    
    // Se for um objeto Date, converte para yyyy-mm-dd
    return date.toISOString().split('T')[0];
};

export const formatDateToPtBR = (date: string): string => {
    if (!date) return '';
    
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};
