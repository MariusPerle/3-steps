import { Injectable } from '@nestjs/common';

@Injectable()
// API-Request to Schwarz-IT here
export class AppService {
    getData(): { message: string } {
        return { message: 'Hello API' };
    }
}
