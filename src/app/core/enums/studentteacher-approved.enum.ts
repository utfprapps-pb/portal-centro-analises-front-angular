
export enum StudentTeacherApproved {
    ACEITO = 'Aceito',
    PENDENTE = 'Pendente',
    RECUSADO = 'Recusado',
}

export function getStudentTeacherApprovedColor(value: 'ACEITO' | 'PENDENTE' | 'RECUSADO') {
    switch (value) {
        case 'ACEITO':
            return '#546fd8';
        case 'PENDENTE':
            return '#9f9f9f'
        case 'RECUSADO':
            return '#d61e1e';

    }
}

export function getStudentTeacherApprovedTranslation(value: 'ACEITO' | 'PENDENTE' | 'RECUSADO') {
    return StudentTeacherApproved[value];
}
