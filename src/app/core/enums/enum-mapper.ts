import Swal from 'sweetalert2';

import { AAForno, getAAFornoColor, getAAFornoTranslation } from './aa-forno.enum';
import { Action, getActionColor, getActionTranslation } from './action.enum';
import { Boolean, getBooleanColor, getBooleanTranslation } from './boolean.enum';
import { CLAEModoEluicao, getCLAEModoEluicaoColor, getCLAEModoEluicaoTranslation } from './clae-modo-eluicao.enum';
import { CORTipoLeitura, getCORTipoLeituraColor, getCORTipoLeituraTranslation } from './cor-tipo-leitura.enum';
import {
    DescarteInorganico,
    getDescarteInorganicoColor,
    getDescarteInorganicoTranslation,
} from './descarte-inorganico.enum';
import { DescarteOrganico, getDescarteOrganicoColor, getDescarteOrganicoTranslation } from './descarte-organico.enum';
import { DescarteUsuario, getDescarteUsuarioColor, getDescarteUsuarioTranslation } from './descarte-usuario.enum';
import { DRXModoAnalise, getDRXModoAnaliseColor, getDRXModoAnaliseTranslation } from './drx-modo-analise.enum';
import { DRXStep, getDRXStepColor, getDRXStepTranslation } from './drx-step.enum';
import { DSCAtmosfera, getDSCAtmosferaColor, getDSCAtmosferaTranslation } from './dsc-atmosfera.enum';
import { DSCTecnica, getDSCTecnicaColor, getDSCTecnicaTranslation } from './dsc-tecnica.enum';
import { FinanceState, getFinanceStateColor, getFinanceStateTranslation } from './financestate.enum';
import { FTMIREstado, getFTMIREstadoColor, getFTMIREstadoTranslation } from './ftmir-estado.enum';
import {
    FTMIRRegistroEspectro,
    getFTMIRRegistroEspectroColor,
    getFTMIRRegistroEspectroTranslation,
} from './ftmir-registro-espectro.enum';
import { FTMIRServico, getFTMIRServicoColor, getFTMIRServicoTranslation } from './ftmir-servico.enum';
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

const enumsRegistrados: string[] = [
    'Roles',
    'StatusAI',
    'UserType',
    'Action',
    'Boolean',
    'StudentTeacherApproved',
    'SolicitationStatus',
    'SolicitationProjectNature',
    'SolicitationFileType',
    'SolicitationFormType',
    'RetiradaAmostra',
    'NaturezaAmostra',
    'DescarteOrganico',
    'DescarteInorganico',
    'DescarteUsuario',
    'AAForno',
    'CLAEModoEluicao',
    'CORTipoLeitura',
    'DRXModoAnalise',
    'DRXStep',
    'DSCTecnica',
    'DSCAtmosfera',
    'FTMIRServico',
    'FTMIREstado',
    'FTMIRRegistroEspectro',
    'FinanceState',
]

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
        case 'AAForno':
            return AAForno;
        case 'CLAEModoEluicao':
            return CLAEModoEluicao;
        case 'CORTipoLeitura':
            return CORTipoLeitura;
        case 'DRXModoAnalise':
            return DRXModoAnalise;
        case 'DRXStep':
            return DRXStep;
        case 'DSCTecnica':
            return DSCTecnica;
        case 'DSCAtmosfera':
            return DSCAtmosfera;
        case 'FTMIRServico':
            return FTMIRServico;
        case 'FTMIREstado':
            return FTMIREstado;
        case 'FTMIRRegistroEspectro':
            return FTMIRRegistroEspectro;
        case 'FinanceState':
            return FinanceState;
        default:
            Swal.fire({ title: enumName, text: `getEnum: Enum não mapeado no enum-mapper.ts \t ${enumName}` });
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
        case 'AAForno':
            return getAAFornoColor(enumValue);
        case 'CLAEModoEluicao':
            return getCLAEModoEluicaoColor(enumValue);
        case 'CORTipoLeitura':
            return getCORTipoLeituraColor(enumValue);
        case 'DRXModoAnalise':
            return getDRXModoAnaliseColor(enumValue);
        case 'DRXStep':
            return getDRXStepColor(enumValue);
        case 'DSCTecnica':
            return getDSCTecnicaColor(enumValue);
        case 'DSCAtmosfera':
            return getDSCAtmosferaColor(enumValue);
        case 'FTMIRServico':
            return getFTMIRServicoColor(enumValue);
        case 'FTMIREstado':
            return getFTMIREstadoColor(enumValue);
        case 'FTMIRRegistroEspectro':
            return getFTMIRRegistroEspectroColor(enumValue);
        case 'FinanceState':
            return getFinanceStateColor(enumValue);
        default:
            Swal.fire({ title: enumValue, text: `getEnumColor: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}` });
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
        case 'AAForno':
            return getAAFornoTranslation(enumValue);
        case 'CLAEModoEluicao':
            return getCLAEModoEluicaoTranslation(enumValue);
        case 'CORTipoLeitura':
            return getCORTipoLeituraTranslation(enumValue);
        case 'DRXModoAnalise':
            return getDRXModoAnaliseTranslation(enumValue);
        case 'DRXStep':
            return getDRXStepTranslation(enumValue);
        case 'DSCTecnica':
            return getDSCTecnicaTranslation(enumValue);
        case 'DSCAtmosfera':
            return getDSCAtmosferaTranslation(enumValue);
        case 'FTMIRServico':
            return getFTMIRServicoTranslation(enumValue);
        case 'FTMIREstado':
            return getFTMIREstadoTranslation(enumValue);
        case 'FTMIRRegistroEspectro':
            return getFTMIRRegistroEspectroTranslation(enumValue);
        case 'FinanceState':
            return getFinanceStateTranslation(enumValue);
        default:
            Swal.fire({ title: enumValue, text: `getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}` });
            throw new Error(`getEnumTranslation: Enum não mapeado no enum-mapper.ts \t ${enumName},\t ${enumValue}`);
    }
}

export function locateEnumByLabel(text: any): any {
    for (const enumName of enumsRegistrados) {
        try {
            return getEnumTranslation(enumName, text);
        } catch (error) {
            // Ignore the error and continue to the next enum
        }
    }
    return text;
}
