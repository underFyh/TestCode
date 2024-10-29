class Emitter {
    constructor() {
        this.events = new Map();
    }

    // 订阅事件
    on(eventName, callback) {
        let handlers = this.events.get(eventName);
        if (!handlers) {
            handlers = new Set();
            this.events.set(eventName, handlers);
        }
        handlers.add(callback);
    }

    // 执行事件
    emit(eventName, ...args) {
        let handlers = this.events.get(eventName);
        if (handlers) {
            handlers.forEach((handler) => {
                try {
                    handler(...args);
                } catch (error) {
                    console.error(`Error in event handler for ${eventName}:`, error);
                }
            })
        } else {
            return false;
        }
    }

    // 接触绑定
    off(eventName, callback) {
        let handlers = this.events.get(eventName);
        if (handlers) {
            // 没有传递则取消所有
            if (callback) {
                handlers.delete(callback);
            } else {
                this.events.delete(eventName);
            }
        } else {
            return false;
        }
    }
}


class Cart {
    constructor() {
        this.emitter = new Emitter();
        // 存储所有购物车数据
        this.items = [];
    }
    addItem(good) {
        this.emitter.emit("addGood", good);
        this.items.push(good);
    }
    removeItem(good) {
        this.emitter.emit("removeGood", good);
        this.items = this.items.filter(i => i.id !== good.id);
    }
}




class CartLog {
    constructor(cart) {
        cart.emitter.on("addGood", function (good){
            // 为什么this为undefined
            console.log("添加商品:", good, this);
        })
        cart.emitter.on("removeGood", (good) => {
            console.log("删除商品:", good, this);
        })
    }
}


let cart = new Cart()
new CartLog(cart);

cart.addItem({id:1, name: "肥皂"});
cart.addItem({id:2, name: "水果"});
console.log(cart);
