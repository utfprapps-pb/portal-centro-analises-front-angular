export enum DSCTecnica {
    SS = 'Selado',
    SF = 'Selado com Furo',
    AB = 'Aberto',
}

export function getDSCTecnicaColor(value: 'SS' | 'SF' | 'AB') {
    return '#b1b1b1';
}

export function getDSCTecnicaTranslation(value: 'SS' | 'SF' | 'AB') {
    return DSCTecnica[value];
}
