export enum DescarteInorganico {
    AC = 'Ácidos',
    BA = 'Bases',
    MP = 'Metais Pesados',
    SU = 'Sulfetos',
    CI = 'Cianetos',
    SP = 'Sais de Prata',
    OTHER = 'Outros...',
}

export function getDescarteInorganicoColor(value: 'AC' | 'BA' | 'MP' | 'SU' | 'CI' | 'SP' | 'OTHER') {
    return '#b1b1b1';
}

export function getDescarteInorganicoTranslation(value: 'AC' | 'BA' | 'MP' | 'SU' | 'CI' | 'SP' | 'OTHER') {
    return DescarteInorganico[value];
}
