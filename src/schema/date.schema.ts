import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DateDocument = DateClass & Document;

@Schema()
export class DateClass {
  @Prop({ required: true })
  date: Date;  

  @Prop({ enum: ['done', 'inprogress'], default: 'inprogress' })
  status: string;  

  @Prop()
  description: string;  
}

export const DateSchema = SchemaFactory.createForClass(DateClass);
