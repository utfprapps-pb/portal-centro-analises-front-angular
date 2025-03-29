import { ZModel } from '../../../generics/zmodel';

export class SolicitationAmostraFoto extends ZModel {

    public static override createInstance(): SolicitationAmostraFoto {
        return new SolicitationAmostraFoto();
    }

    aproximacoes: number = null;
    qtdFotosAproximacao: number = null;

}
