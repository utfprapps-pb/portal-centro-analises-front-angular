export enum FTMIRRegistroEspectro {
    A = 'Absorbância (A)',
    T = 'Transmitância (T%)',
}

export function getFTMIRRegistroEspectroColor(value: 'A' | 'T') {
    return '#b1b1b1';
}

export function getFTMIRRegistroEspectroTranslation(value: 'A' | 'T') {
    return FTMIRRegistroEspectro[value];
}
