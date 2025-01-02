export enum SolicitationStatus {
    PENDING_ADVISOR = 'Aguardando Confirmação do Orientador',
    PENDING_CORRECTION = 'Aguardando Correção',
    PENDING_LAB = 'Aguardando Confirmação do Laboratório',
    PENDING_SAMPLE = 'Aguardando amostra',
    APPROVED = 'Aguardando Análise',
    PENDING_PAYMENT = 'Aguardando Pagamento',
    REFUSED = 'Recusado',
    FINISHED = 'Concluído',
}

export function getSolicitationStatusColor(value: 'PENDING_ADVISOR' | 'PENDING_CORRECTION' | 'PENDING_LAB' |
    'PENDING_SAMPLE' | 'APPROVED' | 'PENDING_PAYMENT' | 'REFUSED' | 'FINISHED') {
    switch (value) {
        case 'PENDING_ADVISOR':
            return '#b1b1b1';
        case 'PENDING_CORRECTION':
            return '#FFE32D';
        case 'PENDING_LAB':
            return '#B73BFF';
        case 'PENDING_SAMPLE':
            return '#2EFFEE';
        case 'PENDING_PAYMENT':
            return '#FF6F00';
        case 'APPROVED':
            return '#78d61e';
        case 'FINISHED':
            return '#546fd8';
        case 'REFUSED':
            return '#d61e1e';
    }
}

export function getSolicitationStatusTranslation(value: 'PENDING_ADVISOR' | 'PENDING_CORRECTION' | 'PENDING_LAB' |
    'PENDING_SAMPLE' | 'APPROVED' | 'PENDING_PAYMENT' | 'REFUSED' | 'FINISHED') {
    return SolicitationStatus[value];
}
