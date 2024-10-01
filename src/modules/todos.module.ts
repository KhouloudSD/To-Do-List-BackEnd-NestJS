import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from '../controllers/todos.controller';
import { TodosService } from '../services/todos.service';
import { DateClass, DateSchema } from 'src/schema/date.schema';
import { TodoTask, TodoTaskSchema } from 'src/schema/todoTask.schema';

@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: DateClass.name, schema: DateSchema }]),
    MongooseModule.forFeature([{ name: TodoTask.name, schema: TodoTaskSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
