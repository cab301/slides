---
marp: true
theme: qut
paginate: true
math: mathjax
---

<script src="./themes/hover-line.js"></script>

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
- _Examples_: Array, Linked List, Stack, Queue

```csharp
int[] numbers = new int[5] { 1, 2, 3, 4, 5 };
```

---

# Recap: Search Algorithms

**Searching** is used to find an element in a collection of elements, to either:

- Confirm if the element exists
- Get the key (e.g., index) of the element

|                     | **Sequential Search**                         | **Binary Search**                         |
| ------------------- | --------------------------------------------- | ----------------------------------------- |
| **Idea**            | Go through each element one by one from start | Reduce the search space by half each time |
| **Time Complexity** | $\mathcal{O}(n)$                              | $\mathcal{O}(\log n)$                     |

---

# Part A - Question 1: Stack

Perform the following operations on a **Stack** with a capacity of 6:

<div style="display: flex">

<div style="flex: 0.5" class="hover-line">

**Enqueue**(4)

**Enqueue**(1)

**Enqueue**(3)

**Dequeue**()

**Enqueue**(8)

**Dequeue**()

</div>

| Index     | 0                                     | 1                           | 2                           | 3                           | 4                           | 5                           |
| --------- | ------------------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| **Value** | <input style="width: 15px">           | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> |
| **Head**  | <input style="width: 15px" value="x"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> |
| **Tail**  | <input style="width: 15px" value="x"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> |

</div>

When **Enqueue**: Insert at the **Tail**, then move the **Tail** to the next index.

When **Dequeue**: Remove from the **Head**, then move the **Head** to the next index.

---

# Part B - Question 2: Binary Search

<small style="margin: 0 -60px; font-size: 22px; display: flex;" >

<div style="flex: 1" class="hover-line">

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

</div>

<div>

| Values     | 3                           | 14                          | 27                          | 31                          | 39                          | 42                          | 55                          | 70                          | 74                          | 81                          | 85                          | 93                          | 98                          |
| ---------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| **Index** | 0                           | 1                           | 2                           | 3                           | 4                           | 5                           | 6                           | 7                           | 8                           | 9                           | 10                          | 11                          | 12                          |
| **Cursor** | <input style="width: 15px" value="l"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px"> | <input style="width: 15px" value="r"> |

**Note**: $\lfloor (l+r)/2 \rfloor$ is the rounded down value of $\frac{l+r}{2}$.

For example, in the first iteration, $l=0$, $r=13$, and $m=\lfloor (0+13)/2 \rfloor = 6$.

</div>

</small>

---

# Part C - Question 3: Stack Implementation

Implement a **Stack** in C# using an **Array**.

Provides the following:

- `Size`: number of elements in the stack
- `Empty`: `true` if the stack is empty, `false` otherwise
- `Push`: add an element to the top of the stack
- `Pop`: remove and return the top element of the stack
- `Peek`: return the top element of the stack without removing it

Use the skeleton provided.

---

# Part C - Question 4: Circular Linked List

Implement a **Circular Linked List** in C#, from the following interface:

```csharp
public interface IQueue {
   int Capacity { get; }
   int Count { get; }
   bool IsEmpty();
   bool IsFull();
   void Enqueue(int value);
   Object Dequeue();
   Object Head();
   void Clear();
}
```

---

# Part C - Question 5: Custom Objects

Create a `CustomerCollection` class in C# that stores `Customer` objects (with `FirstName`, `LastName`, and `Phone`).

Implement the following operations:

- `Find(string firstName, string lastName)`: returns the associated `Phone` number
- `Insert(string firstName, string lastName)`
- `Insert(Customer customer)`
- `Delete(string firstName, string lastName)`
- `Display()`: prints all the `Customer` objects