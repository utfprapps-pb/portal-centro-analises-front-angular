export enum SolicitationFormType {
    AA = '[AA] Espectroscopia de Absorção Atômica',
    AW = '[AW] Atividade de Água',
    CLAE = '[CLAE] Cromatografia Líquida de Alta Eficiência (HPLC)',
    COR = '[COR] Análise Colorímetrica',
    DRX = '[DRX] Difratômetro de Raios X',
    DSC = '[DSC] Calorimetria Diferencial de Varredura',
    FTMIR = '[FT-MIR] Espectroscopia no Infravermelho Médio com Transformada de Fourier',
    MEV = '[MEV] Miscropia Eletrônica de Varredura',
    TGADTA = '[TGA] Termogravimetria | [DTA] Análise Térmica Diferencial',
}

export function getSolicitationFormTypeColor(value: 'AA' | 'AW' | 'CLAE' | 'COR' | 'DRX' | 'DSC' | 'FTMIR' | 'MEV' | 'TGADTA') {
    return '#b1b1b1';
}

export function getSolicitationFormTypeTranslation(value: 'AA' | 'AW' | 'CLAE' | 'COR' | 'DRX' | 'DSC' | 'FTMIR' | 'MEV' | 'TGADTA') {
    return SolicitationFormType[value];
}
