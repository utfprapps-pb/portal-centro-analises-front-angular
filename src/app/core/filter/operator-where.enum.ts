export enum OperatorWhere {
    CONTAINS = "contains",
    EQUALS = "equals",
    NOTEQUALS = "notEquals",
    LT = "lt",
    LTE = "lte",
    GT = "gt",
    GTE = "gte",
}


export function operatorWhereObject(value: OperatorWhere): { operator: OperatorWhere, text: string, icon: string } {
    switch (value) {
        case OperatorWhere.CONTAINS:
            return { operator: OperatorWhere.CONTAINS, text: 'Contém', icon: 'fa-layer-group' };
        case OperatorWhere.EQUALS:
            return { operator: OperatorWhere.EQUALS, text: 'Igual', icon: 'fa-equals' };
        case OperatorWhere.NOTEQUALS:
            return { operator: OperatorWhere.NOTEQUALS, text: 'Diferente', icon: 'fa-not-equal' };
        case OperatorWhere.LT:
            return { operator: OperatorWhere.LT, text: 'Menor', icon: 'fa-less-than' };
        case OperatorWhere.LTE:
            return { operator: OperatorWhere.LTE, text: 'Menor Igual', icon: 'fa-less-than-equal' };
        case OperatorWhere.GT:
            return { operator: OperatorWhere.GT, text: 'Maior', icon: 'fa-greater-than' };
        case OperatorWhere.GTE:
            return { operator: OperatorWhere.GTE, text: 'Maior Igual', icon: 'fa-greater-than-equal' };
    }
}
