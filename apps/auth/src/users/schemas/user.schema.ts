import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Company } from './company.schema';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);
