import { SpringSort } from './spring-sort';

export class SpringPageable {

    offset: number = null;
    pageNumber: number = null;
    paged: boolean = false;
    sort: SpringSort = new SpringSort();

}
