export enum FinanceState {
    PENDING = 'Pendente',
    PAID = 'Pago',
    RECEIVED = 'Recebido',
}

export function getFinanceStateColor(value: 'PENDING' | 'PAID' | 'RECEIVED') {
    switch (value) {
        case 'PENDING':
            return '#d6d61e';
        case 'PAID':
            return '#1e6ed6';
        case 'RECEIVED':
            return '#78d61e';
    }
}

export function getFinanceStateTranslation(value: 'PENDING' | 'PAID' | 'RECEIVED') {
    return FinanceState[value];
}
