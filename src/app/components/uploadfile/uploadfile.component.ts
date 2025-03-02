import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs';

import { ToastrService } from '../../core/services/toastr.service';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { ObjectUtils } from '../../utils/object-utils';
import { CompCtrlContainer } from '../compctrl/compctrl.container';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../inputs/invalid-info/invalid-info.component';
import { Attachment } from './model/attachment.model';
import { UploadfileService } from './uploadfile.service';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'uploadfile',
    templateUrl: './uploadfile.component.html',
    styleUrl: './uploadfile.component.scss',
    providers: [
        InputBaseComponent.CONTROL(UploadfileComponent),
        CompCtrlContainer.PROVIDER(UploadfileComponent)
    ],
})
export class UploadfileComponent extends CompCtrlContainer implements ControlValueAccessor, OnDestroy {

    @ViewChild('fileupload') fileupload: FileUpload;
    @ViewChild('input') component: ElementRef<FileUpload>;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Output('onChange') onChangeEventEmitter: EventEmitter<Attachment[]> = new EventEmitter();

    private _innerValue: Attachment[] = [];
    private _disabled: boolean = null;
    private _required: boolean = false;
    public invalidCause: string[] = null;

    public uploading: Attachment[] = [];

    @Input() label: string = null;
    @Input() class: string = 'd-contents';
    @Input() size: number = 1_000_000 * 500; // 500 megas
    @Input() visualizer: boolean = true;
    @Input() uploader: boolean = true;
    @Input() multiple: boolean = true;
    @Input() bucket: string = null;
    @Input() subfolder: any = null;

    private subscriptions: Subscription[] = []

    constructor(
        private config: PrimeNGConfig,
        private service: UploadfileService,
        private toastrService: ToastrService,
        private convertUtilsService: ConvertUtilsService,
    ) {
        super();
    }

    public ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            if (!sub.closed) {
                sub.unsubscribe();
            }
        }
    }

    public onBeforeUpload(event: UploadEvent): void {
        if (ObjectUtils.isEmpty(this.bucket)) {
            alert("UploadFile sem bucket configurado");
            console.error('UploadFile sem bucket configurado', this);
        }

        let count = 0;
        for (let file of event.files) {
            if (file.size > this.size) {
                continue;
            }
            if (this.innerValue.map(it => it.fileName).includes(file.name)) {
                this.toastrService.showError(file.name, 'Arquivo já carregado!');
                continue;
            }
            count++;
            const uploadingFile = new Attachment();
            uploadingFile.fileName = file.name;
            uploadingFile.fileSize = file.size;
            uploadingFile.contentType = file.type;
            uploadingFile.upload_process = 0;
            uploadingFile.file = file;

            if (file.type.includes('image')) {
                const novoBlob: Blob = new Blob([file], { type: file.type });
                uploadingFile.url = URL.createObjectURL(novoBlob);
            }
            this.uploading.push(uploadingFile);
            this.subscriptions.push(
                this.service.postFile(file, this.bucket, this.subfolder?.toString()).subscribe((event) => {
                    const subindo: Attachment = this.uploading.find(it => it.fileName == file.name);
                    if (subindo) {
                        if (event.type === HttpEventType.UploadProgress && event.total) {
                            subindo.upload_process = Math.round(100 * event.loaded / event.total);
                        }
                    }
                    if (event instanceof HttpResponse) {
                        if (ObjectUtils.isEmpty(this.innerValue)) {
                            this.innerValue = [];
                        }
                        this.innerValue.push(event.body);
                        this.uploading = this.uploading.filter(it => it.fileName != file.name);
                        this.onRowReorder();
                    };
                })
            );
        }
        if (count > 0) {
            this.toastrService.showSuccess('Seleção de Arquivos', `${count} arquivos carregados com sucesso`);
        } else {
            this.toastrService.showWarn('Seleção de Arquivos', `Nenhum arquivo foi carregado`);
        }
    }

    public getFileIcon(anexo: Attachment) {
        if (anexo.contentType) {
            const fileType = anexo.contentType.split('/')[0];
            const contentType = anexo.contentType;
            if (contentType == null || '' == contentType.trim()) {
                return 'far fa-file';
            }
            switch (fileType) {
                case 'audio':
                    return 'fa fa-file-audio';
                case 'application':
                    if (contentType.includes('zip') || contentType.includes('compressed') || contentType.includes('tar') || contentType.includes('rar')) {
                        return 'fa fa-file-archive';
                    } else if (contentType.includes('msword') || contentType.includes('officedocument.word') || contentType.includes('opendocument.text')) {
                        return 'fa fa-file-word';
                    } else if (contentType.includes('powerpoint') || contentType.includes('presentation')) {
                        return 'fa fa-file-powerpoint';
                    } else if (contentType.includes('excel') || contentType.includes('spreadsheet')) {
                        return 'fa fa-file-excel';
                    } else if (contentType.includes('pdf')) {
                        return 'fa fa-file-pdf';
                    }
                    break;
                case 'video':
                    return 'fa fa-file-video';
                case 'text':
                    return 'fa fa-file-alt';
                case 'image':
                    return 'fa fa-file-image';
            }
        }
        return 'fa fa-file';
    }

    onRowReorder(): void {
        if (ObjectUtils.isNotEmpty(this.innerValue) && this.innerValue.length > 1) {
            for (let i = 0; i < this.innerValue.length; i++) {
                this.innerValue[i].index = i;
            }
        }
    }

    removeFile(event: any, index: number) {
        this.innerValue.splice(index, 1);
    }

    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.config.translation.fileSizeTypes;
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }

    // Função chamada quando o valor interno muda
    private onChange: (value: any) => void = () => { };

    // Função chamada quando o componente é tocado (tocado no DOM)
    private onTouched: () => void = () => { };

    // Registra a função a ser chamada quando o valor interno muda
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    // Registra a função a ser chamada quando o componente é tocado
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    // Obtém o valor do modelo
    get innerValue(): Attachment[] {
        return this._innerValue;
    }

    // Define o valor do modelo e chama a função de callback
    set innerValue(value: Attachment[]) {
        if (value !== this.innerValue) {
            this._innerValue = value;
            this.onChange(value);
            this.onChangeEventEmitter.emit(value);
        }
    }

    private internalDisabled: boolean = null;
    @Input() set disabled(value: any) {
        let savePermanentDisabledState;
        if (this.disabled == null) {
            savePermanentDisabledState = true;
        }
        this._disabled = this.convertUtilsService.getBoolean(value, false);
        if (savePermanentDisabledState) {
            this.internalDisabled = this._disabled;
        }
    }
    get disabled() {
        if (this.internalDisabled != null) {
            return this.internalDisabled
        }
        return this._disabled;
    }

    @Input() set required(value: any) {
        this._required = this.convertUtilsService.getBoolean(value, false);
    }
    get required() {
        return this._required;
    }

    // Escreve o valor do modelo para o componente
    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    public addClass(value: string) {
        const classes: string[] = this.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == value) {
                return;
            }
        }
        classes.push(value);
        this.class = classes.join(' ');
    }

    public removeClass(value: string) {
        const classes: string[] = this.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == value) {
                classes.splice(i, 1);
                break;
            }
        }
        this.class = classes.join(' ');
    }

    override setDisabledState(value: boolean): void {
        this.disabled = value;
    }

    override setRequiredState(value: boolean): void {
        this.required = value;
    }

    override getValue(): any {
        return this.innerValue;
    }

    override getLabel(): string {
        return null;
    }

    override validate(): string[] {
        const causes: string[] = [];
        return causes;
    }

    override setInvalidCause(value: string[]): void {
        this.invalidCause = value;
    }

    override getContainer(): any {
        return this.component.nativeElement;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            (this.component.nativeElement as any).focus();
        });
    }
}
