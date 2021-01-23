"use strict";

import "babel-polyfill";
import GACE from "./googleAnalyticsCustomEvents";
import SideScroller from "./component/SideScroller";
import Collage from "./component/Collage";
import gsap from "gsap";

Array.prototype.shuffle = function () {
  return this.sort(function () {
    return Math.random() - 0.5;
  });
};

Array.prototype.getRandomValue = function () {
  return this.shuffle()[0];
};

Array.prototype.uniqueValues = function () {
  return [...new Set(this)];
};

document.addEventListener("DOMContentLoaded", function () {
  // set GA-ID
  // const gace = new GACE({
  //   id: "UA-164327129-1",
  // });

  const collageAnim = new Collage();

  const sidescroller = new SideScroller({
    snapSection: true,
    snapCallback: () => {
      // reset all anims but current slides one
      Object.keys(collageAnim.timelines).forEach((tlKey) => {
        const tl = collageAnim.timelines[tlKey];
        if (tlKey !== sidescroller.currentSection) {
          tl.pause(0);
        }
      });

      // play current anim
      collageAnim.playTimeline(sidescroller.currentSection);
    },
  });
});
