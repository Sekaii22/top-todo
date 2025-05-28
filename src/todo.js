class TodoItem {
    constructor(title, desc, priority, dueDate) {
        this.UUID = crypto.randomUUID();
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.dueDate =  dueDate;
        this.isComplete = false;
    }

    setTitle(str) {
        this.title = str;
    }

    setDesc(str) {
        this.desc = str;
    }

    setPriority(num) {
        /* 0: low, 1: medium, 2: high */
        if (num < 0) {
            this.priority = 0;
        }
        else if (num > 2) {
            this.priority = 2;
        }
        else {
            this.priority = num;
        }
    }

    setCompleteStatus(bool) {
        this.isComplete = bool;
    }
}

class Project {
    constructor(title, desc) {
        this.UUID = crypto.randomUUID();
        this.title = title;
        this.desc = desc;
        this.todoList = [];
    }

    setTitle(str) {
        this.title = str;
    }

    setDesc(str) {
        this.desc = str;
    }

    addTodoItem(todoItem) {
        if (todoItem instanceof TodoItem) {
            this.todoList.push(todoItem);
        } else {
            console.log("Error: argument given is not an instance of TodoItem.");
        }
    }

    deleteTodo(UUID) {
        let index = this.todoList.findIndex((item) => item.UUID === UUID);
        if (index !== -1) {  
            return this.todoList.splice(index, 1)[0];
        }

        return null;
    }
}

function reformTodoItem(todoItem) {
    // return methods back to todo obj
    Object.setPrototypeOf(todoItem, TodoItem.prototype);

    // convert properties back to correct type
    todoItem.dueDate = new Date(todoItem.dueDate);
}

function reformProject(project) {
    // return methods back to project obj
    Object.setPrototypeOf(project, Project.prototype);

    // convert properties back to correct type
    for (let item of project.todoList) {
        reformTodoItem(item);
    }

    console.log(project);
}

export { TodoItem, Project, reformTodoItem, reformProject };