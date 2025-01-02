export enum SolicitationProjectNature {
    MASTERS_THESIS = 'Trabalho de Mestrado',
    DOCTORATE_DISSERTATION = 'Trabalho de Doutorado',
    UNDERGRADUATE_THESIS = 'Trabalho de Conclusão de curso (TCC)',
    INTERNSHIP_PROJECT = 'Trabalho de Estágio',
    SCIENTIFIC_INITIATION = 'Iniciação Científica (programas PIBIC/PIBIT)',
    EXTENSION_PROJECT = 'Projeto de Extensão',
    RESEARCH_PROJECT = 'Projeto de Pesquisa',
    TEACHING_PROJECT = 'Projeto de Ensino',
    OTHER = 'Outro'
}

export function getSolicitationProjectNatureColor(value: 'MASTERS_THESIS' | 'DOCTORATE_DISSERTATION' |
    'UNDERGRADUATE_THESIS' | 'INTERNSHIP_PROJECT' | 'SCIENTIFIC_INITIATION' |
    'EXTENSION_PROJECT' | 'RESEARCH_PROJECT' | 'TEACHING_PROJECT' |
    'OTHER'
) {
    switch (value) {
        case 'MASTERS_THESIS':
            return '#2A1ED6';
        case 'DOCTORATE_DISSERTATION':
            return '#1E77D6';
        case 'UNDERGRADUATE_THESIS':
            return '#D67D1E';
        case 'INTERNSHIP_PROJECT':
            return '#D6A81E';
        case 'SCIENTIFIC_INITIATION':
            return '#229300';
        case 'EXTENSION_PROJECT':
            return '#FF3EBC';
        case 'RESEARCH_PROJECT':
            return '#C63F1A';
        case 'TEACHING_PROJECT':
            return '#C61AA9';
        case 'OTHER':
            return '#88008D';
    }
}

export function getSolicitationProjectNatureTranslation(value: 'MASTERS_THESIS' | 'DOCTORATE_DISSERTATION' |
    'UNDERGRADUATE_THESIS' | 'INTERNSHIP_PROJECT' | 'SCIENTIFIC_INITIATION' |
    'EXTENSION_PROJECT' | 'RESEARCH_PROJECT' | 'TEACHING_PROJECT' |
    'OTHER') {
    return SolicitationProjectNature[value];
}
