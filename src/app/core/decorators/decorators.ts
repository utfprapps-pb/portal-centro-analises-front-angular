import 'reflect-metadata';

// Datatable Filter Types
// text (default)
// numeric
// boolean
// date

export function Prop(origin: 'text' | 'numeric' | 'currency' | 'enum' | 'date') {
    return function (target: any, propertyKey: string) {
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        const type: string = typeof (propertyType) == 'function' ? typeof (propertyType()) : propertyType;

        let primitiveType: string = !!origin ? origin : null;
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
    };
}


export function Enum(enumName: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata("design:type", 'enum', target, key);
        Reflect.defineMetadata("enumname", enumName, target, key);
    };
}

