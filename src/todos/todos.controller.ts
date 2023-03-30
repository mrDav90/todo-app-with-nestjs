import { Body, Controller , Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

//access to localhost:3000/todos
@Controller('todos')
export class TodosController {
    constructor(
        private readonly todosServices : TodosService
    ){}

    @Get(":id")
    findOne(@Param("id") id :string) {
        console.log("id", id);
        return this.todosServices.findOne(id);
    }

    //décorateur Get     
    @Get()
    findAll() : Todo[] {
         return this.todosServices.getTodos() ;
    }

    @Post()
    createTodo(@Body() newTodo : CreateTodoDto) {
        console.log(newTodo);
        this.todosServices.create(newTodo);
    }

    @Patch(":id")
    updateToDo(@Param("id") id: string , @Body() todo:CreateTodoDto ) {
        this.todosServices.update(id,todo);
    }

    @Delete(":id")
    deleteTodo (@Param("id") id : string) {
        this.todosServices.delete(id);
    }
}
