export enum Roles {
    ROLE_PROFESSOR = "ROLE_PROFESSOR",
    ROLE_STUDENT = "ROLE_STUDENT",
    ROLE_EXTERNAL = "ROLE_EXTERNAL",
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_PARTNER = "ROLE_PARTNER"
}

export function getRolesColor(value: Roles) {
    switch (value) {
        case Roles.ROLE_ADMIN:
            return '#d61e1e';
        case Roles.ROLE_PROFESSOR:
            return '#ad51ea';
        case Roles.ROLE_STUDENT:
            return '#1fc1d6';
        case Roles.ROLE_PARTNER:
            return '#f5561a';
        case Roles.ROLE_EXTERNAL:
            return '#4b7fb7';
    }
}

export function getRolesTranslation(value: Roles) {
    switch (value) {
        case Roles.ROLE_ADMIN:
            return 'Administrador';
        case Roles.ROLE_PROFESSOR:
            return 'Professor';
        case Roles.ROLE_STUDENT:
            return 'Estudante';
        case Roles.ROLE_PARTNER:
            return 'Afiliado';
        case Roles.ROLE_EXTERNAL:
            return 'Externo';
    }
}
