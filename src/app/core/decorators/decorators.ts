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
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        const type: string = typeof (propertyType) == 'function' ? typeof (propertyType()) : propertyType;

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
                    throw new Error("Type object not mapped decorators.ts")
            }
        }

        Reflect.defineMetadata('design:type', type, target, propertyKey);
        Reflect.defineMetadata('primitive', primitiveType, target, propertyKey);

        if (ObjectUtils.isEmpty(Reflect.getMetadata("column:align", target, propertyKey))) {
            Reflect.defineMetadata("column:align", 'left', target, propertyKey);
        }
        if (origin instanceof ZModel) {
            console.log('zmodel', target);
            // Reflect.defineMetadata('columns', primitiveType, target, propertyKey);
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

export function Hidden() {
    return function (target: any, key: string) {
        Reflect.defineMetadata("column:hidden", true, target, key);
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



