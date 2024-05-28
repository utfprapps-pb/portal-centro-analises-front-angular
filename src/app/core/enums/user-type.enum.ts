export enum UserType {
    PF = 'Pessoa Física',
    PJ = 'Pessoa Jurídica'
}

export function getUserTypeColor(value: 'PF' | 'PJ') {
    switch (value) {
        case 'PF':
            return '#546fd8';
        case 'PJ':
            return '#976694';
    }
}

export function getUserTypeTranslation(value: 'PF' | 'PJ') {
    return UserType[value];
}
