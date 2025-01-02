export enum DescarteOrganico {
    SOH = 'Solventes Orgânicos Halogenados',
    SONHME5 = 'Solventes organicos não-halogenados com MENOS de 5% de água',
    SONHMA5 = 'Solventes organicos não-halogenados com MAIS de 5% de água',
    OTHER = 'Outros...'
}

export function getDescarteOrganicoColor(value: 'SOH' | 'SONHME5' | 'SONHMA5' | 'OTHER') {
    return '#b1b1b1';
}

export function getDescarteOrganicoTranslation(value: 'SOH' | 'SONHME5' | 'SONHMA5' | 'OTHER') {
    return DescarteOrganico[value];
}
