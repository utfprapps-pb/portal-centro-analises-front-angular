import { getRolesColor, getRolesTranslation, Roles } from './roles.enum';
import { getStatusAIColor, getStatusAITranslation, StatusAI } from './statusai.enum';

export function getEnum(enumName: string): any {
    switch (enumName) {
        case 'Roles':
            return Roles;
        case 'StatusAI':
            return StatusAI;
        default:
            console.error(`getEnum: Enum não mapeado no enum-mapper.ts \t ${enumName}`);
            throw new Error(`getEnum: Enum não mapeado no enum-mapper.ts \t ${enumName}`);
    }
}

export function getEnumColor(enumName: string, enumValue: any): string {
    switch (enumName) {
        case 'Roles':
            return getRolesColor(enumValue);
        case 'StatusAI':
            return getStatusAIColor(enumValue);
        default:
            console.error(`getEnumColor: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
            throw new Error(`getEnumColor: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}

export function getEnumTranslation(enumName: string, enumValue: any): string {
    switch (enumName) {
        case 'Roles':
            return getRolesTranslation(enumValue);
        case 'StatusAI':
            return getStatusAITranslation(enumValue);
        default:
            console.error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
            throw new Error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}
