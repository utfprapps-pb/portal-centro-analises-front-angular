import { SpringPageable } from './spring-pageable';
import { SpringSort } from './spring-sort';

export class SpringPage<T> {

    content: any[] | T[] = []
    empty: boolean = false;
    first: boolean = false;
    last: boolean = false;
    number: number = null;
    numberOfElements: number = null;
    pageable: SpringPageable = new SpringPageable();
    size: number = null;
    sort: SpringSort = new SpringSort();
    totalElements: number = null;
    totalPages: number = null;

}
