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
    r = Math.min(window.innerWidth, window.innerHeight);
    p5.translate(window.innerWidth / 2, window.innerHeight / 2);

    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke("white");

    if (x < 98.5) {
      x += xs;
      m = 100 - x;
      n = x;
    }

    quads = [
      new Quad(
        new Point(p5.cos(0) * r, p5.sin(0) * r),
        new Point(p5.cos(90) * r, p5.sin(90) * r),
        new Point(p5.cos(180) * r, p5.sin(180) * r),
        new Point(p5.cos(270) * r, p5.sin(270) * r)
      ),
    ];

    for (let i = 0; i < 15; i++) {
      const quad = quads[i];
      let newQuad = new Quad(
        quad.l1.getInteriorPoint(m, n)!,
        quad.l2.getInteriorPoint(m, n)!,
        quad.l3.getInteriorPoint(m, n)!,
        quad.l4.getInteriorPoint(m, n)!
      );
      quads.push(newQuad);
      quad.draw(p5);
    }
  };

  const windowResized = (p5: any) => {
    canvas = p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  return (
    <Sketch
      className="fixed top-0 left-0 -z-50"
      setup={setup}
      draw={draw}
      windowResized={windowResized}
    />
  );
};

export default Background;
