export enum SolicitationStatus {
    AWAITING_RESPONSIBLE_CONFIRMATION = "Aguardando confirmação do responsável",
    AWAITING_CORRECTION = "Aguardando correção",
    AWAITING_LAB_CONFIRMATION = "Aguardando confirmação do laboratório",
    AWAITING_SAMPLE = "Aguardando amostra",
    AWAITING_ANALYSIS = "Aguardando análise",
    ANALYZING = "Analisando",
    AWAITING_PAYMENT = "Aguardando pagamento",
    REJECTED = "Recusado",
    COMPLETED = "Concluído",
    UNEXPECTED_BLOCK = "Bloqueio Imprevisto",
    TECHNICAL_BREAK = "Pausa Técnica"
}

export function getSolicitationStatusEnum(value: SolicitationStatus): string {
    switch (value) {
        case SolicitationStatus.AWAITING_RESPONSIBLE_CONFIRMATION:
            return 'AWAITING_RESPONSIBLE_CONFIRMATION';
        case SolicitationStatus.AWAITING_CORRECTION:
            return 'AWAITING_CORRECTION';
        case SolicitationStatus.AWAITING_LAB_CONFIRMATION:
            return 'AWAITING_LAB_CONFIRMATION';
        case SolicitationStatus.AWAITING_SAMPLE:
            return 'AWAITING_SAMPLE';
        case SolicitationStatus.AWAITING_ANALYSIS:
            return 'AWAITING_ANALYSIS';
        case SolicitationStatus.ANALYZING:
            return 'ANALYZING';
        case SolicitationStatus.AWAITING_PAYMENT:
            return 'AWAITING_PAYMENT';
        case SolicitationStatus.REJECTED:
            return 'REJECTED';
        case SolicitationStatus.COMPLETED:
            return 'COMPLETED';
        case SolicitationStatus.UNEXPECTED_BLOCK:
            return 'UNEXPECTED_BLOCK';
        case SolicitationStatus.TECHNICAL_BREAK:
            return 'TECHNICAL_BREAK';
    }
}


export function getSolicitationStatusColor(value:
    'AWAITING_RESPONSIBLE_CONFIRMATION' |
    'AWAITING_CORRECTION' |
    'AWAITING_LAB_CONFIRMATION' |
    'AWAITING_SAMPLE' |
    'AWAITING_ANALYSIS' |
    'ANALYZING' |
    'AWAITING_PAYMENT' |
    'REJECTED' |
    'COMPLETED' |
    'UNEXPECTED_BLOCK' |
    'TECHNICAL_BREAK'
) {
    switch (value) {
        case 'AWAITING_RESPONSIBLE_CONFIRMATION':
            return "#FFA500";
        case 'AWAITING_CORRECTION':
            return "#FF4500";
        case 'AWAITING_LAB_CONFIRMATION':
            return "#FFD700";
        case 'AWAITING_SAMPLE':
            return "#1E90FF";
        case 'AWAITING_ANALYSIS':
            return "#00BFFF";
        case 'ANALYZING':
            return "#8A2BE2";
        case 'AWAITING_PAYMENT':
            return "#FF8C00";
        case 'REJECTED':
            return "#FF0000";
        case 'COMPLETED':
            return "#008000";
        case 'UNEXPECTED_BLOCK':
            return "#800080";
        case 'TECHNICAL_BREAK':
            return "#808080";
    }
}

export function getSolicitationStatusTranslation(value:
    'AWAITING_RESPONSIBLE_CONFIRMATION' |
    'AWAITING_CORRECTION' |
    'AWAITING_LAB_CONFIRMATION' |
    'AWAITING_SAMPLE' |
    'AWAITING_ANALYSIS' |
    'ANALYZING' |
    'AWAITING_PAYMENT' |
    'REJECTED' |
    'COMPLETED' |
    'UNEXPECTED_BLOCK' |
    'TECHNICAL_BREAK'
) {
    return SolicitationStatus[value];
}
