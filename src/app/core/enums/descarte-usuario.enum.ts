export enum DescarteUsuario {
    LX = 'Lixo Comum',
    RT = 'Resíduos para Tratamento',
    OTHER = 'Outros...',
}

export function getDescarteUsuarioColor(value: 'LX' | 'RT' | 'OTHER') {
    return '#b1b1b1';
}

export function getDescarteUsuarioTranslation(value: 'LX' | 'RT' | 'OTHER') {
    return DescarteUsuario[value];
}
