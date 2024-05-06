---
marp: true
theme: qut
paginate: true
math: mathjax
---

<!-- 
_backgroundImage: url('backgrounds/Title.PNG')
_class: title
 -->

# Tutorial 8: Graph Algorithms I

**CAB301 - Algorithms and Complexity**

School of Computer Science, Faculty of Science

---
<!-- 
footer: '**CAB301 - Algorithms and Complexity**<br>School of Computer Science, Faculty of Science'
-->

# Agenda

1. **Lecture Recap**: Graph Algorithms I
   - Graphs
   - Graph Representations
   - Graph Traversals
   - Topological Sort
   - Spanning Tree
2. **Tutorial Questions** + **Q&A**

---

# Graphs

A collection of nodes (**vertices**) and **edges** connecting them.

![graph_example](./backgrounds/graph_example.png)

---

# Directionality and Weight

Graphs can be **directed**, where edges have a direction, or **undirected**.

Graphs can be **weighted**, where edges have a weight, or **unweighted**.

<div style="display: flex; justify-content: center; gap: 100px;">

![directionality](./backgrounds/directionality.png)

<div style="width: 350px; font-size: 25px;"

![weight](./backgrounds/weight.png)

A weighted, undirected graph.

</div>

</div>

---

# Terminology

- **Path**: A sequence of vertices connected by edges.
- **Cycle**: A path that starts and ends at the **same vertex**.
- **Connected**: A graph where there is a path between every pair of vertices.
- **Subgraph**: A graph whose vertices and edges are a subset of another graph.

---

# Graph Representations - Adjacency Matrix

2D array, $A$, where $A[i][j] = w$ if there is an edge from $i$ to $j$ with weight $w$, or $\infty$ if there is no edge. 

If unweighted, $A[i][j] = 1$ if there is an edge, or $0$ if there is no edge.

![adjacency_matrix](./backgrounds/adjacency_matrix.png)

---

# Graph Representations - Adjacency List

For each vertex, $i$, store a list of vertices that $i$ is connected to.

![adjacency_list](./backgrounds/adjacency_list.png)

---

# Graph Traversals

**Depth-First Search (DFS)**: Explore **as far as possible** along each branch before backtracking.

- Uses either a **stack** or **recursion**.

**Breadth-First Search (BFS)**: Explore **all neighbours of a vertex before moving** to the next level.

- Uses a **queue**.

Very similar to tree traversals, but need to keep track of visited vertices (and not visit them again).

---

# Topological Sort

Given a **directed acyclic graph (DAG)**, order the vertices such that for every edge $(u, v)$, $u$ comes before $v$. Steps:

1. Find a vertex with **no incoming edges** (in-degree = 0).
2. Add it to the **topological order**.
3. **Remove** the vertex and its outgoing edges.
4. **Repeat** until all vertices are ordered.

---

# Spanning Tree

A **subgraph** of a graph that is a **tree** and connects all vertices.

Weighted graphs can have a **minimum spanning tree (MST)**, which is a spanning tree with the **minimum total weight**.

<div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">

![minimum_spanning_tree](./backgrounds/minimum_spanning_tree.png)

Minimum Spanning Tree of a weighted graph.

</div>

---

# Kruskal's Algorithm

1. **Sort** edges by weight in **non-decreasing order**.
2. **Iterate** through edges:
   - **Add** edge to MST if it **does not create a cycle**.
   - **Repeat** until $|V| - 1$ edges are added.
3. **Output** the MST.

<div style="display: flex; justify-content: center; gap: 40px;">

![kruskal_1](./backgrounds/kruskal_1.png)

![kruskal_2](./backgrounds/kruskal_2.png)

</div>

---

# Prim's Algorithm

Keep track a set of vertices in the MST, $V_T$ and a set of edges in the MST, $E_T$. Starting with $V_T = \{v_0\}$ and $E_T = \emptyset$, repeat for $|V| - 1$ times:

1. Find a **minimum weight edge** $e^* =(v^*, u^*)$ among edges connecting $V_T$ to the rest of the graph.
2. **Add** $u^*$ to $V_T$.
3. **Add** $e^*$ to $E_T$.

<div style="display: flex; justify-content: center; gap: 40px;">

![prim_1](./backgrounds/prim_1.png)

![prim_2](./backgrounds/prim_2.png)

</div>