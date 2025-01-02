export enum NaturezaAmostra {
    ORG = 'Orgânica',
    INO = 'Inorgânica'
}

export function getNaturezaAmostraColor(value: 'ORG' | 'INO') {
    return '#b1b1b1';
}

export function getNaturezaAmostraTranslation(value: 'ORG' | 'INO') {
    return NaturezaAmostra[value];
}
