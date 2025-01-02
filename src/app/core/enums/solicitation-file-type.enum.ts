export enum SolicitationFileType {
    REPORT = 'Relatório final',
    TICKET = 'Boleto',
    INVOICE = 'Nota Fiscal',
    ATTACHMENT = 'Anexo'
}

export function getSolicitationFileTypeColor(value: 'REPORT' | 'TICKET' | 'INVOICE' | 'ATTACHMENT') {
    switch (value) {
        case 'REPORT':
            return '#A40000';
        case 'TICKET':
            return '#B78301';
        case 'INVOICE':
            return '#039F00';
        case 'ATTACHMENT':
            return '#B73BFF';
    }
}

export function getSolicitationFileTypeTranslation(value: 'REPORT' | 'TICKET' | 'INVOICE' | 'ATTACHMENT') {
    return SolicitationFileType[value];
}
