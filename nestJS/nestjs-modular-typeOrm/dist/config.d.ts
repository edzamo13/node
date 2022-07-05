declare const _default: (() => {
    database: {
        name: string;
        port: string;
    };
    postgres: {
        dbName: string;
        port: number;
        password: string;
        user: string;
        host: string;
    };
    apiKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost;
export default _default;
