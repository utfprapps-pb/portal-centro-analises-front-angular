export class ReportCardModel {

    public id?: number;
    public title: string;
    public description?: string;
    public icon?: string = 'far fa-file-lines';
    public color?: string = '#007bff';
    public visible?: boolean;
    public onClick: () => void;

}
