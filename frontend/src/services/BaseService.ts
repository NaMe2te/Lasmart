export abstract class BaseService {
    protected baseUrl: string;
    protected headers: Headers;

    protected constructor() {
        this.baseUrl = "";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
}