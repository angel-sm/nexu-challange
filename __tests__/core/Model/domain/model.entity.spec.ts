import { Model, PrimitiveModel } from '../../../../src/core/Model/domain/model.entity';

describe('Model Class', () => {
  it('should correctly initialize properties from PrimitiveModel data', () => {
    const data: PrimitiveModel = {
      id: 1,
      name: 'Test Model',
      average_price: 100.5,
      brand_name: 'Test Brand',
    };

    const model = new Model(data);

    expect(model.id).toBe(1);
    expect(model.name).toBe('Test Model');
    expect(model.average_price).toBe(100.5);
    expect(model.brand_name).toBe('Test Brand');
  });

  it('should handle missing optional properties', () => {
    const data: PrimitiveModel = {};

    const model = new Model(data);

    expect(model.id).toBeUndefined();
    expect(model.name).toBeUndefined();
    expect(model.average_price).toBeUndefined();
    expect(model.brand_name).toBeUndefined();
  });

  it('should return correct primitive values using toPrimitives', () => {
    const data: PrimitiveModel = {
      id: 2,
      name: 'Another Model',
      average_price: 200,
      brand_name: 'Another Brand',
    };

    const model = new Model(data);
    const primitives = model.toPrimitives;

    expect(primitives).toEqual({
      id: 2,
      name: 'Another Model',
      averagePrice: 200,
      brand_name: 'Another Brand',
    });
  });
});
