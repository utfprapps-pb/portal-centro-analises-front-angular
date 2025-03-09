import { ZModel } from '../../../generics/zmodel';
import { TermsOfUse } from '../../termsofuse/model/termsofuse.model';
import { Solicitation } from './solicitation.model';

export class SolicitationTermsOfUse extends ZModel {

    public static override createInstance(): SolicitationTermsOfUse {
        return new SolicitationTermsOfUse();
    }

    termofuse: TermsOfUse = null;
    solicitation: Solicitation = null;
    accepted: boolean = false;

}
