class EventEmitter {
    constructor() {
        // 存储事件和监听函数的映射关系
        this.events = new Map();
    }

    // 订阅事件
    on(eventName, callback) {
        // 获取事件对应的监听函数列表
        let handlers = this.events.get(eventName);
        if (!handlers) {
            handlers = new Set();
            this.events.set(eventName, handlers);
        }
        handlers.add(callback);

        // 返回取消订阅的函数
        return () => {
            this.off(eventName, callback);
        };
    }

    // 取消订阅
    off(eventName, callback) {
        const handlers = this.events.get(eventName);
        if (handlers) {
            if (callback) {
                handlers.delete(callback);
            } else {
                this.events.delete(eventName);
            }
        }
    }

    // 订阅一次性事件
    once(eventName, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(eventName, wrapper);
        };
        this.on(eventName, wrapper);
    }

    // 发布事件
    emit(eventName, ...args) {
        const handlers = this.events.get(eventName);
        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(...args);
                } catch (error) {
                    console.error(`Error in event handler for ${eventName}:`, error);
                }
            });
            return true;
        }
        return false;
    }

    // 获取指定事件的订阅者数量
    listenerCount(eventName) {
        const handlers = this.events.get(eventName);
        return handlers ? handlers.size : 0;
    }

    // 获取所有事件名称
    eventNames() {
        return Array.from(this.events.keys());
    }
}

// 使用示例
class ShoppingCart extends EventEmitter {
    constructor() {
        super();
        this.items = new Map();
    }

    addItem(item) {
        const currentQuantity = this.items.get(item.id) || 0;
        this.items.set(item.id, currentQuantity + 1);
        this.emit('itemAdded', item);
        this.emit('cartUpdated', this.getCartInfo());
    }

    removeItem(itemId) {
        if (this.items.has(itemId)) {
            this.items.delete(itemId);
            this.emit('itemRemoved', itemId);
            this.emit('cartUpdated', this.getCartInfo());
        }
    }

    getCartInfo() {
        return {
            itemCount: this.items.size,
            items: Array.from(this.items.entries())
        };
    }
}

// 订阅者示例
class CartLogger {
    constructor(cart) {
        // 订阅多个事件
        cart.on('itemAdded', item => {
            console.log('Item added to cart:', item, this);
        });

        cart.on('itemRemoved', itemId => {
            console.log('Item removed from cart:', itemId);
        });

        // 一次性订阅事件
        cart.once('cartUpdated', info => {
            console.log('First cart update:', info);
        });
    }
}

class CartUI {
    constructor(cart) {
        cart.on('cartUpdated', info => {
            this.updateDisplay(info);
        });
    }

    updateDisplay(cartInfo) {
        console.log('UI Updated:', cartInfo);
    }
}


// 创建购物车实例
const cart = new ShoppingCart();

// 创建订阅者
const logger = new CartLogger(cart);
const ui = new CartUI(cart);

// 添加商品
cart.addItem({ id: 1, name: 'Book', price: 20 });

// 移除商品
// cart.removeItem(1);

