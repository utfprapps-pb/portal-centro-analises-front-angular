export class DatatableColumn {

    header: string = null;
    headerAlign: string = 'left';

    order: number = null;
    field: string = null;
    type: string = null;
    enumname: string = null;
    mask: string = null;
    width: string = null;
    minWidth: string = '200px';
    maxWidth: string = null;
    align: 'left' | 'center' | 'right' = 'left';

}
