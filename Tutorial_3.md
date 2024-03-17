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

# Tutorial 3: Linear Data Structures and Search Algorithms

**CAB301 - Algorithms and Complexity**

School of Computer Science, Faculty of Science

---
<!-- 
footer: '**CAB301 - Algorithms and Complexity**<br>School of Computer Science, Faculty of Science'
-->

# Agenda

1. Recap:
   1. Linear Data Structures
   2. Search Algorithms
2. Tutorial Questions:
   1. **Part A**: Linear Data Structure - Stack
   2. **Part B**: Searching Algorithms - Binary Search
   3. **Part C**: Programming tasks - Stack, Circular Linked List, Collections of Custom Objects

---

# Recap: Linear Data Structures

A **data structure** stores and organises data so that it can be accessed and modified efficiently.

Provides operations such as **insertion**, **deletion**, **searching**, and **sorting**.

**Linear Data Structure**:

- Elements stored in a sequence
- Except for first and last, each element has a unique predecessor and successor
- *Examples*: Array, Linked List, Stack, Queue

```csharp
int[] numbers = new int[5] { 1, 2, 3, 4, 5 };
```

---

# Recap: Search Algorithms

**Searching** is used to find an element in a collection of elements, to either:

- Confirm if the element exists
- Get the key (e.g., index) of the element

| | **Sequential Search** | **Binary Search** |
|---|---|---|
| **Idea** | Go through each element one by one from start | Reduce the search space by half each time |
| **Time Complexity** | $\mathcal{O}(n)$ | $\mathcal{O}(\log n)$ |

---

# Part A - Question 1: Stack

<div style="display: flex">

<div style="flex: 0.5">

- **Enqueue**(4)
- **Enqueue**(1)
- **Enqueue**(3)
- **Dequeue**()
- **Enqueue**(8)
- **Dequeue**()

</div>

| Index | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| **Value** | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> |
| **Head** | <input style="width: 15px" value="x"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> |
| **Tail** | <input style="width: 15px" value="x"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> |

</div>

When **Enqueue**: Insert at the **Tail**, then move the **Tail** to the next index.

When **Dequeue**: Remove from the **Head**, then move the **Head** to the next index.

---

# Part A - Question 2: Binary Search

<script src="./themes/hover-line.js"></script>

<small style="font-size: 20px" class="hover-line">

**ALGORITHM** BinarySearch($A[0..n-1]$, $K$)

$l \leftarrow 0$; $r \leftarrow n-1$

**while** $l \leq r$ **do**

$\quad$$m \leftarrow \lfloor (l+r)/2 \rfloor$

$\quad$**if** $A[m] = K$ **then**

$\quad\quad$**return** $m$

$\quad$**else if** $A[m] < K$ **then**

$\quad\quad$$l \leftarrow m+1$

$\quad$**else**

$\quad\quad$$r \leftarrow m-1$

</small>

3, 14, 27, 31, 39, 42, 55, 70, 74, 81, 85, 93, 98