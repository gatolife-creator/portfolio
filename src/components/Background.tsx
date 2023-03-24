import p5 from "p5";
import Sketch from "react-p5";
import { Point, Quad } from "../react-shapeshape";

const Background = () => {
  let canvas;
  let r: number;

  let quads: Quad[];

  let x = 90;
  let xs = 1 / 3;
  let m: number;
  let n: number;

  const setup = (p5: any, canvasParentsRef: any) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentsRef
    );
    p5.angleMode(p5.DEGREES);
  };

  const draw = (p5: any) => {
    p5.background("#2D1B69");
    r = Math.min(window.innerWidth * 2, window.innerHeight * 2) / 2;
    p5.translate(p5.width / 2, p5.height / 2);

    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke("white");

    x += xs;
    m = 100 - x;
    n = x;

    quads = [
      new Quad(
        new Point(p5.cos(0) * r, p5.sin(0) * r),
        new Point(p5.cos(90) * r, p5.sin(90) * r),
        new Point(p5.cos(180) * r, p5.sin(180) * r),
        new Point(p5.cos(270) * r, p5.sin(270) * r)
      ),
    ];

    if (x >= 99 || x <= 1) {
      xs = 0;
    }

    for (let i = 0; i < 30; i++) {
      let newQuad = new Quad(
        quads[i].l1.getInteriorPoint(m, n)!,
        quads[i].l2.getInteriorPoint(m, n)!,
        quads[i].l3.getInteriorPoint(m, n)!,
        quads[i].l4.getInteriorPoint(m, n)!
      );
      quads.push(newQuad);
    }

    for (let quad of quads) {
      quad.draw(p5);
    }
  };

  const windowResized = (p5: any) => {
    canvas = p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  return (
    <Sketch
      className="fixed top-0 left-0 -z-50 "
      setup={setup}
      draw={draw}
      windowResized={windowResized}
    />
  );
};

export default Background;
