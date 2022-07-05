import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';
export declare class AppService {
    private clientePG;
    private tasks;
    private configService;
    constructor(clientePG: Client, tasks: any[], configService: ConfigType<typeof config>);
    getHello(): string;
    getTasks(): Promise<unknown>;
}
