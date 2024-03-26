export abstract class BaseService {
    protected baseUrl: string;
    protected headers: Headers;

    protected constructor() {
        this.baseUrl = "https://localhost:7184/api/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
}