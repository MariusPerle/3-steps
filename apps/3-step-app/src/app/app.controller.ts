import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ClaimItemDto } from './claim-item.dto';
import { ApiResponse } from '@nestjs/swagger';
import { FoodExpiresSoon, FoodToClaim } from '@3-steps/interfaces';
import { BundleService } from './bundle.service';

@Controller('Soon')
export class SoonExpireController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: FoodExpiresSoon })
    async getSoonExpireData() {
        // Return JSON here
        return await this.appService.getSoonExpireList();
    }
}

@Controller('Now')
export class ExpiredController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ type: FoodToClaim })
    async getExpiredData() {
        return await this.appService.getExpiredList();
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
    async getWasteData() {
        return await this.appService.getWasteList();
    }

    @Post('claim')
    claimItem(@Body() dto: ClaimItemDto, itemToClaim: FoodToClaim) {
        this.appService.claimItem(dto, itemToClaim);
    }
}

@Controller('receips')
export class ReceipeController {
  constructor(private readonly appService: AppService, private readonly bundleService: BundleService) {}

  @Get()
  async getReceipes() {
    return await this.bundleService.getBundles(
      await this.appService.getSoonExpireList()
    );
  }

}
