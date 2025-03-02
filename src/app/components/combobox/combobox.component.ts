import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

import { Debounce } from '../../core/decorators/decorators';
import { getEnum, getEnumTranslation } from '../../core/enums/enum-mapper';
import { ZModel } from '../../generics/zmodel';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { ObjectUtils } from '../../utils/object-utils';
import { CompCtrlContainer } from '../compctrl/compctrl.container';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../inputs/invalid-info/invalid-info.component';

@Component({
    selector: 'combobox',
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.scss',
    providers: [
        InputBaseComponent.CONTROL(ComboboxComponent),
        CompCtrlContainer.PROVIDER(ComboboxComponent)
    ],
})
export class ComboboxComponent extends CompCtrlContainer implements ControlValueAccessor {

    @ViewChild('input') component: Dropdown;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() id: string = Guid.raw();
    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() placeholder: string = null;
    @Input() class: string = 'w-100';
    @Input() defaultValue: string = null;
    @Input() filterBy: string = null;
    @Input() columns: string = null;
    // @Input() optionLabel: string = 'value';

    @Input('showClear') showClear: boolean = true;

    @Output('onChange') onChangeEventEmitter: EventEmitter<any> = new EventEmitter();

    public displayValue: string = null;
    public mappedDisplayValues: Map<any, string> = new Map();

    private _innerObject: any;
    private _innerValue: string = null;
    private _disabled: boolean = null;
    private _required: boolean = false;
    public invalidCause: string[] = null;
    public _enum: string = null;
    public _options: any[] = [];

    @Input('enum') set enum(name: string) {
        this._enum = name;
        const enu = getEnum(name);
        for (const key in enu) {
            this._options.push({ key: key, value: getEnumTranslation(name, key) })
            this.mappedDisplayValues.set(key, getEnumTranslation(name, key));
        }
    }

    @Input('options') set options(options: ZModel[]) {
        this._options = options;
        this.mappedDisplayValues = new Map();
        for (const option of options) {
            let texto: string = (this.columns || this.filterBy).split(',')
                .map(field => this.getFieldValue(option, field))
                .filter(field => ObjectUtils.isNotEmpty(field))
                .join(' - ');
            this.mappedDisplayValues.set(option.id, texto);
        }
        this.onChangeDropdown(this.defaultValue);
    }

    constructor(protected readonly convertUtilsService: ConvertUtilsService) {
        super();
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

    private internalDisabled: boolean = null;
    @Input() set disabled(value: any) {
        this._disabled = this.convertUtilsService.getBoolean(value, true);
    }

    get disabled() {
        if (this.internalDisabled != null) {
            return this.internalDisabled || this._disabled;
        }
        return this._disabled;
    }

    @Input() set required(value: any) {
        this._required = this.convertUtilsService.getBoolean(value, false);
    }
    get required() {
        return this._required;
    }

    get innerObject(): any {
        return this._innerObject;
    }

    private getFieldValue(object: any, fieldPath: string): string {
        const fields = fieldPath.split('.');

        let value = object;
        for (const field of fields) {
            if (ObjectUtils.isEmpty(value[field])) {
                return '';
            }
            value = value[field];
        }
        return String(value);
    }

    public getMapDisplay(object: any) {
        if (!!this._enum) {
            return this.mappedDisplayValues.get(object?.key)
        } else {
            return this.mappedDisplayValues.get(object?.id)
        }
    }

    set innerObject(value: any) {
        if (value !== this.innerObject) {
            this._innerObject = value;
            if (!!this._enum) {
                this.innerValue = value?.key;
                this.displayValue = this.mappedDisplayValues.get(value?.key);
            } else {
                const texto = !!value && !!value.id ? this.mappedDisplayValues.get(value.id) : null;
                if (ObjectUtils.isEmpty(texto)) {
                    this._innerObject = null;
                    this.innerValue = null;
                } else {
                    this.displayValue = texto;
                    this.innerValue = value;
                }
            }
        }
    }

    // Obtém o valor do modelo
    get innerValue(): any {
        return this._innerValue;
    }

    // Define o valor do modelo e chama a função de callback
    set innerValue(value: any) {
        if (value !== this.innerValue) {
            this._innerValue = value;
            this.onChange(value);
            this.onChangeEventEmitter.emit(value);
        }
    }

    public onChangeDropdown(value: any): void {
        if (ObjectUtils.isEmpty(value)) {
            this.innerObject = null;
        } else {
            if (!!this._enum) {
                this.innerObject = this._options.find(it => it.key == value.key);
            } else {
                this.innerObject = this._options.find(it => it.id == value.id);
            }
        }
    }

    @Debounce(100)
    writeValue(value: any): void {
        if (value !== this.innerObject) {
            if (this._options.length == 0) {
                setTimeout(() => {
                    this.writeValue(value);
                    return;
                }, 100);
            }
            if (!!this._enum) {
                if (typeof (value) == 'string') {
                    let val = this._options.find(it => it.key == value);
                    if (val == undefined) {
                        val = this._options.find(it => it.value == value);
                    }
                    this.innerObject = val;
                } else {
                    this.innerObject = value;
                }
            } else {
                if (!!value && !!value.id) {
                    if (this._options.length == 0) {
                        this.defaultValue = value.id;
                    } else {
                        let val = this._options.find(it => it.id == value.id);
                        if (!!val) {
                            this.innerObject = val;
                        }
                    }
                } else {
                    this.innerObject = null;
                }
            }
        }
        if (!!this.defaultValue) {
            if (!!this._enum) {
                let val = this._options.find(it => it.key == this.defaultValue);
                if (val == undefined) {
                    val = this._options.find(it => it.value == this.defaultValue);
                }
                this.innerObject = val;
            } else {
                let val = this._options.find(it => String(it.id) == this.defaultValue);
                if (!!val) {
                    this.innerObject = val;
                }
            }
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
        this.internalDisabled = value;
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

    override validate(): string[] {
        const causes: string[] = [];
        return causes;
    }

    override setInvalidCause(value: string[]): void {
        this.invalidCause = value;
    }

    public forceClear(): void {
        this.innerObject = null;
        this.innerValue = null;
    }

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            this.component.focus();
        });
    }

}
