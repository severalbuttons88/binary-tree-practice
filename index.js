const tree = (array) => {
  let treeRoot = null;
  let sortedArray = mergeArray(array);

  const deleteValue = (value) => {
    treeRoot = deleteRec(treeRoot, value);
  };
  function setArray(array) {
    sortedArray = mergeArray(array);
  }
  const getTreeRoot = () => {
    return treeRoot;
  };

  const isBalanced = (node = getTreeRoot()) => {
    function findTreeHeight(node) {
      if (node === null) {
        return 0;
      } else {
        return (
          Math.max(
            findTreeHeight(node.getLeftChild()),
            findTreeHeight(node.getRightChild())
          ) + 1
        );
      }
    }

    if (node === null) {
      return true;
    }
    let leftHeight = findTreeHeight(node.getLeftChild());
    let rightHeight = findTreeHeight(node.getRightChild());
    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      isBalanced(node.getLeftChild()) === true &&
      isBalanced(node.getRightChild()) === true
    ) {
      //gets height difference, if diff > 1 for each child also return true
      return true;
    }
    return false;
  };
  const rebalance = () => {
    const nodeValueArray = inorder();
    setArray(nodeValueArray);
    buildTree(nodeValueArray);
  };

  const levelOrder = (callbackFunc = null) => {
    const queue1 = queue();
    let currentRoot = getTreeRoot();
    queue1.enqueue(currentRoot);
    let current = queue1.front();
    if (callbackFunc !== null) {
      if (currentRoot === null) return;
      while (queue1.isEmpty() === false) {
        callbackFunc(current);
        if (current.getLeftChild() !== null)
          queue1.enqueue(current.getLeftChild());
        if (current.getRightChild() !== null)
          queue1.enqueue(current.getRightChild());
        queue1.dequeue();
        current = queue1.front();
      }
    } else {
      let arrayReturn = [];
      if (currentRoot === null) return;
      while (queue1.isEmpty() === false) {
        let current = queue1.front();
        arrayReturn.push(current.getData());
        if (current.getLeftChild() !== null) {
          queue1.enqueue(current.getLeftChild());
        }
        if (current.getRightChild() !== null) {
          queue1.enqueue(current.getRightChild());
        }
        queue1.dequeue();
      }
      return arrayReturn;
    }
  };

  const preorder = (callback = null, root = getTreeRoot(), array = []) => {
    let returnArray = array;
    if (callback === null) {
      if (root === null) return;
      returnArray.push(root.getData());
      preorder(callback, root.getLeftChild(), returnArray);
      preorder(callback, root.getRightChild(), returnArray);
      return returnArray;
    } else {
      if (root === null) return;
      callback(root);
      preorder(callback, root.getLeftChild());
      preorder(callback, root.getRightChild());
    }
  };
  const inorder = (callback = null, root = getTreeRoot(), array = []) => {
    let returnArray = array;
    if (callback === null) {
      if (root === null) return;

      inorder(callback, root.getLeftChild(), returnArray);
      returnArray.push(root.getData());
      inorder(callback, root.getRightChild(), returnArray);
      return returnArray;
    } else {
      if (root === null) return;

      inorder(callback, root.getLeftChild());
      callback(root);
      inorder(callback, root.getRightChild());
    }
  };
  const postorder = (callback = null, root = getTreeRoot(), array = []) => {
    let returnArray = array;
    if (callback === null) {
      if (root === null) return;
      postorder(callback, root.getRightChild(), returnArray);
      postorder(callback, root.getLeftChild(), returnArray);
      returnArray.push(root.getData());
      return returnArray;
    } else {
      if (root === null) return;
      postorder(callback, root.getRightChild());
      postorder(callback, root.getLeftChild());
      callback(root);
    }
  };

  const height = (node) => {
    let currentQueue = queue();
    currentQueue.enqueue(node);
    let height = -1;
    while (currentQueue.isEmpty() === false) {
      let queueSize = currentQueue.length();
      for (let i = 0; i < queueSize; i++) {
        let currentNode = currentQueue.front();
        if (currentNode.getLeftChild() !== null) {
          currentQueue.enqueue(currentNode.getLeftChild());
        }
        if (currentNode.getRightChild() !== null) {
          currentQueue.enqueue(currentNode.getRightChild());
        }
        currentQueue.dequeue();
      }
      height++;
    }
    return height;
  };

  const depth = (node) => {
    const nodeData = node.getData();
    currentNode = getTreeRoot();
    let depth = 0;

    while (node !== currentNode) {
      if (currentNode !== null) {
        if (nodeData < currentNode.getData()) {
          currentNode = currentNode.getLeftChild();
          depth += 1;
        } else {
          currentNode = currentNode.getRightChild();
          depthh += 1;
        }
        if (currentNode === null) {
          return null;
        }
      }
    }
    return depth;
  };
  const prettyPrint = (node = getTreeRoot(), prefix = "", isLeft = true) => {
    if (node.getRightChild() !== null) {
      prettyPrint(
        node.getRightChild(),
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
    if (node.getLeftChild() !== null) {
      prettyPrint(
        node.getLeftChild(),
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };
  const find = (value, currentNode = treeRoot) => {
    while (value != currentNode.getData()) {
      if (currentNode !== null) {
        if (value < currentNode.getData()) {
          currentNode = currentNode.getLeftChild();
        } else {
          currentNode = currentNode.getRightChild();
        }
        if (currentNode === null) {
          return null;
        }
      }
    }
    return currentNode;
  };

  const deleteRec = (root, value) => {
    if (root == null) return root;
    if (value < root.getData()) {
      root.setLeftChild(deleteRec(root.getLeftChild(), value));
    } else if (value > root.getData()) {
      root.setRightChild(deleteRec(root.getRightChild(), value));
    } else {
      if (root.getLeftChild() == null) {
        return root.getRightChild();
      } else if (root.getRightChild() == null) {
        return root.getLeftChild();
      }
      root.setData(minValue(root.getRightChild()));
      root.setRightChild(deleteRec(root.getRightChild(), root.getData()));
    }
    return root;
  };

  function minValue(root) {
    let minv = root.getData();
    while (root.getLeftChild() != null) {
      minv = root.getLeftChild.getData();
      root = root.getLeftChild();
    }
    return minv;
  }
  function mergeArray(array) {
    if (array.length <= 1) {
      return array;
    }

    let cutPoint = Math.floor(array.length / 2);

    let leftArray = mergeArray(array.slice(0, cutPoint));
    let rightArray = mergeArray(array.slice(cutPoint));
    return merge(leftArray, rightArray);
  }

  function merge(leftArray, rightArray) {
    let arr = [];
    while (leftArray.length > 0 && rightArray.length > 0) {
      const smallerArray =
        leftArray[0] < rightArray[0] ? leftArray : rightArray;
      const addItem = smallerArray.shift();
      arr.push(addItem);
    }
    return arr.concat(leftArray, rightArray);
  }

  const buildTree = (array, start = 0, end = sortedArray.length) => {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    if (array[mid] === undefined) return null;

    let root = node();
    root.setData(array[mid]);
    root.setLeftChild(buildTree(array, start, mid - 1));
    root.setRightChild(buildTree(array, mid + 1, end));
    treeRoot = root;
    return root;
  };

  const getArray = () => {
    return sortedArray;
  };

  const insert = (value, nodeRoot = getTreeRoot(), newNode = node()) => {
    newNode.setData(value);
    if (newNode.getData() < nodeRoot.getData()) {
      if (nodeRoot.getLeftChild() === null) {
        nodeRoot.setLeftChild(newNode);
      } else {
        insert(value, nodeRoot.getLeftChild(), newNode);
      }
    } else {
      if (nodeRoot.getRightChild() === null) {
        nodeRoot.setRightChild(newNode);
      } else {
        insert(value, nodeRoot.getRightChild(), newNode);
      }
    }
  };

  const queue = () => {
    let queueStack = [];

    const isEmpty = () => {
      if (queueStack.length === 0) {
        return true;
      }
      return false;
    };

    const getQueue = () => {
      return queueStack;
    };
    const length = () => {
      return queueStack.length;
    };
    const front = () => {
      return queueStack[0];
    };

    const enqueue = (value) => {
      queueStack.push(value);
    };

    const dequeue = () => {
      queueStack.shift();
    };
    //queue returns
    return { getQueue, enqueue, dequeue, isEmpty, front, length };
  };

  const node = (nodeData) => {
    let data = nodeData;
    let leftChild = null;
    let rightChild = null;

    const setData = (nodeData) => {
      data = nodeData;
    };

    const getData = () => {
      return data;
    };

    const setLeftChild = (child) => {
      leftChild = child;
    };

    const setRightChild = (child) => {
      rightChild = child;
    };

    const getLeftChild = () => {
      return leftChild;
    };

    const getRightChild = () => {
      return rightChild;
    };
    //node returns
    return {
      setData,
      getData,
      setLeftChild,
      setRightChild,
      getLeftChild,
      getRightChild,
    };
  };
  buildTree(sortedArray);
  //tree returns
  return {
    buildTree,
    getArray,
    insert,
    deleteValue,
    getTreeRoot,
    find,
    levelOrder,
    queue,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
};

const driverScript = () => {
  const generateRandomArray = (arrayLength = 6, maxNumberValue = 100) => {
    const arraySize = arrayLength;
    const randomArray = [];
    if (arrayLength > maxNumberValue) {
      console.log("Invalid random generator, change inputs");
      return;
    }
    for (let i = 0; i < arraySize; i++) {
      let randomNum = Math.floor(Math.random() * maxNumberValue);
      if (randomArray.includes(randomNum)) {
        i--;
      } else {
        randomArray.push(randomNum);
      }
    }
    console.log(randomArray);
    return randomArray;
  };
  function insertIntoTree(array, tree) {
    for (let num in array) {
      tree.insert(num);
    }
  }
  const runScript = () => {
    let maxRandomValue = 50;
    let numberOfArrayItems = 20;
    let generatedArray = generateRandomArray(
      numberOfArrayItems,
      maxRandomValue
    );
    let arrayToUnbalance = generateRandomArray(
      Math.ceil(numberOfArrayItems / 4),
      maxRandomValue * 1000
    );
    const tree2 = tree(generatedArray);
    console.log(`Is Tree balanced: ${tree2.isBalanced()}`);
    console.log(`------------------------Initialize tree---------------------`);
    console.log(`LevelOrder traversal: ${tree2.levelOrder()}`);
    console.log(`Preorder traversal: ${tree2.preorder()}`);
    console.log(`Inorder traversal: ${tree2.inorder()}`);
    console.log(`Postorder traversal: ${tree2.postorder()}`);
    tree2.prettyPrint();

    insertIntoTree(arrayToUnbalance, tree2);

    console.log(
      `----------------------Unbalance tree step --------------------`
    );
    tree2.prettyPrint();
    console.log(`Is Tree balanced: ${tree2.isBalanced()}`);
    tree2.rebalance();
    console.log(
      `----------------------balance tree step------------------------`
    );
    console.log(`Is Tree balanced: ${tree2.isBalanced()}`);
    tree2.prettyPrint();
    console.log(`LevelOrder traversal: ${tree2.levelOrder()}`);
    console.log(`Preorder traversal: ${tree2.preorder()}`);
    console.log(`Inorder traversal: ${tree2.inorder()}`);
    console.log(`Postorder traversal: ${tree2.postorder()}`);
  };

  return { generateRandomArray, runScript };
};

let script = driverScript();
script.runScript();
