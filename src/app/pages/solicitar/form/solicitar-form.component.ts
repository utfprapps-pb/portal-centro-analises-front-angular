import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { SolicitationProjectNature } from '../../../core/enums/solicitation-project-nature.enum';
import { Solicitation } from '../model/solicitation.model';
import { SolicitarService } from '../solicitar.service';


@Component({
    selector: 'SolicitarFormComponent',
    templateUrl: './solicitar-form.component.html',
    styleUrl: './solicitar-form.component.scss'
})
export class SolicitarFormComponent extends FormCrud<Solicitation> {

    @ViewChild('formView') public formView: FormCrudComponent;
    public activeStep: number = 0;

    public solicitationProjectNature: SolicitationProjectNature = null;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitarService,
    ) {
        super(injector, service);
    }

    public override showButtons(button: string): boolean {
        return ['cancelar'].indexOf(button) != -1;
    }


}
