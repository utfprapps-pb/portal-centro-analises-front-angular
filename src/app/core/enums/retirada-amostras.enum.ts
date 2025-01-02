export enum RetiradaAmostra {
    TRUE = 'Sim, quero minhas amostras de volta e me comprometo a retirá-las dentro de 30 dias após o envio dos resultados da análise.',
    FALSE = 'Não, podem ser descartadas'
}

export function getRetiradaAmostraColor(value: 'TRUE' | 'FALSE') {
    return '#b1b1b1';
}

export function getRetiradaAmostraTranslation(value: 'TRUE' | 'FALSE') {
    return RetiradaAmostra[value];
}
