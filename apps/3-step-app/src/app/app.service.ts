import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ClaimItemDto } from './claim-item.dto';

@Injectable()
// API-Request to Schwarz-IT here
export class AppService {

  private data: object;

  constructor() {
    this.data = JSON.parse(
      fs.readFileSync('articles.json', 'utf-8')
    );
  }

    getData(): object {
        return this.data;
    }

  claimItem(dto: ClaimItemDto) {
    console.log(dto);
  }
}
