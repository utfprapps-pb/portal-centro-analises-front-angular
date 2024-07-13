import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../../components/form-list/form-list';
import { FormListComponent } from '../../../../components/form-list/form-list.component';
import { DialogService } from '../../../../core/services/dialog.service';
import { StudentTeacher } from '../model/studentteacher.model';
import { StudentTeacherService } from '../studentteacher.service';
import { Dialog } from './../../../../core/services/dialog.service';


@Component({
    selector: 'StudentTeacherListComponent',
    templateUrl: './studentteacher-list.component.html',
    styleUrl: './studentteacher-list.component.scss'
})
export class StudentTeacherListComponent extends FormList<StudentTeacher> {

    @ViewChild('formView') public formView: FormListComponent<StudentTeacher>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    public objects: any[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: StudentTeacherService,
        protected readonly dialogService: DialogService,
    ) {
        super(injector, service);
    }

    public onClickApproveRefuse(data: StudentTeacher): void {
        const dialog: Dialog = new Dialog();
        dialog.showCancelButton = true;
        dialog.showDenyButton = true;

        dialog.title = 'Aprovar vínculo?';
        dialog.html = `Você tem certeza que deseja aceitar <b>${data.student.name}</b> como seu Orientando?`;
        this.dialogService.open(dialog).then((response: boolean) => {
            if (response != null) {
                this.service.updateBindStatus(data, response).then(() => {
                    if (response) {
                        this.toastrService.showSuccess(this.pageTitle, "Vínculo Aceito com Sucesso!");
                    } else {
                        this.toastrService.showSuccess(this.pageTitle, "Vínculo Recusado com Sucesso!");
                    }
                    this.formViewDatatable.onClickRefresh();
                }, (error: any) => {
                    if (this.hasErrorMapped(error)) {
                        this.errorHandler(error);
                    } else {
                        this.toastrService.showError(this.pageTitle, 'Erro ao Aceitar/Recusar solicitação de Vínculo');
                    }
                }).finally(() => this.releaseForm());
            }
        })
    }

}
