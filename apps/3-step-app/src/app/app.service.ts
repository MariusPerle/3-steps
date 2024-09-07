import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ClaimItemDto } from './claim-item.dto';
import { Food, FoodExpiresSoon } from '@3-steps/interfaces';
import { evaluateRule } from './article_condition_filter';

@Injectable()
// API-Request to Schwarz-IT here
export class AppService {

  private data: object[];

  private foodList: Food[];

  soonExpireList: Food[];
  expiredList: Food[];
  wasteList: Food[];

  
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

    this.soonExpireList = this.foodList.filter(
      (food) => evaluateRule(food, new Date()) === 'soon'
    );

    this.expiredList = this.foodList.filter(
      (food) => evaluateRule(food, new Date()) === 'expired'
    );

    this.wasteList = this.foodList.filter(
      (food) => evaluateRule(food, new Date()) === 'waste'
    );
  }

    getData(): object {
        return this.data;
    }

    getSoonTooExpireList(): Food[] {
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
