export interface PaginatedInterface<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };
}
/* 

newUrl URL {
  href: 'http://localhost:3000/tweet?limit=2&page=2',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/tweet',
  search: '?limit=2&page=2',
  searchParams: URLSearchParams { 'limit' => '2', 'page' => '2' },
  hash: ''
}
*/
