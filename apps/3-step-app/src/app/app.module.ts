import { Module } from '@nestjs/common';

import { SoonExpireController, ExpiredController, WasteController, ReceipeController } from './app.controller';
import { AppService } from './app.service';
import { BundleService } from './bundle.service';

@Module({
    imports: [],
    controllers: [SoonExpireController, ExpiredController, WasteController, ReceipeController],
    providers: [AppService, BundleService],
})
export class AppModule {}
