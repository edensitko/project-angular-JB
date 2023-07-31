class User {
    public id: number;
    public user_name: string;
    public lastName: string;
    public user_email: string;
    public password: string;
    public user_create: number;
    public role: string;


    constructor(id: number, user_name: string, lastName: string,user_email: string, password: string, user_create: number ,role:string) {
        this.id = id;
        this.user_name = user_name;
        this.lastName =lastName;
        this.user_email = user_email;
        this.password = password;
        this.user_create = user_create;
        this.role= role;
        
    }

}

export default User;