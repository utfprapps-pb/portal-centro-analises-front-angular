export enum DRXModoAnalise {
    CN = 'Contínuo',
    ST = 'Step',
}

export function getDRXModoAnaliseColor(value: 'CN' | 'ST') {
    return '#b1b1b1';
}

export function getDRXModoAnaliseTranslation(value: 'CN' | 'ST') {
    return DRXModoAnalise[value];
}
