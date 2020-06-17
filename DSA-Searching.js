const BinarySearchTree = require('./binary-search-tree');
const Queue = require('./queue');

function binarySearch(arr, value, start = 0, end = arr.length - 1) {

    if (start > end) {
        return -1;
    }

    let index = Math.floor((start + end) / 2);
    let item = arr[index];

    console.log(`start and end: `, start, end);
    if (item === value) {
        return index;
    }

    else if (item < value) {

        return binarySearch(arr, value, index + 1, end);
    }
    else if (item > value) {

        return binarySearch(arr, value, start, index - 1);
    }
}


const books = [
    { dewy: '004.322', title: '1' },
    { dewy: '003.997', title: '2' },
    { dewy: '005.382', title: '3' },
    { dewy: '006.322', title: '4' },
    { dewy: '005.923', title: '5' },

];


function findBook(array, dewey, title) {

    const keys = Object.keys(array[0]);
    array.forEach(book => {
        if (book[keys[0]] === dewey && book[keys[1]] === title) {
            return book;
        }
    });
}
findBook(books, '005.382', '3');

function treeTraversals() {
    let BST = new BinarySearchTree();
    BST.insert(25, '25');
    BST.insert(15, '15');
    BST.insert(50, '50');
    BST.insert(10, '10');
    BST.insert(24, '24');
    BST.insert(35, '35');
    BST.insert(70, '70');
    BST.insert(4, '4');
    BST.insert(12, '12');
    BST.insert(18, '18');
    BST.insert(31, '31');
    BST.insert(44, '44');
    BST.insert(66, '66');
    BST.insert(90, '90');
    BST.insert(22, '22');

    const preOrder = (bst) => {
        console.log({ preOrder: bst.key });
        if (bst.left) {
            preOrder(bst.left);
        }
        if (bst.right) {
            preOrder(bst.right);
        }
    };

    const inOrder = (bst) => {

        if (bst.left) {

            inOrder(bst.left);
        }
        console.log(`key `, { inOrder: bst.key });
        if (bst.right) {
            inOrder(bst.right);
        }
    };

    const postOrder = (bst) => {
        if (bst.left) {
            postOrder(bst.left);
        }
        if (bst.right) {
            postOrder(bst.right);
        }
        console.log(`postorder key `, { postOrder: bst.key });
    };

    preOrder(BST);
    inOrder(BST);
    postOrder(BST);
}

function nextCommandingOfficer() {

    let BST = new BinarySearchTree();
    BST.insert(5, 'Captain Picard');
    BST.insert(3, 'Commander Riker');
    BST.insert(6, 'Commander Data');

    BST.insert(8, 'Lt. Cmdr. Crusher');
    BST.insert(7, 'Lieutenant Selar');
    BST.insert(3, 'Lt. Cmdr. Worf');
    BST.insert(4, 'Lt. Cmdr. LaForge');
    BST.insert(1, 'Lt. security-officer');

    commanders(BST);

}

nextCommandingOfficer();


function maxProfit(array) {

    let max = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i + 1] - array[i] > max) {
            max = array[i + 1] - array[i];
        }
    }
    console.log(`max: `, max);
    return max;

}
maxProfit([128, 97, 121, 123, 98, 97, 105]);

//BST

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {

        if (this.key === null) {
            this.key = key;
            this.value = value;
        }

        else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            }

            else {
                this.left.insert(key, value);
            }
        }

        else {
            if (this.right === null) {
                this.right = new BinarySearchTree(key, value, this);
            }

            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {

        if (this.key === key) {
            return this.value;
        }

        else if (key < this.key && this.left) {
            return this.left.find(key);
        }

        else if (key > this.key && this.right) {
            return this.right.find(key);
        }

        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key === key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }

            else if (this.left) {
                this._replaceWith(this.left);
            }

            else if (this.right) {
                this._replaceWith(this.right);
            }

            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            }
            else if (this === this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

class _Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Queue {

    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new _Node(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
            this.last.prev = node;
        }

        this.last = node;
    }

    dequeue() {

        if (this.first === null) {
            return;
        }

        const node = this.first;
        this.first = node.prev;

        if (node === this.last) {
            this.last = null;
        }
        return node.value;
    }
}



module.exports = Search;