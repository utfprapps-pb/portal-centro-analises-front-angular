import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { CompCtrlContainer } from '../../core/directives/compctrl/compctrl.container';
import { getEnum, getEnumTranslation } from '../../core/enums/enum-mapper';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { ObjectUtils } from '../../utils/object-utils';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'radio-button',
    templateUrl: './radiobutton.component.html',
    styleUrl: './radiobutton.component.scss',
    providers: [
        InputBaseComponent.CONTROL(RadioButtonComponent),
        CompCtrlContainer.PROVIDER(RadioButtonComponent)
    ],
})
export class RadioButtonComponent extends InputBaseComponent {

    @ViewChild('input') component: ElementRef<HTMLDivElement>;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() override class: string = 'field-checkbox d-flex';
    @Input() vertical: boolean = true;
    @Input() ignore: string = null;
    @Input() disables: string = null;

    private _innerObject: any;
    public _options: any[] = []

    @Input('options') set options(value: any[]) {
        if (ObjectUtils.isNotEmpty(value)) {
            this._options = value.map(it => ({
                guid: Guid.raw(),
                key: it.value,
                value: it.label
            }));
        }
    }

    @Input('enum') set enum(name: string) {
        this._options = [];
        const enu = getEnum(name);
        for (const key in enu) {
            this._options.push({ guid: Guid.raw(), key: key, value: getEnumTranslation(name, key) })
        }
    };

    get options(): any[] {
        if (ObjectUtils.isEmpty(this.ignore)) {
            return this._options;
        }
        return this._options.filter(it => !this.ignore.split(',').includes(it.key))
    }

    public isOptionDisabled(option: any): boolean {
        return this.disabled || (ObjectUtils.isNotEmpty(this.disables) && this.disables.split(',').includes(option.key));
    }

    constructor(protected override readonly convertUtilsService: ConvertUtilsService) {
        super(convertUtilsService);
    }

    get innerObject(): any {
        return this._innerObject;
    }

    set innerObject(value: any) {
        if (value !== this.innerObject) {
            this._innerObject = value;
            this.innerValue = value?.key;
        }
    }

    // Escreve o valor do modelo para o componente
    override writeValue(value: any): void {
        if (value !== this.innerObject) {
            if (typeof (value) == 'string') {
                let val = this._options.find(it => it.key == value);
                if (val == undefined) {
                    val = this._options.find(it => it.value == value);
                }
                this.innerObject = val;
            } else {
                this.innerObject = value;
            }
        }
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
        return this.label;
    }

    override forceClear(): void {
        this._innerObject = null;
        this.innerValue = null;
    }

    override getContainer(): any {
        return this.component.nativeElement.firstChild;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            const input = this.component.nativeElement.querySelector('input')
            if (input) input.focus();
        });
    }
}
