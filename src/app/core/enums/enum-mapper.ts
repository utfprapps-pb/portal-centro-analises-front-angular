import { Action, getActionColor, getActionTranslation } from './action.enum';
import { Boolean, getBooleanColor, getBooleanTranslation } from './boolean.enum';
import { getRolesColor, getRolesTranslation, Roles } from './roles.enum';
import {
    getSolicitationFileTypeColor,
    getSolicitationFileTypeTranslation,
    SolicitationFileType,
} from './solicitation-file-type.enum';
import {
    getSolicitationProjectNatureColor,
    getSolicitationProjectNatureTranslation,
    SolicitationProjectNature,
} from './solicitation-project-nature.enum';
import {
    getSolicitationStatusColor,
    getSolicitationStatusTranslation,
    SolicitationStatus,
} from './solicitation-status.enum';
import { getStatusAIColor, getStatusAITranslation, StatusAI } from './statusai.enum';
import {
    getStudentTeacherApprovedColor,
    getStudentTeacherApprovedTranslation,
    StudentTeacherApproved,
} from './studentteacher-approved.enum';
import { getUserTypeColor, getUserTypeTranslation, UserType } from './user-type.enum';

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
        case 'StudentTeacherApproved':
            return StudentTeacherApproved;
        case 'SolicitationStatus':
            return SolicitationStatus;
        case 'SolicitationProjectNature':
            return SolicitationProjectNature;
        case 'SolicitationFileType':
            return SolicitationFileType;
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
        case 'StudentTeacherApproved':
            return getStudentTeacherApprovedColor(enumValue);
        case 'SolicitationStatus':
            return getSolicitationStatusColor(enumValue);
        case 'SolicitationProjectNature':
            return getSolicitationProjectNatureColor(enumValue);
        case 'SolicitationFileType':
            return getSolicitationFileTypeColor(enumValue);
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
        case 'StudentTeacherApproved':
            return getStudentTeacherApprovedTranslation(enumValue);
        case 'SolicitationStatus':
            return getSolicitationStatusTranslation(enumValue);
        case 'SolicitationProjectNature':
            return getSolicitationProjectNatureTranslation(enumValue);
        case 'SolicitationFileType':
            return getSolicitationFileTypeTranslation(enumValue);
        default:
            console.error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
            throw new Error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}
