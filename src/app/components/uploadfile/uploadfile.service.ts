import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from './../../core/services/httpclient.service';
import { Attachment } from './model/attachment.model';


@Injectable({
    providedIn: 'root'
})
export class UploadfileService {

    constructor(
        private http: HttpClient,
        private httpClientService: HttpClientService,
    ) { }


    public postFile(file: File, bucket: string): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('bucket', bucket)
        return this.http.post<HttpEvent<any>>('/minio/upload', formData, {
            headers: {
                'Content-Disposition': 'attachment'
            },
            observe: 'events',
            reportProgress: true
        });
    }

    public getUrl(attachemnt: Attachment): Promise<string> {
        return this.httpClientService.getReturnText(`/minio/url/${attachemnt.bucket}/${attachemnt.fileHash}`);
    }

}
