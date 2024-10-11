class User {
    static instance = new User();
    static getInstance() {
        return User.instance;
    }
}
console.log(User.getInstance());

class User1 {
    static instance = null;
    static getInstance() {
        if (!User1.instance) {
            User1.instance = new User1();
        }
        return User1.instance;
    }
}
console.log(User1.getInstance());

// 购物车 所有类应该有一个接口去规范
