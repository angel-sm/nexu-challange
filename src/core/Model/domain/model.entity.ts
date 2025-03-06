export interface PrimitiveModel {
  id?: number;
  name?: string;
  average_price?: number;
  brand_name?: string;
}

export class Model {
  id?: number;
  name?: string;
  average_price?: number;
  brand_name?: string;

  constructor(data: PrimitiveModel) {
    this.id = data.id;
    this.name = data.name;
    this.average_price = data.average_price;
    this.brand_name = data.brand_name;
  }

  get toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      averagePrice: this.average_price,
      brand_name: this.brand_name,
    };
  }
}
