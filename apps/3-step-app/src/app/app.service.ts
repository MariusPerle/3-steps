import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ClaimItemDto } from './claim-item.dto';
import { Food, FoodExpiresSoon, FoodToClaim } from '@3-steps/interfaces';
import { evaluateRule } from './article_condition_filter';

@Injectable()
// API-Request to Schwarz-IT here
export class AppService {

  private data: object[];

  private foodList: Food[];

  private soonExpireList: FoodExpiresSoon[] = [];
  private expiredList: Food[];
  private wasteList: Food[];

  
  convertJsonObjToFood(json: any): Food {
    return new Food(
      json.id,
      json.name,
      json.expiresAt,
      json.price,
      json.weight,
      json.available
    );
  }

  // Converts an array of JSON objects into an array of Food instances
  convertJsonArrayToFoodList(jsonArray: object[]) {
    this.foodList = jsonArray.map((json) => this.convertJsonObjToFood(json));
  }

  constructor() {
    this.data = JSON.parse(
      fs.readFileSync('articles.json', 'utf-8')
    );

    this.convertJsonArrayToFoodList(this.data);

    let today = new Date(2024,8,16);

    this.soonExpireList = this.foodList
      .filter((food) => evaluateRule(food, today) === 'soon')
      .map((food) => ({
        ...food,
        discountInPercent: 50 // or any logic to determine the discount
      } as FoodExpiresSoon));

    this.expiredList = this.foodList
    .filter((food) => evaluateRule(food, today) === 'expired')
    .map((food) => ({
        ...food,
        claimed: false
    } as FoodToClaim));

    this.wasteList = this.foodList
    .filter((food) => evaluateRule(food, today) === 'waste')
    .map((food) => ({
        ...food,
        claimed: false
    } as FoodToClaim));
  }

    getData(): object {
        return this.data;
    }

    getSoonExpireList(): Food[] {
        return this.soonExpireList;
    }

    getExpiredList(): Food[] {
        return this.expiredList;
    }

    getWasteList(): Food[] {
        return this.wasteList;
    }

    claimItem(dto: ClaimItemDto) {
        console.log(dto);



    }
}
