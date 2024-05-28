export enum Boolean {
    TRUE = 'Sim',
    FALSE = 'Não'
}

export function getBooleanColor(value: 'TRUE' | 'FALSE') {
    switch (value) {
        case 'TRUE':
            return '#546fd8';
        case 'FALSE':
            return '#d61e1e';
    }
}

export function getBooleanTranslation(value: 'TRUE' | 'FALSE') {
    return Boolean[value];
}
