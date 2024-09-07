import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { Food, Bundle } from '@3-steps/interfaces';


interface Result {
  img: string,            // url to example picture
  title: string,          // receipt title
  uses: string,           // comma separated list which ingredients used
  needs: string[],        // list of ingredients also needed and not given in request
}

@Injectable()
export class BundleService {
  private apiUrl = 'https://d1.supercook.com/dyn/results';
  private static ingredientToStandardMapping = {
    'Fresh Red Snapper': 'red snapper',
    'Dried basil': 'basil',
    'Sugar Snap Peas': 'snap peas',
  };

  getBundles(ingredients: Food[]): Promise<Bundle[]> {
    return new Promise((resolve, reject) => {
      const reverseTable = this.mapToStandardIngredients(
        ingredients,
        this.findStandardIngredient
      );

      const standardizedIngredients = Object.keys(reverseTable);
      console.log(standardizedIngredients.join(','));

      axios.post(this.apiUrl, qs.stringify({
        'app': '1',
        'kitchen': standardizedIngredients.join(','),
        'lang': 'en'
      })).then((res) => {
        const results: Result[] = res.data.results;
        if( !results ) {
          resolve([]);
        }

        resolve(
          results.map((result: Result): Bundle => {

            return {
              img: result.img,
              title: result.title,
              ingredients: result.uses.split(',').map(
                k => reverseTable[k]
              ).reduce((acc, val) => acc.concat(val), []),
            };
          })
        );
      })
        .catch((error) => reject)
    });
  }

  /**
   * Maps all ingredients to a mapped ingredient using a mapping table and
   * provides a mapping table for reversing.
   *
   * @param ingredients       Store ingredients from the market.
   * @param mappingFunction   Function to map an ingredient to a standarized ingredient
   */
  mapToStandardIngredients(
    ingredients: Food[],
    mappingFunction: (ingredient: Food) => string | null,
  ): { [key: string]: Food[] } {
    const reverseTable: { [key: string]: Food[] } = {};

    ingredients.forEach((ingredient) => {
      const standardIngredient = mappingFunction(ingredient);
      if( standardIngredient ) {
        // reverse mapping table already contains key
        if( reverseTable[standardIngredient] ) {
          reverseTable[standardIngredient].push(ingredient);
        }

        // create new entry in reverse table
        reverseTable[standardIngredient] = [ingredient];
      }
    });

    return reverseTable;
  }

  /**
   * Tries to map a given ingredient to a standardized ingredient
   * @param ingredient
   */
  findStandardIngredient(ingredient: Food): string | null {
    if( BundleService.ingredientToStandardMapping[ingredient.name] ) {
      return BundleService.ingredientToStandardMapping[ingredient.name];
    }
    return null;
  }
}
