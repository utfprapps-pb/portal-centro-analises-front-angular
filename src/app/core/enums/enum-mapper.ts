import { getRolesColor, getRolesTranslation, Roles } from './roles.enum';

export function getEnum(enumName: string): any {
    switch (enumName) {
        case 'Roles':
            return Roles;
        default:
            throw new Error(`getEnum: Enum não mapeado no enum-mapper.ts \t ${enumName}`);
    }
}

export function getEnumColor(enumName: string, enumValue: any): string {
    switch (enumName) {
        case 'Roles':
            return getRolesColor(enumValue);
        default:
            throw new Error(`getEnumColor: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}

export function getEnumTranslation(enumName: string, enumValue: any): string {
    switch (enumName) {
        case 'Roles':
            return getRolesTranslation(enumValue);
        default:
            throw new Error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}
