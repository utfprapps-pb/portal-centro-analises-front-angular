export enum StatusAI {
    INACTIVE = 'Inativo',
    ACTIVE = 'Ativo'
}

export function getStatusAIColor(value: 'INACTIVE' | 'ACTIVE') {
    switch (value) {
        case 'INACTIVE':
            return '#d61e1e';
        case 'ACTIVE':
            return '#78d61e';
    }
}

export function getStatusAITranslation(value: 'INACTIVE' | 'ACTIVE') {
    return StatusAI[value];
}
