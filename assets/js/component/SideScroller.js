import animateScrollTo from "animated-scroll-to";

class SideScroller {
  constructor(init) {
    this.scrollContainer = document.querySelector("main");
    this.touchEnded = false;
    this.scrollTimeout = null;
    this.currentSection = 0;
    this.currentSectionChanged = false;
    this.snapSection = init.snapSection;
    this.snapCallback = init.snapCallback;

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
    if (this.snapTimeout) {
      window.clearTimeout(this.snapTimeout);
    }

    const newSection = Math.round(
      this.scrollContainer.scrollLeft / window.innerWidth
    );
    if (newSection !== this.currentSection) {
      this.currentSectionChanged = true;
      this.currentSection = newSection;
    }

    if (this.snapSection) {
      this.snapTimeout = window.setTimeout(this.scrollToSectionStart, 250);
    }
  };

  scrollToSectionStart = () => {
    animateScrollTo([this.currentSection * window.innerWidth, null], {
      elementToScroll: this.scrollContainer,
    }).then(() => {
      if (this.currentSectionChanged) {
        this.currentSectionChanged = false;
        this.snapCallback();
      }
    });
  };
}

export default SideScroller;
