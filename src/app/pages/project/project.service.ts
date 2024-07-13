import { Injectable } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { Project } from './model/project.model';


@Injectable({
    providedIn: 'root'
})
export class ProjectService extends GenericCrudService<Project> {

    constructor(
        protected override http: HttpClientService,
        protected readonly authentication: AuthService,
    ) {
        super(http, '/projetos', Project)
    }

}
