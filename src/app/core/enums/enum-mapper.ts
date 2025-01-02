import { Action, getActionColor, getActionTranslation } from './action.enum';
import { Boolean, getBooleanColor, getBooleanTranslation } from './boolean.enum';
import {
    DescarteInorganico,
    getDescarteInorganicoColor,
    getDescarteInorganicoTranslation,
} from './descarte-inorganico.enum';
import { DescarteOrganico, getDescarteOrganicoColor, getDescarteOrganicoTranslation } from './descarte-organico.enum';
import { DescarteUsuario, getDescarteUsuarioColor, getDescarteUsuarioTranslation } from './descarte-usuario.enum';
import { getNaturezaAmostraColor, getNaturezaAmostraTranslation, NaturezaAmostra } from './natureza-amostra.enum';
import { getRetiradaAmostraColor, getRetiradaAmostraTranslation, RetiradaAmostra } from './retirada-amostras.enum';
import { getRolesColor, getRolesTranslation, Roles } from './roles.enum';
import {
    getSolicitationFileTypeColor,
    getSolicitationFileTypeTranslation,
    SolicitationFileType,
} from './solicitation-file-type.enum';
import {
    getSolicitationFormTypeColor,
    getSolicitationFormTypeTranslation,
    SolicitationFormType,
} from './solicitation-form-type.enum';
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
        case 'SolicitationFormType':
            return SolicitationFormType;
        case 'RetiradaAmostra':
            return RetiradaAmostra;
        case 'NaturezaAmostra':
            return NaturezaAmostra;
        case 'DescarteOrganico':
            return DescarteOrganico;
        case 'DescarteInorganico':
            return DescarteInorganico;
        case 'DescarteUsuario':
            return DescarteUsuario;
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
        case 'SolicitationFormType':
            return getSolicitationFormTypeColor(enumValue);
        case 'RetiradaAmostra':
            return getRetiradaAmostraColor(enumValue);
        case 'NaturezaAmostra':
            return getNaturezaAmostraColor(enumValue);
        case 'DescarteOrganico':
            return getDescarteOrganicoColor(enumValue);
        case 'DescarteInorganico':
            return getDescarteInorganicoColor(enumValue);
        case 'DescarteUsuario':
            return getDescarteUsuarioColor(enumValue);
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
        case 'SolicitationFormType':
            return getSolicitationFormTypeTranslation(enumValue);
        case 'RetiradaAmostra':
            return getRetiradaAmostraTranslation(enumValue);
        case 'NaturezaAmostra':
            return getNaturezaAmostraTranslation(enumValue);
        case 'DescarteOrganico':
            return getDescarteOrganicoTranslation(enumValue);
        case 'DescarteInorganico':
            return getDescarteInorganicoTranslation(enumValue);
        case 'DescarteUsuario':
            return getDescarteUsuarioTranslation(enumValue);
        default:
            console.error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
            throw new Error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}
