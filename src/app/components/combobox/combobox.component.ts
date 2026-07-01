import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

import { Debounce } from '../../core/decorators/decorators';
import { CompCtrlContainer } from '../../core/directives/compctrl/compctrl.container';
import { getEnum, getEnumTranslation, locateEnumByLabel } from '../../core/enums/enum-mapper';
import { ZModel } from '../../generics/zmodel';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { ObjectUtils } from '../../utils/object-utils';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'combobox',
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.scss',
    providers: [
        InputBaseComponent.CONTROL(ComboboxComponent),
        CompCtrlContainer.PROVIDER(ComboboxComponent)
    ],
})
export class ComboboxComponent extends InputBaseComponent{

    @ViewChild('input') component: Dropdown;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() defaultValue: string = null;
    @Input() filterBy: string = null;
    @Input() columns: string = null;
    @Input() filterOptions: (options: any[]) => any[];
    // @Input() optionLabel: string = 'value';

    public displayValue: string = null;
    public mappedDisplayValues: Map<any, string> = new Map();

    private _innerObject: any;
    public _enum: string = null;
    public _options: any[] = [];

    constructor(protected override readonly convertUtilsService: ConvertUtilsService) {
        super(convertUtilsService);
    }

    @Input('enum') set enum(name: string) {
        this._enum = name;
        const enu = getEnum(name);
        for (const key in enu) {
            this._options.push({ key: key, value: getEnumTranslation(name, key) });
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


    get opcoesFiltradas(): any[] {
        let opcoes = this._options
        if (this._enum && this.filterOptions) {
            opcoes = this.filterOptions(this._options);
            for (const option of opcoes) {
                this.mappedDisplayValues.set(option.key, getEnumTranslation(this._enum, option.key));
            }
        }
        return opcoes;
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
            if (typeof (value[field]) == 'string' && (value[field] == (value[field].toUpperCase()))) {
                value = locateEnumByLabel(value[field]);
            } else {
                value = value[field];
            }
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
    override writeValue(value: any): void {
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
    
    override setDisabledState(value: boolean): void {
        if (this.class?.includes('not-disabled') && value) {
            value = false;
        }
        this.internalDisabled = value;
    }

    override forceClear(): void {
        this.innerObject = null;
        this.innerValue = null;
    }

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            this.component.focus();
        });
    }

}
