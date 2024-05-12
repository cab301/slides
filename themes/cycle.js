window.onload = function () {
  // Cycle through each child and display them, hiding the rest
  document.querySelectorAll(".cycle").forEach((item) => {
    const children = item.children;
    const numChildren = children.length;
    let i = 0;
    Array.from(children).forEach((child) => {
      child.style.display = "none";
      // child.addEventListener("click", onClick);
    });

    // Add two buttons (prev and next) to cycle through the children
    const prev = document.createElement("button");
    prev.innerHTML = "Prev";
    prev.onclick = () => {
      children[i].style.display = "none";
      i = (i - 1 + numChildren) % numChildren;
      children[i].style.display = "block";
    };

    const next = document.createElement("button");
    next.innerHTML = "Next";

    next.onclick = () => {
      children[i].style.display = "none";
      i = (i + 1) % numChildren;
      children[i].style.display = "block";
    };

    item.appendChild(next);
    item.appendChild(prev);
    children[i].style.display = "block";
  });
};