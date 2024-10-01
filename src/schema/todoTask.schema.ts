import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DateClass } from './date.schema';
import { Schema as MongooseSchema } from 'mongoose';

export type TodoTaskDocument = TodoTask & Document;

@Schema()
export class TodoTask {
  @Prop({ required: true })
  title: string;  

  @Prop()
  timeInterval: string;  

  @Prop()
  money: number;  

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DateClass', required: true })
  date: DateClass;  

  
  @Prop({ required: true, enum: ['done', 'inprogress'], default: 'inprogress' })
  status: string;  
}

export const TodoTaskSchema = SchemaFactory.createForClass(TodoTask);
