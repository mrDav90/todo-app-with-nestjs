import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
     todos : Todo[] = [
        {
            id : "1" ,
            title : "todos app" ,
            description : "Create todos app" ,
            done : false,
        } ,
        {
            id : "2" ,
            title : "Tchiep" ,
            description : "Buy tchiep" ,
            done : true,
        }

    ]

    getTodos() : Todo[] {
        return this.todos;
    }

    create(todo : CreateTodoDto) {
        this.todos.push(todo);
    }

    findOne(id : string) : Todo {
        for (let index = 0; index < this.todos.length; index++) {
            if (this.todos[index].id === id) {
                return this.todos[index];
            }
            
        }
    }

    update(id : string , todo : CreateTodoDto) {
        const todoToUpdate = this.todos.find(todo => todo.id === id);
        if (!todoToUpdate) {
            return new NotFoundException("This object is not existing");
        }

        if (todo.hasOwnProperty("done")) {
            todoToUpdate.done = todo.done;
        }

        if (todo.title) {
            todoToUpdate.title = todo.title;
        }

        if (todo.description) {
            todoToUpdate.description = todo.description;
        }

        const updatedTodos = this.todos.map(t=>t.id !== id ? t : todoToUpdate);
        this.todos = [...updatedTodos];
    }

    delete(id : string) {
        const todoTabFiltered = [...this.todos].filter(todo => todo.id !== id);
        this.todos = todoTabFiltered;
        return this.todos;
    }
}
