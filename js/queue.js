class Queue {
    constructor(obj) {
        if (obj === undefined || obj === null) {
            this.elements = {};
            this.head = 0;
            this.tail = 0;
        } else {
            this.elements = obj.elements;
            this.head = obj.head;
            this.tail = obj.tail;
        }
    }

    enqueue(element) {
        this.elements[this.tail] = element;
        ++this.tail;
    }

    dequeue() {
        if (this.length() <= 0) {
            return null;
        }
        var element = this.elements[this.head];
        delete this.elements[this.head];
        ++this.head;
        return element;
    }

    dequeue_back() {
        if (this.length() <= 0) {
            return null;
        }
        var element = this.elements[this.tail];
        delete this.elements[this.tail];
        --this.tail;
        return element;
    }

    clear() {
        this.head = 0;
        this.tail = 0;
    }

    length() {
        return this.tail - this.head;
    }
}
