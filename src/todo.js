class TodoItem {
    constructor(title="", desc="", priority=0, dueDate=null, isComplete=false) {
        this.UUID = crypto.randomUUID();
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.dueDate =  dueDate;
        this.isComplete = isComplete;
    }

    setTitle(str) {
        this.title = str;
    }

    setDesc(str) {
        this.desc = str;
    }

    setPriority(num) {
        /* 0: low, 1: medium, 2: high */
        let prioritySteps = 3

        if (num < 0) {
            this.priority = 0;
        }
        else {
            this.priority = num % prioritySteps;
        }
    }

    setDueDate(date) {
        this.dueDate =  date;
    }

    setCompleteStatus(bool) {
        this.isComplete = bool;
    }
}

class Project {
    constructor(title="", desc="") {
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

    getIndexOfTodo(UUID) {
        return this.todoList.findIndex((item) => item.UUID === UUID);
    }

    deleteTodoItem(UUID) {
        let index = getIndexOfTodo(UUID);
        if (index !== -1) {  
            return this.todoList.splice(index, 1)[0];
        }

        return null;
    }

    moveTodoItem(UUID, newIndex) {
        if (newIndex > this.todoList.length) {
            newIndex = this.todoList.length;
        }

        let oldIndex = this.getIndexOfTodo(UUID);
        const itemToBeMoved = this.todoList.splice(oldIndex, 1)[0];
        this.todoList.splice(newIndex, 0, itemToBeMoved);
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

function getProjectFromUUID(projectList, uuid) {
    let index = projectList.findIndex((proj) => proj.UUID === uuid);
    return projectList[index];
}

export { TodoItem, Project, reformProject, getProjectFromUUID };