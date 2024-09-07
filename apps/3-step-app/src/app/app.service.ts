import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { ClaimItemDto } from './claim-item.dto';
import { Food, FoodExpiresSoon, FoodToClaim } from '@3-steps/interfaces';
import { evaluateRule } from './article_condition_filter';
import { foodDatabase } from './sqlite_db';

@Injectable()
// API-Request to Schwarz-IT here
export class AppService implements OnModuleInit{

  private data: object[];

  private foodList: Food[];
  private soonExpireList: FoodExpiresSoon[] = [];
  private expiredList: FoodToClaim[];
  private wasteList: FoodToClaim[];

  private dbConnection : foodDatabase = new foodDatabase();
  
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
    onModuleInit() {
        for (const obj of this.data) {
            this.dbConnection.insertIntoDb(
                obj['id'],
                obj['name'],
                obj['expiresAt'],
                obj['price'],
                obj['weight'],
                obj['packagingUnit'],
                obj['available']
            );
        }

        console.log('Data written to database');
        this.dbConnection.getConnection().all(
            'SELECT * FROM food ',
            (_, res) => console.log(res)
            );
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

    claimItem(dto: ClaimItemDto, itemToClaim: FoodToClaim) {
        console.log(dto);

        // Find the item in the list and set claimed to true
        (this.expiredList.find((item) => item.id === itemToClaim.id)).claimed = true;

    }
}
