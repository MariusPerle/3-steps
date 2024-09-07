import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ClaimItemDto } from './claim-item.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Food, FoodExpiresSoon } from '@3-steps/interfaces';

@Controller('Soon')
export class SoonExpireController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: Food })
    getSoonExpireData() {
        // Return JSON here
        return this.appService.getSoonExpireList();
    }
}

@Controller('Now')
export class ExpiredController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: Food })
    getExpiredData() {
        return this.appService.getExpiredList();
    }
}

@Controller('Waste')
export class WasteController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: Food })
    getWasteData() {
        return this.appService.getWasteList();
    }

    @Post('claim')
    claimItem(@Body() dto: ClaimItemDto) {
        this.appService.claimItem(dto);
    }
}
