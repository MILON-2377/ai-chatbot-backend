import status from "http-status";



export default class AppResponse<T> {
    public readonly message: string;
    public readonly data?: T;
    public readonly statusCode: number;
    public readonly meta?: Record<string, any>;


    constructor(statusCode: number, message: string, data?: T,
        meta?: Record<string, any>
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

        this.meta = meta;
    }


    static ok<T>(data: T, message = "Success", meta?: Record<string, any>): AppResponse<T> {
        return new AppResponse<T>(status.OK, message, data, meta);
    }


    static created<T>(data: T, message = "Resource created successfully"): AppResponse<T> {
        return new AppResponse<T>(status.CREATED, message, data);
    }

    static nonContent(message = "No Content"): AppResponse<never> {
        return new AppResponse<never>(status.NO_CONTENT, message);
    }

}