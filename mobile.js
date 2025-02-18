let highestZ = 1;

class Paper {
  isDragging = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;

  init(paper) {
    paper.style.touchAction = "none"; // Prevent default gestures

    // Start dragging
    paper.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.isDragging = true;

      // Bring the element to the front
      paper.style.zIndex = highestZ++;
      this.startX = e.touches[0].clientX - this.offsetX;
      this.startY = e.touches[0].clientY - this.offsetY;
    });

    // Dragging
    paper.addEventListener("touchmove", (e) => {
      if (!this.isDragging) return;

      e.preventDefault();
      this.currentX = e.touches[0].clientX - this.startX;
      this.currentY = e.touches[0].clientY - this.startY;
      this.offsetX = this.currentX;
      this.offsetY = this.currentY;

      // Move the paper
      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    });

    // Stop dragging
    paper.addEventListener("touchend", () => {
      this.isDragging = false;
    });
  }
}

// Initialize all papers
const papers = document.querySelectorAll(".paper");
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
