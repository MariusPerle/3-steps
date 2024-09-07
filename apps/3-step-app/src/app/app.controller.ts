import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ClaimItemDto } from './claim-item.dto';

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

    @Post("claim")
    claimItem(@Body() dto: ClaimItemDto) {
      this.appService.claimItem(dto)

    }
}
