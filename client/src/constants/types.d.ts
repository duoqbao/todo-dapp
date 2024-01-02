type UserProfileTypes = {
    todo_count: number,
    last_todo: number,
    authority?: string
}


interface InterfaceTodoAccount {
    account: TodoTypes
    publicKey: string
}

type TodoTypes = {
    authority?: string,
    idx: number,
    content: string,
    marked: boolean,
}




export { UserProfileTypes, InterfaceTodoAccount, TodoTypes, }