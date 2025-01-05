export enum CLAEModoEluicao {
    ISO = 'Isocártico',
    GRA = 'Gradiente',
}

export function getCLAEModoEluicaoColor(value: 'ISO' | 'GRA') {
    return '#b1b1b1';
}

export function getCLAEModoEluicaoTranslation(value: 'ISO' | 'GRA') {
    return CLAEModoEluicao[value];
}
