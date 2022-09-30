import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Company extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  number: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
