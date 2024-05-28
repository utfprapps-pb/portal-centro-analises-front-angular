export enum Action {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
}

export function getActionColor(value: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE') {
    switch (value) {
        case 'READ':
            return '#b1b1b1';
        case 'CREATE':
            return '#78d61e';
        case 'UPDATE':
            return '#546fd8';
        case 'DELETE':
            return '#d61e1e';
    }
}

export function getActionTranslation(value: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE') {
    return Action[value];
}
