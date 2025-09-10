
export function formatMovementType(type: 'TRANSFER' | 'ENTRY' | 'EXIT'): string {
    switch (type) {
        case 'TRANSFER':
            return 'Transferência';
        case 'ENTRY':
            return 'Entrada';
        case 'EXIT':
            return 'Saída';
    }
}

export function formatTimestamp(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return date.toLocaleString('pt-BR', options);
}