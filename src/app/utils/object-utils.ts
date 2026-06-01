export abstract class ObjectUtils {

    public static isNotEmpty(value: any): boolean {
        return !ObjectUtils.isEmpty(value);
    }

    public static isEmpty(value: any): boolean {
        const mappedTypes: string[] = ['Array', 'Object'];
        return (
            value == null || value == undefined || (
                (value.constructor.name == 'Array' && value != null && value.length == 0) ||
                (value.constructor.name == 'Object' && Object.keys(value).length == 0) ||
                (value.constructor.name != null && !mappedTypes.includes(value.constructor.name) && ('' + value).trim().length == 0)
            )
        )
    }

    //Comparar dois valores
    public static equals(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true;

        if (obj1 instanceof Date && obj2 instanceof Date) {
            return obj1.getTime() === obj2.getTime();
        }

        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) return false;
            for (let i = 0; i < obj1.length; i++) {
                if (!this.equals(obj1[i], obj2[i])) return false;
            }
            return true;
        }

        if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);

            if (keys1.length !== keys2.length) return false;

            for (const key of keys1) {
                if (!keys2.includes(key) || !this.equals(obj1[key], obj2[key])) return false;
            }
            return true;
        }

        return false;
    }

}
