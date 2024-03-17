function load() {
  document.querySelectorAll(".hover-line").forEach((item) => {
    // Go through each child of the hover-line element
    item.childNodes.forEach((child) => {
      // Only work for <p> elements
      if (child.tagName !== "P") return;
      // Add mouse click event listener to each child
      child.addEventListener("click", (e) => {
        // Remove the selected class from all children
        item.childNodes.forEach((child) => {
          child.classList?.remove("selected");
        });
        // Add the selected class to the clicked child
        child.classList?.add("selected");
      });
    });
  });
}

window.onload = load;