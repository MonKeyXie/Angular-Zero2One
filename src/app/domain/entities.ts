//建立一个Todo对象定义todo的结构
//Todo是所有待办事项的集合
export class Todo {
    id: string;
    desc: string;
    completed: boolean;
}
export class User {
    id: number;
    username: string;
    password: string;
}
export class Auth {
    user: User;
    hasError: boolean;
    errMsg: string;
    redirectUrl: string;
}