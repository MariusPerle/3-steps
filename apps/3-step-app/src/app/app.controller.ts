import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller("Soon")
export class SoonExpireController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getSoonExpireData() {

        // Return JSON here
        return this.appService.getData();
    }
}

@Controller("Now")
export class ExpiredController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getExpiredData() {
        return this.appService.getData();
    }
}

@Controller("Waste")
export class WasteController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getWasteData() {
        return this.appService.getData();
    }
}