import { Controller, Get, Post, Body, Query, NotFoundException } from '@nestjs/common';
import { TodosService } from '../services/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // Create a new date
  @Post('date')
  async createDate(@Body('date') date: string, @Body('description') description?: string) {
    const parsedDate = new Date(date);
    return this.todosService.createDate(parsedDate, description);
  }

  // Create a new task for a specific date
  @Post('task')
  async createTaskForDate(
    @Body('title') title: string,
    @Body('dateId') dateId: string,
    @Body('timeInterval') timeInterval?: string,
    @Body('money') money?: number,
  ) {
    return this.todosService.createTaskForDate(title, dateId, timeInterval, money);
  }

  // Get all dates
  @Get('dates')
  async getAllDates() {
    return this.todosService.getAllDates();
  }

  // Get all tasks and the date's status for a specific date
  @Get('tasks')
  async getTasksByDate(@Query('dateId') dateId: string) {
    const { tasks, status } = await this.todosService.getTasksByDate(dateId);
    return { tasks, dateStatus: status };
  }

    // Get date by Id
    @Get('date')
    async getDateById(@Query('dateId') dateId: string) {
    const datee = await this.todosService.getDateById(dateId);
    if (!datee) {
        throw new NotFoundException('Date not found'); 
    }
    return datee;
    }

    // Update task status 
  @Post('task/status')
  async updateTaskStatus(
    @Body('taskId') taskId: string,
    @Body('status') status: string
  ) {
    return this.todosService.updateTaskStatusAndVerifyDate(taskId, status);
  }
}
