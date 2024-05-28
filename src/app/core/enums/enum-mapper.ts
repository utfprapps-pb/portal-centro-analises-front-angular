import { Action, getActionColor, getActionTranslation } from './action.enum';
import { Boolean, getBooleanColor, getBooleanTranslation } from './boolean.enum';
import { Roles, getRolesColor, getRolesTranslation } from './roles.enum';
import { StatusAI, getStatusAIColor, getStatusAITranslation } from './statusai.enum';
import { UserType, getUserTypeColor, getUserTypeTranslation } from './user-type.enum';

export function getEnum(enumName: string): any {
    switch (enumName) {
        case 'Roles':
            return Roles;
        case 'StatusAI':
            return StatusAI;
        case 'UserType':
            return UserType;
        case 'Action':
            return Action;
        case 'Boolean':
            return Boolean;
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
        case 'UserType':
            return getUserTypeColor(enumValue);
        case 'Action':
            return getActionColor(enumValue);
        case 'Boolean':
            return getBooleanColor(enumValue);
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
        case 'UserType':
            return getUserTypeTranslation(enumValue);
        case 'Action':
            return getActionTranslation(enumValue);
        case 'Boolean':
            return getBooleanTranslation(enumValue);
        default:
            console.error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
            throw new Error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}
