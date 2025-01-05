export enum CORTipoLeitura {
    CIE = 'CIE : L*a*b*',
    HL = 'Hunter Lab: L a b',
}

export function getCORTipoLeituraColor(value: 'CIE' | 'HL') {
    return '#b1b1b1';
}

export function getCORTipoLeituraTranslation(value: 'CIE' | 'HL') {
    return CORTipoLeitura[value];
}
