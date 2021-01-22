import animateScrollTo from "animated-scroll-to";

class SideScroller {
  constructor() {
    this.scrollContainer = document.querySelector("main");
    this.touchEnded = false;
    this.scrollTimeout = null;

    this.addEventListeners();
  }

  addEventListeners = () => {
    window.addEventListener("wheel", this.windowOnWheel);
    this.scrollContainer.addEventListener("touchstart", () => {
      this.touchEnded = false;
    });
    this.scrollContainer.addEventListener("touchend", () => {
      this.touchEnded = true;
      this.onMobileScroll();
    });
    this.scrollContainer.addEventListener("scroll", this.onMobileScroll);
  };

  windowOnWheel = (e) => {
    this.scrollContainer.scrollLeft += e.deltaY;

    this.setCurrentSection(e);
  };

  onMobileScroll = () => {
    if (this.touchEnded) {
      if (this.scrollTimeout) {
        window.clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = window.setTimeout(() => {
        this.setCurrentSection();
      }, 50);
    }
  };

  setCurrentSection = (e) => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.currentSection = Math.round(
      this.scrollContainer.scrollLeft / window.innerWidth
    );

    this.timeout = window.setTimeout(this.scrollToSectionStart, 250);
  };

  scrollToSectionStart = () => {
    animateScrollTo([this.currentSection * window.innerWidth, null], {
      elementToScroll: this.scrollContainer,
    });
  };
}

export default SideScroller;
