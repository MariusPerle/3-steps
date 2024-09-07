import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ClaimItemDto } from './claim-item.dto';
import { ApiResponse } from '@nestjs/swagger';
import { FoodExpiresSoon, FoodToClaim } from '@3-steps/interfaces';

@Controller('Soon')
export class SoonExpireController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: FoodExpiresSoon })
    getSoonExpireData() {
        // Return JSON here
        return this.appService.getSoonExpireList();
    }
}

@Controller('Now')
export class ExpiredController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: FoodToClaim })
    getExpiredData() {
        return this.appService.getExpiredList();
    }

    @Post('claim')
    claimItem(@Body() dto: ClaimItemDto, itemToClaim: FoodToClaim) {
        this.appService.claimItem(dto, itemToClaim);
    }
}

@Controller('Waste')
export class WasteController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: FoodToClaim })
    getWasteData() {
        return this.appService.getWasteList();
    }

    @Post('claim')
    claimItem(@Body() dto: ClaimItemDto, itemToClaim: FoodToClaim) {
        this.appService.claimItem(dto, itemToClaim);
    }
}
