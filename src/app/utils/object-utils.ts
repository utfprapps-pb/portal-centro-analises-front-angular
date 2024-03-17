export abstract class ObjectUtils {

    public static isNotEmpty(value: any): boolean {
        return !ObjectUtils.isEmpty(value);
    }

    public static isEmpty(value: any): boolean {
        const mappedTypes: string[] = ['Array'];
        return (
            value == null || (
                (value.constructor.name == 'Array' && value != null && value.length == 0) ||
                (value.constructor.name != null && !mappedTypes.includes(value.constructor.name) && ('' + value).trim().length == 0)
            )
        )
    }

}
