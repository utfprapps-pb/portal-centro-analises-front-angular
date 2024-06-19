import { Injectable } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { HttpClientService } from '../../../core/services/httpclient.service';
import { GenericCrudService } from '../../../generics/generic-crud.service';
import { StudentTeacher } from './model/studentteacher.model';

@Injectable({
    providedIn: 'root'
})
export class StudentTeacherService extends GenericCrudService<StudentTeacher> {

    constructor(
        protected override http: HttpClientService,
        protected readonly authentication: AuthService,
    ) {
        super(http, '/vinculos', StudentTeacher)
    }

    public updateBindStatus(bind: StudentTeacher, result: boolean): Promise<any> {
        return this.http.post(`${this.path}/update/${bind.id}`, result);
    }

}
