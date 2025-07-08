import { ZModel } from '../../../generics/zmodel';
import { SolicitationForm } from './solicitation-form.model';


export class SolicitationFormGradiente extends ZModel {

    public static override createInstance(): SolicitationFormGradiente {
        return new SolicitationFormGradiente();
    }

    form: SolicitationForm = null
    index: number = null;
    tempo: number = null;
    fluxo: number = null;
    solventeA: number = null;
    solventeB: number = null;

}
