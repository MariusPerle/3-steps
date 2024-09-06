import './article_condition_filter_types';

const goodCondition: Filter = {
  name: 'Good Condition Filter',
  filter(item, now) {
    return null;
  }
}

const expiringSoon: Filter = {
  name: 'Expiring Soon Filter',
  filter(item, now) {
    return null;
  }
}

const expired: Filter = {
  name: 'Expired Filter',
  filter(item, now) {
    return null;
  }
}

const waste: Filter = {
  name: 'Waste Filter',
  filter(item, now) {
    return null
  }
}

const evaluateRule = pipe(goodCondition, expiringSoon, expired, waste);
