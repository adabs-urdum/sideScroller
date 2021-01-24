import gsap from "gsap";

class Collage {
  constructor() {
    this.slides = [...document.querySelectorAll(".slide")];
    this.timelines = {};

    this.initTimelines();
  }

  initTimelines = () => {
    this.slides.forEach((slide, slideKey) => {
      const tl = gsap.timeline();

      const collage = this.slides[slideKey].querySelector(".collage");

      if (collage) {
        const collageBox = collage.getBoundingClientRect();
        const collageWidth = collageBox.width;
        const collageHeight = collageBox.height;

        switch (slideKey) {
          case 1:
            tl.addLabel("slide1", 0)
              .fromTo(
                ".face",
                { rotation: 0, scale: 0.5 },
                {
                  duration: 1,
                  rotation: 720,
                  scale: 1,
                  ease: "back",
                }
              )
              .fromTo(
                ".shiitake1",
                {
                  width: 0,
                  top: (collageHeight / 100) * 45,
                },
                {
                  width: (collageWidth / 100) * 20,
                  top: (collageHeight / 100) * 31.5,
                  duration: 6,
                  ease: "slow",
                },
                "<"
              )
              .fromTo(
                ".shiitake2",
                {
                  width: 0,
                },
                {
                  width: (collageWidth / 100) * 12,
                  duration: 4,
                  ease: "slow",
                },
                "<+=0.2"
              )
              .fromTo(
                ".shiitake3",
                {
                  width: 0,
                },
                {
                  width: (collageWidth / 100) * 15,
                  duration: 5,
                  ease: "slow",
                },
                "<+=0.4"
              )
              .fromTo(
                ".board",
                {
                  opacity: 0,
                  scale: 0,
                  rotate: -15,
                },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 2,
                  rotate: 15,
                  ease: "bounce",
                },
                "0"
              )
              .fromTo(
                ".chili1",
                {
                  rotate: -60,
                  opacity: 0,
                },
                {
                  rotate: -31,
                  opacity: 1,
                  duration: 1.5,
                  ease: "bounce",
                },
                "2.2"
              )
              .fromTo(
                ".chili2",
                {
                  rotate: -60,
                  opacity: 0,
                },
                {
                  rotate: -11.5,
                  opacity: 1,
                  duration: 1.5,
                  ease: "elastic",
                },
                "2.4"
              )
              .fromTo(
                ".code",
                {
                  opacity: 0,
                  left: (collageWidth / 100) * 20,
                },
                {
                  opacity: 1,
                  left: (collageWidth / 100) * 30,
                  duration: 0.5,
                  ease: "elastic",
                },
                "2.2"
              )
              .fromTo(
                ".ski1",
                {
                  rotate: -315,
                },
                {
                  rotate: 45,
                  duration: 40,
                  repeat: -1,
                  ease: "slow",
                },
                "0"
              )
              .fromTo(
                ".ski2",
                {
                  rotate: 420,
                },
                {
                  rotate: 60,
                  duration: 40,
                  repeat: -1,
                  ease: "slow",
                },
                "0"
              );
            break;
          case 2:
            console.log("case2");
            break;
          default:
            console.log("default");
            break;
        }

        tl.pause(0);

        this.timelines[slideKey] = tl;
      }
    });
  };

  playTimeline = (tlKey) => {
    // if this slide conatins collage and tl
    if (this.timelines[tlKey]) {
      this.timelines[tlKey].play();
    }
  };
}

export default Collage;
