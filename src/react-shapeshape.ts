/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
class Manager {
    static displayError(conditions: string[]) {
        let message = `ConditionalError: You must follow the following rules:`;
        for (const condition of conditions) {
            message += `\n\t${condition}`;
        }
        throw message;
    }
}

class Point {
    x: number;
    y: number;

    /**
     *
     * @param x X coordinate
     * @param y Y coordinate
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Find the distance between 2 points.
     * 2点間の距離を求める。
     * */
    static dist(p1: Point, p2: Point) {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }

    draw(p5: any) {
        p5.point(this.x, this.y);
    }
}

class Line {
    start: Point;
    end: Point;

    /**
     *
     * @param start Coordinate of start point
     * @param end Coordinate of end point
     */
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    /**
     * Find the inner division.
     * 内分点を求める。
     *  */
    getInteriorPoint(m: number, n: number) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        } else {
            return new Point(
                (this.start.x * n + this.end.x * m) / (m + n),
                (this.start.y * n + this.end.y * m) / (m + n)
            );
        }
    }

    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    getLength() {
        return Point.dist(this.start, this.end);
    }

    draw(p5: any) {
        p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}

class Quad {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    l1: Line;
    l2: Line;
    l3: Line;
    l4: Line;

    /**
     *
     * @param p1 First point of the quad.
     * @param p2 Second point of the quad.
     * @param p3 Third point of the quad.
     * @param p4 Forth point of the quad.
     */
    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.l1 = new Line(this.p1, this.p2);
        this.l2 = new Line(this.p2, this.p3);
        this.l3 = new Line(this.p3, this.p4);
        this.l4 = new Line(this.p4, this.p1);
    }

    draw(p5: any) {
        p5.beginShape();
        p5.vertex(this.p1.x, this.p1.y);
        p5.vertex(this.p2.x, this.p2.y);
        p5.vertex(this.p3.x, this.p3.y);
        p5.vertex(this.p4.x, this.p4.y);
        p5.endShape(p5.CLOSE);
    }
}

export { Point, Line, Quad }