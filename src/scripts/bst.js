class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    // handles duplicates & sorting
    const cleanArr = [...new Set(arr)].sort((a,b) => a-b);
    this.root = this.buildTree(cleanArr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1));

    return node;
  }

  includes(value) {
    let currNode = this.root;
    
    while(currNode !== null) {
      if(currNode.data === value) return true;
      currNode = value < currNode.data ? currNode.left : currNode.right;
    }
    return false;
  }

  insert(value) {
    let parentNode = null;
    let currNode = this.root;

    while(currNode !== null) {
      if(currNode.data === value) return;
      parentNode = currNode;
      currNode = value < currNode.data ? currNode.left : currNode.right;
    }

    const newNode = new Node(value);

    if(parentNode === null) {
      this.root = value;
    } else if(value < parentNode.data) {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode; 
    }
  }

  deleteItem(value) {
    let parentNode = null;
    let currNode = this.root;

    // find node
    while(currNode !== null && currNode.data !== value) {
      parentNode = currNode;
      currNode = value < currNode.data ? currNode.left : currNode.right;
    }

    if(currNode === null) return;

    // handle 2 children
    if(currNode.left !== null && currNode.right !== null) {
      // find successor
      let heirNode = currNode.right;
      let heirParent = currNode;
      while(heirNode.left !== null) {
        heirParent = heirNode;
        heirNode = heirNode.left;
      }
      currNode.data = heirNode.data;
      parentNode = heirParent;
      currNode = heirNode;
    } 

    // handles 0 or 1 child
    const childNode = currNode.left !== null ? currNode.left : currNode.right;

    if(parentNode === null) this.root = childNode;
    else if (parentNode.left === currNode) parentNode.left = childNode;
    else parentNode.right = childNode;
  }
  
  levelOrderForEach(callback = null) {
    if(callback === null) throw new Error("Callback is required");
    if(this.root === null) return;
  
    let currNode = this.root;
    const arr = [currNode];

    while(arr.length !== 0) {
      callback(currNode.data);

      if(currNode.left !== null) arr.push(currNode.left);
      if(currNode.right !== null) arr.push(currNode.right);
      
      arr.shift();

      currNode = arr[0] !== null ? arr[0] : null;
    }
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }  
}

const tree = new Tree([6, 7, 10, 11, 69, 85, 2, 1, 8, 12]);
console.log(tree.includes(7));
tree.insert(67);
tree.deleteItem(10);
tree.prettyPrint();
tree.levelOrderForEach((value) => console.log(value));