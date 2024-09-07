import { Module } from '@nestjs/common';

import { SoonExpireController, ExpiredController, WasteController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [SoonExpireController, ExpiredController, WasteController],
    providers: [AppService],
})
export class AppModule {}
