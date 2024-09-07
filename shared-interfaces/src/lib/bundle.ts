import { Food } from '@3-steps/interfaces';

export interface Bundle {
  img: string,            // url to example picture
  title: string,          // receipt title
  ingredients: Food[],
}
