export enum SolicitationFormType {
    AA = '[AA] Espectroscopia de Absorção Atômica',
    AW = '[AW] Atividade de Água',
    CLAE = '[CLAE] Cromatografia Líquida de Alta Eficiência (HPLC)',
    COR = '[COR] Análise Colorimétrica',
    DRX = '[DRX] Difratômetro de Raios X',
    DSC = '[DSC] Calorimetria Diferencial de Varredura',
    FTMIR = '[FT-MIR] Espectroscopia no Infravermelho Médio com Transformada de Fourier',
    MEV = '[MEV] Miscropia Eletrônica de Varredura',
    TGADTA = '[TGA] Termogravimetria | [DTA] Análise Térmica Diferencial',
}

export function getSolicitationFormTypeColor(
    value: 'AA' | 'AW' | 'CLAE' | 'COR' | 'DRX' | 'DSC' | 'FTMIR' | 'MEV' | 'TGADTA'
): string {
    switch (value) {
        case 'AA':
            return '#FF5733';
        case 'AW':
            return '#026295';
        case 'CLAE':
            return '#EE33FF';
        case 'COR':
            return '#FF33A8';
        case 'DRX':
            return '#003F5C';
        case 'DSC':
            return '#A833FF';
        case 'FTMIR':
            return '#FF8C33';
        case 'MEV':
            return '#228B22';
        case 'TGADTA':
            return '#7913FF';
        default:
            return '#b1b1b1';
    }
}


export function getSolicitationFormTypeTranslation(value: 'AA' | 'AW' | 'CLAE' | 'COR' | 'DRX' | 'DSC' | 'FTMIR' | 'MEV' | 'TGADTA') {
    return SolicitationFormType[value];
}
