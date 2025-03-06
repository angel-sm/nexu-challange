import Joi, { PartialSchemaMap } from 'joi';

export class JoiValidator {
  static toObjectSchema<T>(schema: PartialSchemaMap<T>) {
    return Joi.object(schema);
  }

  static validateSchema(schema: Joi.ObjectSchema, data: any) {
    return schema.validate(data);
  }
}
