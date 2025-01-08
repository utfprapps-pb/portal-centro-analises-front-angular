export enum FTMIRServico {
    PK = 'Pastilha de KBr (somente para amostras sólidas e sem água)',
    RA = 'Reflectância total atenuada (Attenuated total reflectance)',
    RD = 'Refletância difusa (Difuse reflectance sampling)',
}

export function getFTMIRServicoColor(value: 'PK' | 'RA' | 'RD') {
    return '#b1b1b1';
}

export function getFTMIRServicoTranslation(value: 'PK' | 'RA' | 'RD') {
    return FTMIRServico[value];
}
