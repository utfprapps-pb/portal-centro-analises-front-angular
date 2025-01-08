export enum FTMIREstado {
    S = 'Sólido',
    L = 'Liquído',
}

export function getFTMIREstadoColor(value: 'S' | 'L') {
    return '#b1b1b1';
}

export function getFTMIREstadoTranslation(value: 'S' | 'L') {
    return FTMIREstado[value];
}
