import 'reflect-metadata';

import { ZModel } from '../../generics/zmodel';
import { ObjectUtils } from '../../utils/object-utils';

// Datatable Filter Types
// text (default)
// numeric
// boolean
// date

export function Prop(origin: 'text' | 'boolean' | 'numeric' | 'currency' | 'enum' | 'date' | ZModel
    , keys?: string[]) {
    return function (target: any, propertyKey: string) {
        let type: string = 'object';
        if (origin instanceof ZModel) {
            Reflect.defineMetadata("column:additionalcolumn", keys, target, propertyKey);
        } else {
            const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
            type = typeof (propertyType) == 'function' ? typeof (propertyType()) : propertyType;
        }

        let primitiveType: string = !!origin && typeof (origin) == 'string' ? origin : null;
        if (origin == null) {
            switch (type) {
                case 'string':
                    primitiveType = 'text';
                    break;
                case 'number':
                case 'bigint':
                    primitiveType = 'numeric'
                    break;
                case 'date':
                    primitiveType = 'date'
                    break;
                case 'boolean':
                    primitiveType = 'boolean'
                    break;
                case 'object':
                    primitiveType = 'object'
            }
        }

        Reflect.defineMetadata('design:type', type, target, propertyKey);
        Reflect.defineMetadata('primitive', primitiveType, target, propertyKey);

        const align = Reflect.getMetadata("column:align", target, propertyKey);
        if (align == null || align == undefined) {
            Reflect.defineMetadata("column:align", 'left', target, propertyKey);
        }
    };
}

export function Enum(enumName: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata("design:type", 'enum', target, key);
        Reflect.defineMetadata("enumname", enumName, target, key);
    };
}

export function Title(titulo: string, titlealign: 'left' | 'center' | 'right' = 'left') {
    return function (target: any, key: string) {
        Reflect.defineMetadata("column:title", titulo, target, key);
        Reflect.defineMetadata("column:title-align", titlealign, target, key);
    };
}

export function Hidden(ocultar?: boolean) {
    return function (target: any, key: string) {
        if (ObjectUtils.isEmpty(ocultar) || !!ocultar) {
            Reflect.defineMetadata("column:hidden", true, target, key);
        }
    };
}

export function Mask(pattern: string, column: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata("mask", pattern, target, key);
        Reflect.defineMetadata("column:mask", column, target, key);
    };
}

export function ColumnAlign(align: 'left' | 'center' | 'right') {
    return function (target: any, key: string) {
        Reflect.defineMetadata("column:align", align, target, key);
    };
}

export function ColumnMinWidth(minWidth: string, maxWidth?: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata("column:minWidth", minWidth, target, key);
        if (!!maxWidth) {
            Reflect.defineMetadata("column:maxWidth", maxWidth, target, key);
        }
    };
}

export function Debounce(delay: number = 200, name?: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const original = descriptor.value;
        const key: string = `__timeout-debounce__${!!name ? name + '__' : ''}${propertyKey}`;

        if (!!name) {
            target['name'] = name;
        }

        descriptor.value = function (...args: any) {
            const self = this as { [key: string]: any }; // Define 'self' com um index signature
            clearTimeout(self[key]);
            self[key] = setTimeout(() => original.apply(this, args), delay);
        };

        return descriptor;
    };
}

