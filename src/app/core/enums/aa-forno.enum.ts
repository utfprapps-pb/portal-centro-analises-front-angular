export enum AAForno {
    FC = 'Forno de chama',
    FG = 'Forno de grafite',
    GH = 'Gerador de hidretos'
}

export function getAAFornoColor(value: 'FC' | 'FG' | 'GH') {
    return '#b1b1b1';
}

export function getAAFornoTranslation(value: 'FC' | 'FG' | 'GH') {
    return AAForno[value];
}
