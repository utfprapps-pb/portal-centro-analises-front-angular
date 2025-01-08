export enum DSCAtmosfera {
    AS = 'Ar Sintético',
    NI = 'Nitrogênio',
}

export function getDSCAtmosferaColor(value: 'AS' | 'NI') {
    return '#b1b1b1';
}

export function getDSCAtmosferaTranslation(value: 'AS' | 'NI') {
    return DSCAtmosfera[value];
}
