---
marp: true
theme: qut
paginate: true
math: mathjax
---

<script src="./themes/cycle.js"></script>

<!-- 
_backgroundImage: url('backgrounds/Title.PNG')
_class: title
 -->

# Tutorial 9: Graph Algorithms II

**CAB301 - Algorithms and Complexity**

School of Computer Science, Faculty of Science

---
<!-- 
footer: '**CAB301 - Algorithms and Complexity**<br>School of Computer Science, Faculty of Science'
-->

# Agenda

1. **Lecture Recap**: Graph Algorithms II
   - Shortest Path Problem
   - Dijkstra's Algorithm
   - Floyd's Algorithm

2. **Tutorial Questions** + **Q&A**

---

# The Shortest Path Problem

**What's the shortest path from A to B?**

![alt text](./backgrounds/shortest_path_problem.png)

It's actually A → E → C → B, with a total weight of 6 units, instead of A → B with a total weight of 8 units.

---

# Dijkstra's Algorithm

<small>

Find the shortest path from a **start node to all other nodes** in a weighted graph, by 1) visit nearest node, and 2) update the distances of unvisited nodes, via the selected node.

</small>

<div style="display: flex">

<div style="flex: 0.5">

![alt text](./backgrounds/example_graph.png)

</div>

<div style="flex: 0.5">

![alt text](./backgrounds/dijkstra_table.png)

</div>

</div>

<small>

**Example**: In step 2, we select $E$ as the nearest node from $A$, and for each vertex not yet visited (i.e., $B,C,D$), we compare the current shortest path with the path through $E$.

</small>

---

# Floyd's Algorithm

<small>

Find the shortest path between **all pairs of nodes** in a weighted graph, by 1) consider all nodes as **intermediate nodes**, and 2) update the shortest path if a shorter path is found.

</small>

<div style="display: flex">

<div style="flex: 0.6">

![alt text](./backgrounds/example_graph.png)

</div>

<div style="flex: 0.4" class="cycle">

<div>

![alt text](./backgrounds/floyd_1.png)

Start with adjacency matrix.

</div>

<div style="font-size: 20px">

![alt text](./backgrounds/floyd_2.png)

Update each cell, via $A$ (add row + column, and replace if smaller).

</div>

<div>

![alt text](./backgrounds/floyd_3.png)

</div>

<div>

![alt text](./backgrounds/floyd_4.png)

</div>

<div>

![alt text](./backgrounds/floyd_5.png)

</div>

<div>

![alt text](./backgrounds/floyd_6.png)

</div>

<div style="font-size: 20px">

![alt text](./backgrounds/floyd_7.png)

Result (shortest path between all pairs)

</div>

</div>