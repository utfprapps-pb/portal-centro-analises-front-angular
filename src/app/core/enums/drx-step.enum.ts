export enum DRXStep {
    _002 = '0,02',
    _005 = '0,05',
}

export function getDRXStepColor(value: '_002' | '_005') {
    return '#b1b1b1';
}

export function getDRXStepTranslation(value: '_002' | '_005') {
    return DRXStep[value];
}
