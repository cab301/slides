class BTreeNode {
  constructor(id, value, group) {
    this.id = id;
    this.value = value;
    this.group = group;
    this.left = null;
    this.right = null;
  }
}

class BSearchTree {
  constructor(onGetNode) {
    this.root = null;
    this.onGetNode = onGetNode;
    this.getNode = (node) => {
      if (onGetNode) onGetNode(node);
      return node;
    };
    this.nextId = 0;
  }

  setOnGetNode(onGetNode) {
    this.onGetNode = onGetNode;
    this.getNode = (node) => {
      if (onGetNode) onGetNode(node);
      return node;
    };
  }

  insert(value, group) {
    const newNode = new BTreeNode(this.nextId++, value, group);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.getNode(this.root);
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          this.getNode(current.left);
          return;
        }
        current = this.getNode(current.left);
      } else {
        if (!current.right) {
          current.right = newNode;
          this.getNode(current.right);
          return;
        }
        current = this.getNode(current.right);
      }
    }
  }

  search(value) {
    let current = this.getNode(this.root);
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) current = this.getNode(current.left);
      else current = this.getNode(current.right);
    }
    return false;
  } 

  remove(value) {
    // Iterative deletion algorithm
    const removeNode = (value, node) => {
      let ptr = this.getNode(node);
      let parent = null;
      while (this.getNode(ptr) && ptr.value !== value) {
        parent = ptr;
        if (value < ptr.value) ptr = this.getNode(ptr.left);
        else ptr = this.getNode(ptr.right);
      }

      if (ptr) {
        if (ptr.left && ptr.right) {
          if (!this.getNode(ptr.left.right)) {
            ptr.value = this.getNode(ptr.left).value;
            ptr.left = this.getNode(ptr.left.left);
          }
          else {
            let p = this.getNode(ptr.left);
            let pp = this.getNode(ptr);
            while (this.getNode(p.right)) {
              pp = this.getNode(p);
              p = this.getNode(p.right);
            }
            ptr.value = p.value;
            pp.right = this.getNode(p.left);
          }
        }
        else {
          let child;
          if (ptr.left) {
            child = this.getNode(ptr.left);
          }
          else {
            child = this.getNode(ptr.right);
          }
          if (ptr === node) {
            node = this.getNode(child);
          }
          else {
            if (ptr === parent.left) {
              parent.left = this.getNode(child);
              this.getNode(parent.left);
            }
            else {
              parent.right = this.getNode(child);
              this.getNode(parent.right);
            }
          }
        }
      }
    };

    removeNode(value, this.root);
    console.log(this);
  }

  inOrder(action) {
    const traverse = (node) => {
      if (node.left) traverse(this.getNode(node.left));
      action(node);
      if (node.right) traverse(this.getNode(node.right));
    };
    traverse(this.getNode(this.root));
  }

  preOrder(action) {
    const traverse = (node) => {
      action(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
  }

  postOrder(action) {
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      action(node);
    };
    traverse(this.root);
  }

  asGraph() {
    const nodes = [];
    const edges = [];
    const addNode = (node) => {
      nodes.push({
        id: node.id.toString(),
        group: node.group,
        value: node.value.toString(),
      });
    };
    const addEdge = (fromNode, toNode) => {
      edges.push({ from: fromNode.id.toString(), to: toNode.id.toString() });
    };
    const traverse = (node) => {
      addNode(node);
      if (node.left) {
        addEdge(node, node.left);
        traverse(node.left);
      }
      if (node.right) {
        addEdge(node, node.right);
        traverse(node.right);
      }
    };
    traverse(this.root);
    console.log({ nodes, edges });
    return { nodes, edges };
  }

  copy() {
    const tree = new BSearchTree();
    const insert = (node) => {
      tree.insert(node.value, node.group);
      if (node.left) insert(node.left);
      if (node.right) insert(node.right);
    };
    insert(this.root);
    tree.setOnGetNode(this.onGetNode);
    return tree;
  }

  resetNodesGroup() {
    this.inOrder((node) => {
      node.group = null;
    });
  }
}

// Convert the data to a binary tree
// including setting the coordinates
// and fill in the missing nodes
function asBinaryTree(data, rootId, isSearchTree) {
  const nodes = data.nodes;
  const edges = data.edges;

  const newNodes = [];
  const newEdges = [];

  // Find nodes without two children
  // and add "fake" nodes to them
  for (const node of nodes) {
    let children = edges.filter((edge) => edge.from === node.id);
    for (let i = 0; i < 2 - children.length; i++) {
      let fakeNode = { id: `${node.id}_phantom_${i}`, group: "phantom" };
      newNodes.push(fakeNode);
      newEdges.push({
        from: node.id,
        to: fakeNode.id,
        normal: {
          stroke: {
            dash: "2 2",
            lineJoin: "round",
          },
        },
      });
    }
  }
  nodes.push(...newNodes);
  edges.push(...newEdges);

  // Find the depth of the tree
  const getDepth = (nodeId) => {
    let children = edges.filter((edge) => edge.from === nodeId);
    if (children.length === 0) return 0;
    return 1 + Math.max(...children.map((edge) => getDepth(edge.to)));
  };

  const depth = getDepth(rootId);

  // Get the depth of a node from the root
  const getDepthFromRoot = (nodeId) => {
    let parent = edges.find((edge) => edge.to === nodeId);
    if (!parent) return 0;
    return 1 + getDepthFromRoot(parent.from);
  };

  // Update the x and y coordinates
  // with narrowing space for each level
  let { x, y } = { x: 0, y: 0 };
  const spacingX = 8;
  const spacingY = 54;
  let root = nodes.find((node) => node.id === rootId);
  root.x = x;
  root.y = y;

  for (const node of nodes) {
    const nodeDepth = getDepthFromRoot(node.id);
    const children = edges.filter((edge) => edge.from === node.id).map((edge) =>
      nodes.find((node) => node.id === edge.to)
    );
    let leftChild = children[0];
    let rightChild = children[1];
    if (
      isSearchTree &&
      leftChild &&
      rightChild &&
      (leftChild.value > node.value ||
      rightChild.value < node.value)
    ) {
      // Swap the children
      [leftChild, rightChild] = [rightChild, leftChild];
    }
    if (leftChild) {
      leftChild.x = node.x - (spacingX * Math.pow(2, depth - nodeDepth)) / 2;
      leftChild.y = node.y + spacingY;
    }
    if (rightChild) {
      rightChild.x = node.x + (spacingX * Math.pow(2, depth - nodeDepth)) / 2;
      rightChild.y = node.y + spacingY;
    }
  }

  console.log({ nodes, edges });

  return { nodes, edges };
}

function createChart(data, containerId, rootId, isSearchTree) {
  // resolve the coordinates
  const binaryTreeData = asBinaryTree(data, rootId, isSearchTree);
  // console.log(binaryTreeData);

  // create a chart and set the data
  let chart = anychart.graph(binaryTreeData);
  // prevent the default behavior of the chart
  chart.interactivity().enabled(false);
  // add a zoom control panel
  var zoomController = anychart.ui.zoom();
  zoomController.target(chart);
  zoomController.render();

  // set the container id
  chart.container(containerId);
  chart.nodes().labels().enabled(true);
  chart.nodes().labels().fontSize(22);
  chart.nodes().labels().position("center-top");
  chart.nodes().labels().fontColor("white");
  chart.nodes().labels().format("{%value}");
  chart.nodes().height(28);
  chart.nodes().width(28);
  chart.nodes().tooltip().format("id: {%id}, group: {%group}, value: {%value}");

  // set type to fixed
  chart.layout().type("fixed");
  const phantoms = chart.group("phantom");
  phantoms.labels().enabled(false);
  phantoms.fill("white");
  // dashed line for phantom nodes
  phantoms.normal().stroke("1 #000000", 2, "2 2", "round");

  // initiate drawing the chart
  chart.draw();

  return chart;
}

// create a chart
window.onload = function () {
  // create data
  let data = {
    nodes: [
      { id: "A", value: "A" },
      { id: "B", value: "B" },
      { id: "C", value: "C" },
      { id: "D", value: "D" },
      { id: "E", value: "E" },
      { id: "F", value: "F" },
      { id: "G", value: "G" },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "B", to: "E" },
      { from: "C", to: "F" },
      { from: "E", to: "G" },
    ],
  };
  createChart(data, "container", "A");

  var tree = new BSearchTree((node) => {
    // console.log(node);
  });
  tree.insert(50);
  tree.insert(45);
  tree.insert(55);
  tree.insert(30);
  tree.insert(46);
  tree.insert(52);
  tree.insert(80);
  tree.insert(51);
  tree.insert(53);
  tree.insert(54);
  tree.insert(82);
  // console.log(tree);
  // console.log(tree.asGraph());
  createChart(tree.asGraph(), "b-tree-container", "0", true);

  var traverseTree = tree.copy();
  console.log(traverseTree);
  let traverseChart = createChart(
    traverseTree.asGraph(),
    "b-tree-container-2",
    "0",
    true
  );

  let snapshots;

  function bTreeTraversal(kind) {
    const tempTraversalTree = tree.copy();
    snapshots = [tempTraversalTree.copy()];
    const action = (node) => {
      node.group = "highlight";
      snapshots.push(tempTraversalTree.copy());
      slider.max = snapshots.length - 1;
      const interval = 100;
      // move the slider automatically
      let index = 0;
      let intervalId = setInterval(() => {
        slider.value = index;
        slider.oninput();
        index++;
        if (index >= snapshots.length) {
          clearInterval(intervalId);
        }
      }, interval);
    };
    // Bind the step slider
    var slider = document.getElementById("traversal-slider");
    slider.oninput = function () {
      let index = parseInt(this.value);
      let snapshot = snapshots[index];
      let treeData = asBinaryTree(snapshot.asGraph(), "0", true);
      traverseChart.data(treeData);
      const highlights = traverseChart.group("highlight");
      highlights.fill("red");
      traverseChart.draw();
    };
    switch (kind) {
      case "inOrder":
        tempTraversalTree.inOrder(action);
        break;
      case "preOrder":
        tempTraversalTree.preOrder(action);
        break;
      case "postOrder":
        tempTraversalTree.postOrder(action);
        break;
    }
  }

  // Bind the buttons
  document.getElementById("in-order").onclick = () => bTreeTraversal("inOrder");
  document.getElementById("pre-order").onclick = () =>
    bTreeTraversal("preOrder");
  document.getElementById("post-order").onclick = () =>
    bTreeTraversal("postOrder");

  // Search

  const searchTree = tree.copy();
  let searchChart = createChart(
    searchTree.asGraph(),
    "b-tree-container-3",
    "0",
    true
  );

  function searchBTree() {
    const value = parseInt(document.getElementById("search-value").value);
    const tempSearchTree = searchTree.copy();
    snapshots = [tempSearchTree.copy()];
    const slider = document.getElementById("search-slider");
    slider.oninput = function () {
      let index = parseInt(this.value);
      let snapshot = snapshots[index];
      let treeData = asBinaryTree(snapshot.asGraph(), "0", true);
      searchChart.data(treeData);
      const highlights = searchChart.group("highlight");
      highlights.fill("red");
      searchChart.draw();
    };
    tempSearchTree.setOnGetNode((node) => {
      node.group = "highlight";
      snapshots.push(tempSearchTree.copy());
      slider.max = snapshots.length - 1;
      const interval = 100;
      // move the slider automatically
      let index = 0;
      let intervalId = setInterval(() => {
        slider.value = index;
        slider.oninput();
        index++;
        if (index >= snapshots.length) {
          clearInterval(intervalId);
        }
      }, interval);
    });
    tempSearchTree.search(value);
  }

  document.getElementById("search-button").onclick = searchBTree;

  // Insert

  const insertTree = tree.copy();
  let insertChart = createChart(
    insertTree.asGraph(),
    "b-tree-container-4",
    "0",
    true
  );

  function insertBTree() {
    const value = parseInt(document.getElementById("insert-value").value);
    const tempInsertTree = insertTree;
    tempInsertTree.resetNodesGroup();
    snapshots = [tempInsertTree.copy()];
    const slider = document.getElementById("insert-slider");
    slider.oninput = function () {
      let index = parseInt(this.value);
      let snapshot = snapshots[index];
      let treeData = asBinaryTree(snapshot.asGraph(), "0", true);
      insertChart.data(treeData);
      const highlights = insertChart.group("highlight");
      highlights.fill("red");
      insertChart.draw();
    };
    tempInsertTree.setOnGetNode((node) => {
      node.group = "highlight";
      snapshots.push(tempInsertTree.copy());
      slider.max = snapshots.length - 1;
      const interval = 100;
      // move the slider automatically
      let index = 0;
      let intervalId = setInterval(() => {
        slider.value = index;
        slider.oninput();
        index++;
        if (index >= snapshots.length) {
          clearInterval(intervalId);
        }
      }, interval);
    });
    tempInsertTree.insert(value);
    console.log(tempInsertTree.asGraph());
  }

  document.getElementById("insert-button").onclick = insertBTree;

  // Remove

  const removeTree = tree.copy();
  let removeChart = createChart(
    removeTree.asGraph(),
    "b-tree-container-5",
    "0",
    true
  );

  function removeBTree() {
    const value = parseInt(document.getElementById("delete-value").value);
    const tempRemoveTree = removeTree.copy();
    snapshots = [tempRemoveTree.copy()];
    const slider = document.getElementById("delete-slider");
    slider.oninput = function () {
      let index = parseInt(this.value);
      let snapshot = snapshots[index];
      let treeData = asBinaryTree(snapshot.asGraph(), "0", true);
      removeChart.data(treeData);
      const highlights = removeChart.group("highlight");
      highlights.fill("red");
      removeChart.draw();
    };
    const addSnapshot = (tree) => {
      snapshots.push(tree.copy());
      slider.max = snapshots.length - 1;
    };
    tempRemoveTree.setOnGetNode((node) => {
      console.log(tempRemoveTree);
      if (node) node.group = "highlight";
      addSnapshot(tempRemoveTree);
      const interval = 100;
      // move the slider automatically
      let index = 0;
      let intervalId = setInterval(() => {
        slider.value = index;
        slider.oninput();
        index++;
        if (index >= snapshots.length) {
          clearInterval(intervalId);
        }
      }, interval);
    });
    tempRemoveTree.remove(value);
    addSnapshot(tempRemoveTree);
  }

  document.getElementById("delete-button").onclick = removeBTree;
};
