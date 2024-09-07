import { Filter, pipe } from "./article_condition_filter_types";

// calculates the difference between two dates and returns it in days
// first date should be earlier than second date
function calcDayDifference(firstDate : Date, secondDate: Date): number {
  return (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
}

const goodCondition: Filter = {
  name: 'Good Condition Filter',
  filter(item, now) {

    // checks if item expires in more than 2 days
    // difference is calculated in seconds, then converted to days
    if (calcDayDifference(now, item.expiresAt) > 2) {
      return 'good';
    } else {
      return null;
    }
  }
}

const expiringSoon: Filter = {
  name: 'Expiring Soon Filter',
  filter(item, now) {

    // checks if expiry date is in between 2 and 1 days
    if (calcDayDifference(now, item.expiresAt) <= 2 && calcDayDifference(now, item.expiresAt) > 1) {
        return 'soon';
    } else {
      return null;
    }
  }
}

const expired: Filter = {
  name: 'Expired Filter',
  filter(item, now) {
    if (calcDayDifference(now, item.expiresAt) == 1){
      return "expired"
    } else {
      return null;
    }
  }
}

const waste: Filter = {
  name: 'Waste Filter',
  filter(item, now) {

    if (calcDayDifference(now, item.expiresAt) < 1 ) {
      return 'waste';
    }else {
      return null
    }
  }
}

const evaluateRule = pipe(goodCondition, expiringSoon, expired, waste);
