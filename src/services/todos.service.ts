import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateClass, DateDocument } from 'src/schema/date.schema';
import { TodoTask, TodoTaskDocument } from 'src/schema/todoTask.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(DateClass.name) private dateModel: Model<DateDocument>,
    @InjectModel(TodoTask.name) private todoTaskModel: Model<TodoTaskDocument>,
  ) {}

  // Create a new date entry
  async createDate(date: Date, description?: string): Promise<DateClass> {
    const newDate = new this.dateModel({ date, description });
    return newDate.save();
  }

  async createTaskForDate(
    title: string,
    dateId: string,
    timeInterval?: string,
    money?: number,
  ): Promise<TodoTask> {
    const newTask = new this.todoTaskModel({
      title,
      date: dateId,
      timeInterval,
      money,
      status: 'inprogress',
    });
    return newTask.save();
  }

  async getAllDates(): Promise<DateClass[]> {
    return this.dateModel.find().exec();
  }

  async getTasksByDate(dateId: string): Promise<{ tasks: TodoTask[], status: string }> {
    const tasks = await this.todoTaskModel.find({ date: dateId }).exec();
    const allTasksDone = tasks.every(task => task.status === 'done');
    const dateStatus = allTasksDone ? 'done' : 'inprogress';
    this.dateModel.findByIdAndUpdate(dateId, { dateStatus }, { new: true }).exec();
    return { tasks, status: dateStatus };
  }



  async getDateById(dateId: string): Promise<DateClass> {
    const datee = await this.dateModel.findById(dateId).exec(); 
    return datee; 
  }
  

  async updateTaskStatus(taskId: string, status: string): Promise<TodoTask> {
    return this.todoTaskModel.findByIdAndUpdate(taskId, { status }, { new: true }).exec();
  }
  
  async updateTaskStatusAndVerifyDate(taskId: string, status: string): Promise<TodoTask> {
    const updatedTask = await this.todoTaskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    ).exec();

    if (updatedTask) {
      const tasksForDate = await this.todoTaskModel.find({ date: updatedTask.date }).exec();
      const allTasksDone = tasksForDate.every(task => task.status === 'done');
      const dateStatus = allTasksDone ? 'done' : 'inprogress';
      // If all tasks are done, update the date's status to "done"
      if (dateStatus) {
        await this.dateModel.findByIdAndUpdate(updatedTask.date, { status: 'done' }).exec();
      } else {
        // Otherwise, ensure the date is still marked as "inprogress"
        await this.dateModel.findByIdAndUpdate(updatedTask.date, { status: 'inprogress' }).exec();
      }
    }
    return updatedTask;
  }
}
