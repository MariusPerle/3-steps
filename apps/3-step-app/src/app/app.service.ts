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

  private today: Date = new Date(2024,8,16);

  private foodList: Food[];
  //private soonExpireList: FoodExpiresSoon[] = [];
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

        // set discount for all soon-to-expire products
        const query = "SELECT * FROM food";
        // Use db.all to retrieve all results
        this.dbConnection.getConnection().all(query, [], (err, rows) => {
            if (err) {
                console.error("Error fetching data:", err.message);
                return;
            }

            // Iterate over the retrieved rows
            rows.forEach((row: any) => {
                // convert row to Food obj
                let food = new Food(row.id, row.name, row.expiresAt, row.price, row.weight, row.available)
                // check expiry status of food
                if(evaluateRule(food, this.today) == "soon"){
                    console.log("Updating entry")
                    let query = "UPDATE food SET discountInPercent=50 WHERE id = ?";
                    // update discount value if status matched condition
                    this.dbConnection.getConnection().run(query, food.id);
                }
            });
        });

    }

    getData(): object {
        return this.data;
    }

    getSoonExpireList(): Promise<FoodExpiresSoon[]> {
        return new Promise<FoodExpiresSoon[]>((resolve, reject) => {
            const soonExpireList : FoodExpiresSoon[] = [];

            // set discount for all soon-to-expire products
            const query = "SELECT * FROM food WHERE discountInPercent = 50";
            // Use db.all to retrieve all results
            this.dbConnection.getConnection().all(query, [], (err, rows) => {
                if (err) {
                    console.error("Error fetching data:", err.message);
                    return;
                }

                // Iterate over the retrieved rows
                rows.forEach((row: any) => {
                    // convert row to Food obj
                    let food = new FoodExpiresSoon(row.id, row.name, row.expiresAt, row.price, row.weight, row.available, row.discountInPercent)
                    
                    //add to list
                    soonExpireList.push(food);
                    console.log("Pushed to expire list");
                });
                resolve(soonExpireList)
            });
        });
    }

    getExpiredList(): Promise<FoodToClaim[]> {

        return new Promise<FoodToClaim[]>((resolve, reject) => {
            const expiredList : FoodToClaim[] = [];

            // set discount for all soon-to-expire products
            const query = "SELECT * FROM food";
            // Use db.all to retrieve all results
            this.dbConnection.getConnection().all(query, [], (err, rows) => {
                if (err) {
                    console.error("Error fetching data:", err.message);
                    return;
                }

                // Iterate over the retrieved rows
                rows.forEach((row: any) => {
                    // convert row to Food obj
                    let food = new FoodToClaim(row.id, row.name, row.expiresAt, row.price, row.weight, row.available, true)

                    if(evaluateRule(food, this.today) == "expired"){ 
                        //add to list
                        expiredList.push(food);
                        console.log("Pushed to expired list");
                    }

                });
                resolve(expiredList)
            });
        });
    }

    getWasteList(): Promise<FoodToClaim[]> {
        return new Promise<FoodToClaim[]>((resolve, reject) => {
            const wasteList : FoodToClaim[] = [];

            // set discount for all soon-to-expire products
            const query = "SELECT * FROM food";
            // Use db.all to retrieve all results
            this.dbConnection.getConnection().all(query, [], (err, rows) => {
                if (err) {
                    console.error("Error fetching data:", err.message);
                    return;
                }

                // Iterate over the retrieved rows
                rows.forEach((row: any) => {
                    // convert row to Food obj
                    let food = new FoodToClaim(row.id, row.name, row.expiresAt, row.price, row.weight, row.available, true)

                    if(evaluateRule(food, this.today) == "waste"){ 
                        //add to list
                        wasteList.push(food);
                        console.log("Pushed to waste list");
                    }
                    
                });
                resolve(wasteList)
            });
        });
    }

    claimItem(dto: ClaimItemDto, itemToClaim: FoodToClaim) {
        console.log(dto);

        // Find the item in the list and set claimed to true
        (this.expiredList.find((item) => item.id === itemToClaim.id)).claimed = true;

    }
}
