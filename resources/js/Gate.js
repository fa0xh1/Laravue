export default class Gate{

    constructor(user){
        this.user = user;
    }


    isAdmin(){
        return this.user.tipe === 'admin';
    }

    isUser(){
        return this.user.tipe === 'user';
    }

    isSuper(){
        return this.user.tipe === 'super';
    }

    isAdminOrSuper(){
        if (this.user.tipe === 'admin' || this.user.tipe === 'super') {
            return true;
        }
    }
}
