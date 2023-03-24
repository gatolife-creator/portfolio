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

    /**
     * In search of the middle point.
     * 中点を求める。
     *  */
    static getMidpoint(p1: Point, p2: Point) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }

    /**
     * Finding a symmetrical point for specific points.
     * 特定の点に対して対称な点を求める。
     * */
    static getSymmetricPoint(p: Point, center: Point) {
        const x = center.x - p.x;
        const y = center.y - p.y;
        return new Point(center.x + x, center.y + y);
    }

    /**
     * Finding the center of gravity between 3 points.
     * 3点間の重心を求める。
     * */
    static getBarycenter(p1: Point, p2: Point, p3: Point) {
        return new Point((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3);
    }

    /**
     * Finding the circumcenter.
     * 外心を求める。
     */
    static getCircumcenter(p1: Point, p2: Point, p3: Point) {
        const l1 = new Line(p1, p2);
        const l2 = new Line(p2, p3);

        const perpendicularBisector1 = l1.getPerpendicularBisector();
        const perpendicularBisector2 = l2.getPerpendicularBisector();

        return perpendicularBisector1.getIntersection(perpendicularBisector2);
    }

    /**
     * Finding the orthocenter.
     * 垂心を求める。
     */
    static getOrthocenter(p1: Point, p2: Point, p3: Point) {
        const x1 = p1.x;
        const y1 = p1.y;
        const x2 = p2.x;
        const y2 = p2.y;
        const x3 = p3.x;
        const y3 = p3.y;

        const l1 = new Linear(`${(y2 - y1) / (x2 - x1)}x+${-((y2 - y1) / (x2 - x1)) + y1}`);
        const l2 = new Linear(`${(y3 - y2) / (x3 - x2)}x+${-((y3 - y2) / (x3 - x2)) + y2}`);

        const perpendicularLinear1 = l1.getPerpendicularLinear(p3);
        const perpendicularLinear2 = l2.getPerpendicularLinear(p1);

        return perpendicularLinear1.getIntersection(perpendicularLinear2);
    }

    /**
     * Finding the inner center.
     * 内心を求める。
     */
    static getInnerCenter(p1: Point, p2: Point, p3: Point) {
        const A = p1;
        const B = p2;
        const C = p3;

        const AB = new Line(A, B);
        const BC = new Line(B, C);
        const CA = new Line(C, A);

        const P = BC.getDividingPoint(AB.getLength(), CA.getLength());
        const Q = CA.getDividingPoint(BC.getLength(), AB.getLength());

        const AP = new Line(A, P);
        const BQ = new Line(B, Q);

        return AP.getIntersection(BQ);
    }

    /**
     * Finding the excenters.
     * 傍心を求める。
     */
    static getExcenters(p1: Point, p2: Point, p3: Point) {
        const A = p1;
        const B = p2;
        const C = p3;

        const BA = new Line(A, B);
        const CB = new Line(B, C);
        const AC = new Line(C, A);

        const P = CB.getDividingPoint(BA.getLength(), -AC.getLength());
        const Q = BA.getDividingPoint(AC.getLength(), -CB.getLength());
        const R = AC.getDividingPoint(CB.getLength(), -BA.getLength());

        const AP = new Line(A, P);
        const CQ = new Line(C, Q);
        const BR = new Line(B, R);

        return [AP.getIntersection(CQ), CQ.getIntersection(BR), BR.getIntersection(AP)];
    }

    /**
     * Finding a secondary function through 3 points.
     * 3点を通る二次関数を求める。
     */
    static estimateQuadraticByThreePoints(p1: Point, p2: Point, p3: Point) {
        const x1 = p1.x;
        const y1 = p1.y;
        const x2 = p2.x;
        const y2 = p2.y;
        const x3 = p3.x;
        const y3 = p3.y;

        const b =
            (
                ((y3 - y1) * x2 ** 2 - (y3 - y1) * x1 ** 2) -
                ((y2 - y1) * x3 ** 2 - (y2 - y1) * x1 ** 2)
            ) /
            ((x2 - x1) * (x1 ** 2 - x3 ** 2) -
                ((x3 - x1) * (x1 ** 2 - x2 ** 2)
                )
            );

        const a = ((y2 - y1) - b * (x2 - x1)) / (x2 ** 2 - x1 ** 2);

        const c = y1 - a * x1 ** 2 - b * x1;

        return new Quadratic(`${a}x^2+${b}x+${c}`);
    }

    /**
     * Enlarge and shrink according to the reference point.
     * 基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, this);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        return new Point(p1.x, p1.y);
    }

    /**
     * Find the origin.
     * 原点を求める。
     *  */
    static O() {
        return new Point(0, 0);
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
     * Find the point that divides the line.
     * 線分を二分する点を求める。
     *  */
    getMidpoint() {
        return Point.getMidpoint(this.start, this.end);
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
     * Finding the outer sorting point.
     * 外分点を求める。
     *  */
    getExteriorPoint(m: number, n: number) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        } else {
            return new Point(
                (-this.start.x * n + this.end.x * m) / (m - n),
                (-this.start.y * n + this.end.y * m) / (m - n)
            );
        }
    }

    /**
     * Incidental divisions and outer sarings.
     * 内分点、外分点を求める。
     */
    getDividingPoint(m: number, n: number) {
        return new Point(
            (this.start.x * n + this.end.x * m) / (m + n),
            (this.start.y * n + this.end.y * m) / (m + n)
        );
    }

    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    getLength() {
        return Point.dist(this.start, this.end);
    }

    /**
     * Find the distance between a point and a straight line.
     * 点と直線の距離を求める。
     *  */
    getDistBetweenPoint(p: Point) {
        const a =
            (this.end.y - this.start.y) /
            (this.end.x - this.start.x);
        const b = -1;
        const c = this.start.y - (a * this.start.x);
        if (a === Infinity) return Math.abs(this.start.x - p.x);
        return Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a ** 2 + b ** 2);
    }

    /**
     * Finding the intersection between straight lines, including extensions.
     * 延長線上を含め直線同士の交点を求める。
     */
    getIntersection(l: Line) {
        const a = (l.end.y - l.start.y) / (l.end.x - l.start.x);
        const b = l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x;
        const c = (this.end.y - this.start.y) / (this.end.x - this.start.x);
        const d = this.start.y - (this.end.y - this.start.y) / (this.end.x - this.start.x) * this.start.x;
        if (a === c) return new Point(NaN, NaN);
        else if (a === Infinity) return new Point(l.start.x, c * l.start.x + d);
        else if (c === Infinity) return new Point(this.start.x, a * this.start.x + b);
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    }

    /**
     * Finding the intersection between straight lines.
     * 直線同士の交点を求める。
     */
    getIntersectionStrict(l: Line) {
        const x1 = this.start.x;
        const y1 = this.start.y;
        const x2 = this.end.x;
        const y2 = this.end.y;
        const x3 = l.start.x;
        const y3 = l.start.y;
        const x4 = l.end.x;
        const y4 = l.end.y;

        const a1 = (y2 - y1) / (x2 - x1);
        const a2 = (y4 - y3) / (x4 - x3);

        const x = (a1 * x1 - y1 - a2 * x3 + y3) / (a1 - a2);
        const y = (y2 - y1) / (x2 - x1) * (x - x1) + y1;

        if (Math.abs(a1) === Math.abs(a2)) return new Point(NaN, NaN);


        if (x > Math.max(x1, x2) || x > Math.max(x3, x4) ||
            y > Math.max(y1, y2) || y > Math.max(y3, y4) ||
            x < Math.min(x1, x2) || x < Math.min(x3, x4) ||
            x < Math.min(x1, x2) || y < Math.min(y3, y4)) return new Point(NaN, NaN);
        // else if (a1 === Infinity) return new Point(this.start.x, a2* this.start.x + l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x)
        // else if (a2 === Infinity) return new Point(l.start.x, a1 * l.start.x + l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x);
        return new Point(x, y);
    }

    /**
     * Finding a vertical binary division.
     * 垂直二等分線を求める。
     */
    getPerpendicularBisector() {
        const x1 = this.start.x;
        const y1 = this.start.y;
        const x2 = this.end.x;
        const y2 = this.end.y;

        const linear = new Linear(`${(y2 - y1) / (x2 - x1)}x+${(-(y2 - y1) / (x2 - x1) * x1) + y1}`);

        return linear.getPerpendicularLinear(this.getMidpoint());
        // 戻り値が関数ってやばくね？
    }

    /**
     * Enlarge a straight line according to the reference point.
     * 直線を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, this.start);
        const l2 = new Line(center, this.end);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return new Line(p1, p2);
    }

    draw(p5: any) {

        p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}

class Triangle {
    p1: Point;
    p2: Point;
    p3: Point;
    l1: Line;
    l2: Line;
    l3: Line;
    /**
     *
     * @param p1 First point of the triangle.
     * @param p2 Second point of the triangle.
     * @param p3 Third point of the triangle.
     */
    constructor(p1: Point, p2: Point, p3: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.l1 = new Line(this.p1, this.p2);
        this.l2 = new Line(this.p2, this.p3);
        this.l3 = new Line(this.p3, this.p1);
    }

    /**
     * Finding a triangular center of gravity.
     * 三角形の重心を求める。
     *  */
    getBarycenter() {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    }

    /**
     * Finding the circumcenter.
     * 三角形の外心を求める。
     */
    getCircumcenter() {
        return Point.getCircumcenter(this.p1, this.p2, this.p3);
    }

    /**
     * Finding the circumscribed circle.
     * 三角形の外接円を求める。
     */
    getCircumscribedCircle() {
        const circumcenter = this.getCircumcenter();
        const r = Point.dist(circumcenter, this.p1);
        return new Circle(circumcenter.x, circumcenter.y, r);
    }

    /**
     * Finding the orthocenter.
     * 三角形の垂心を求める。
     */
    getOrthocenter() {
        return Point.getOrthocenter(this.p1, this.p2, this.p3);
    }

    /**
     * Finding the inner center.
     * 三角形の内心を求める。
     */
    getInnerCenter() {
        return Point.getInnerCenter(this.p1, this.p2, this.p3);
    }

    /**
     * Finding the inscribe circle.
     * 三角形の内接円を求める。
     */
    getInscribedCircle() {
        const innerCenter = this.getInnerCenter();
        const r = this.l1.getDistBetweenPoint(innerCenter);
        return new Circle(innerCenter.x, innerCenter.y, r);
    }

    /**
     * Finding the excenters.
     * 三角形の傍心を求める。
     */
    getExcenters() {
        return Point.getExcenters(this.p1, this.p2, this.p3);
    }

    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    getAroundLength() {
        const p1 = new Line(this.p1, this.p2);
        const p2 = new Line(this.p2, this.p3);
        const p3 = new Line(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
    }

    /**
     * Find a triangle area.
     * 三角形の面積を求める。
     *  */
    getArea() {
        return (
            (1 / 2) *
            Math.abs(
                (this.p1.x - this.p3.x) * (this.p2.y - this.p3.y) -
                (this.p2.x - this.p3.x) * (this.p1.y - this.p3.y)
            )
        );
    }

    /**
     * In search of a symmetrical triangle for the reference point.
     * 基準点に対して対称な三角形を求める。
     */
    getSymmetricTriangle(center: Point) {
        return new Triangle(
            Point.getSymmetricPoint(this.p1, center),
            Point.getSymmetricPoint(this.p2, center),
            Point.getSymmetricPoint(this.p3, center)
        );
    }

    /**
     * Enlarge and reduce the triangle according to the reference point.
     * 三角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, this.p1);
        const l2 = new Line(center, this.p2);
        const l3 = new Line(center, this.p3);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        const p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return new Triangle(p1, p2, p3);
    }

    draw(p5: any) {

        p5.triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
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

    /**
     * Find a square area.
     * 四角形の面積を求める。
     *  */
    getArea() {
        const triangle1 = new Triangle(this.p1, this.p2, this.p3);
        const triangle2 = new Triangle(this.p2, this.p3, this.p4);
        return triangle1.getArea() + triangle2.getArea();
    }

    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    getAroundLength() {
        const l1 = new Line(this.p1, this.p2);
        const l2 = new Line(this.p2, this.p3);
        const l3 = new Line(this.p3, this.p4);
        const l4 = new Line(this.p4, this.p1);
        return l1.getLength() + l2.getLength() + l3.getLength() + l4.getLength();
    }

    /**
     * Find a symmetrical square for reference points.
     * 基準点に対して対称な四角形を求める。
     */
    getSymmetricQuad(center: Point) {
        return new Quad(
            Point.getSymmetricPoint(this.p1, center),
            Point.getSymmetricPoint(this.p2, center),
            Point.getSymmetricPoint(this.p3, center),
            Point.getSymmetricPoint(this.p4, center)
        );
    }

    /**
     * Enlarge and reduce the square according to the reference point.
     * 四角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, this.p1);
        const l2 = new Line(center, this.p2);
        const l3 = new Line(center, this.p3);
        const l4 = new Line(center, this.p4);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        const p3 = l3.getDividingPoint(-magnification, magnification - 1);
        const p4 = l4.getDividingPoint(-magnification, magnification - 1);
        return new Quad(p1, p2, p3, p4);
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

class Polygon {
    points: Point[];
    lines: Line[];

    /**
     *
     * @param points Points tha make up the polygon.
     */
    constructor(points: Point[]) {
        this.points = points;
        this.lines = [];
        for (let i = 0; i < this.points.length; i++) {
            if (i < this.points.length - 1) {
                this.lines.push(
                    new Line(this.points[i], this.points[i + 1])
                );
            } else {
                this.lines.push(
                    new Line(this.points[i], this.points[0])
                );
            }
        }
    }

    /**
     * Find the sum of the length of the polygon.
     * 多角形の辺の長さの和を求める。
     */
    getAroundLength() {
        let result = 0;
        for (const line of this.lines) {
            result += line.getLength();
        }
        return result;
    }

    /**
     * Find a symmetrical polygon for reference points.
     * 基準点に対して対称な多角形を求める。
     */
    getSymmetricPolygon(center: Point) {
        const points: Point[] = [];
        for (const point of this.points) {
            points.push(Point.getSymmetricPoint(point, center));
        }
        return new Polygon(points);
    }

    /**
     * Enlarge and reduce the polygon according to the reference point.
     * 多角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const magnifiedPoints: Point[] = [];
        for (const point of this.points) {
            const l = new Line(center, point);
            const p = l.getDividingPoint(-magnification, magnification - 1);
            magnifiedPoints.push(p);
        }
        return new Polygon(magnifiedPoints);
    }

    draw(p5: any) {

        p5.beginShape();
        for (const point of this.points) {

            p5.vertex(point.x, point.y);
        }

        p5.endShape(p5.CLOSE);
    }
}

class Circle {
    center: Point;
    x: number;
    y: number;
    r: number;
    d: number;
    /**
     *
     * @param x X coordinate of the circle.
     * @param y Y coordinate of the circle.
     * @param r Radius of the circle.
     */
    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.center = new Point(x, y);
        this.r = r;
        this.d = r * 2;
    }

    /**
     * Find the length of the circumference.
     * 円周の長さを求める。
     */
    getAround() {
        return 2 * Math.PI * this.r;
    }

    /**
     * Find the area of the circle.
     * 円の面積をもとめる。
     */
    getArea() {
        return Math.PI * this.r ** 2;
    }

    /**
     * Find a symmetrical circle for the reference point.
     * 基準点に対して対称な円を求める。
     */
    getSymmetricCircle(center: Point) {
        const p = this.center;
        const { x, y } = Point.getSymmetricPoint(p, center);
        return new Circle(x, y, this.r);
    }

    /**
     * Enlarge and reduce the circle according to the reference point.
     * 円を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, this.center);
        const p = l1.getDividingPoint(-magnification, magnification - 1);
        return new Circle(p.x, p.y, this.r * magnification);
    }

    draw(p5: any) {

        p5.circle(this.x, this.y, this.d);
    }
}

class Point3D {
    x: number;
    y: number;
    z: number;

    /**
     *
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     */
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static dist(p1: Point3D, p2: Point3D) {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2);
    }

    /**
     * In search of the middle point.
     * 中点を求める。
     *  */
    static getMidpoint(p1: Point3D, p2: Point3D) {
        return new Point3D((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
    }

    /**
     * Finding a symmetrical point for specific points.
     * 特定の点に対して対称な点を求める。
     * */
    static getSymmetricPoint(p: Point3D, center: Point3D) {
        const x = center.x - p.x;
        const y = center.y - p.y;
        const z = center.z - p.z;
        return new Point3D(center.x + x, center.y + y, center.z + z);
    }

    /**
     * Finding the center of gravity between 3 points.
     * 3点間の重心を求める。
     * */
    static getBarycenter(p1: Point3D, p2: Point3D, p3: Point3D) {
        return new Point3D((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3, (p1.z + p2.z + p3.z) / 3);
    }

    magnify(center: Point3D, magnification: number) {
        const l1 = new Line3D(center, this);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        return new Point3D(p1.x, p1.y, p1.z);
    }
    /**
     * Find the origin
     * 原点を求める。
     *  */
    static O() {
        return new Point3D(0, 0, 0);
    }

    draw(p5: any) {

        p5.point(this.x, this.y, this.z);
    }
}

class Line3D {
    start: Point3D;
    end: Point3D;

    /**
     *
     * @param start Coordinate of start point.
     * @param end Coordinate of end point.
     */
    constructor(start: Point3D, end: Point3D) {
        this.start = start;
        this.end = end;
    }

    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    getLength() {
        return Point3D.dist(this.start, this.end);
    }

    /**
     * Finding the point that divides lines
     * 線を二等分する点を求める。
     *  */
    getMidpoint() {
        return Point3D.getMidpoint(this.start, this.end);
    }

    /**
     * Find the inner division.
     * 内分点を求める。
     *  */
    getInteriorPoint(m: number, n: number) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        } else {
            return new Point3D(
                (this.start.x * n + this.end.x * m) / (m + n),
                (this.start.y * n + this.end.y * m) / (m + n),
                (this.start.z * n + this.end.z * m) / (m + n)
            );
        }
    }

    /**
     * Finding the outer sorting point.
     * 外分点を求める。
     *  */
    getExteriorPoint(m: number, n: number) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        } else {
            return new Point3D(
                (-this.start.x * n + this.end.x * m) / (m - n),
                (-this.start.y * n + this.end.y * m) / (m - n),
                (-this.start.z * n + this.end.z * m) / (m - n)
            );
        }
    }

    /**
     * Incidental divisions and outer sarings.
     * 内分点、外分点を求める。
     */
    getDividingPoint(m: number, n: number) {
        return new Point3D(
            (this.start.x * n + this.end.x * m) / (m + n),
            (this.start.y * n + this.end.y * m) / (m + n),
            (this.start.z * n + this.end.z * m) / (m + n)
        );
    }

    /**
     * Enlarge and reduce the line according to the reference point.
     * 線を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number) {
        const l1 = new Line3D(center, this.start);
        const l2 = new Line3D(center, this.end);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return new Line3D(p1, p2);
    }

    draw(p5: any) {

        p5.line(this.start.x, this.start.y, this.start.z, this.end.x, this.end.y, this.end.z);
    }
}

class Triangle3D {
    p1: Point3D;
    p2: Point3D;
    p3: Point3D;
    l1: Line3D;
    l2: Line3D;
    l3: Line3D;

    /**
     *
     * @param p1 First point of the Triangle.
     * @param p2 Second point of the Triangle.
     * @param p3 Third point of the Triangle.
     */
    constructor(p1: Point3D, p2: Point3D, p3: Point3D) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.l1 = new Line3D(p1, p2);
        this.l2 = new Line3D(p2, p3);
        this.l3 = new Line3D(p3, p1);
    }

    /**
     * Finding a triangular center of gravity.
     * 三角形の重心を求める。
     */
    getBarycenter() {
        return Point3D.getBarycenter(this.p1, this.p2, this.p3);
    }

    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    getAroundLength() {
        const p1 = new Line3D(this.p1, this.p2);
        const p2 = new Line3D(this.p2, this.p3);
        const p3 = new Line3D(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
    }

    /**
     * Find a triangle area.
     * 三角形の面積を求める。
     *  */
    getArea() {
        const a = this.l1.getLength();
        const b = this.l2.getLength();
        const c = this.l3.getLength();
        const s = (a + b + c) / 2;
        const S = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return S;
    }

    /**
     * In search of a symmetrical triangle for the reference point.
     * 基準点に対して対称な三角形を求める。
     */
    getSymmetricTriangle(center: Point3D) {
        return new Triangle3D(
            Point3D.getSymmetricPoint(this.p1, center),
            Point3D.getSymmetricPoint(this.p2, center),
            Point3D.getSymmetricPoint(this.p3, center)
        );
    }

    /**
     * Enlarge and reduce the triangle according to the reference point.
     * 三角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number) {
        const l1 = new Line3D(center, this.p1);
        const l2 = new Line3D(center, this.p2);
        const l3 = new Line3D(center, this.p3);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        const p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return new Triangle3D(p1, p2, p3);
    }

    draw(p5: any) {

        p5.beginShape();

        p5.vertex(this.p1.x, this.p1.y, this.p1.z);

        p5.vertex(this.p2.x, this.p2.y, this.p2.z);

        p5.vertex(this.p3.x, this.p3.y, this.p3.z);

        p5.ndShape(p5.CLOSE);
    }
}

class Quad3D {
    p1: Point3D;
    p2: Point3D;
    p3: Point3D;
    p4: Point3D;
    l1: Line3D;
    l2: Line3D;
    l3: Line3D;
    l4: Line3D;

    /**
     *
     * @param p1 First point of the Quad.
     * @param p2 Second point of the Quad.
     * @param p3 Third point of the Quad.
     * @param p4 Forth point of the Quad.
     */
    constructor(p1: Point3D, p2: Point3D, p3: Point3D, p4: Point3D) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.l1 = new Line3D(this.p1, this.p2);
        this.l2 = new Line3D(this.p2, this.p3);
        this.l3 = new Line3D(this.p3, this.p4);
        this.l4 = new Line3D(this.p4, this.p1);
    }

    /**
     * Enlarge and reduce the square according to the reference point.
     * 四角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number) {
        const l1 = new Line3D(center, this.p1);
        const l2 = new Line3D(center, this.p2);
        const l3 = new Line3D(center, this.p3);
        const l4 = new Line3D(center, this.p4);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        const p3 = l3.getDividingPoint(-magnification, magnification - 1);
        const p4 = l4.getDividingPoint(-magnification, magnification - 1);
        return new Quad3D(p1, p2, p3, p4);
    }

    draw(p5: any) {

        p5.beginShape();

        p5.vertex(this.p1.x, this.p1.y, this.p1.z);

        p5.vertex(this.p2.x, this.p2.y, this.p2.z);

        p5.vertex(this.p3.x, this.p3.y, this.p3.z);

        p5.vertex(this.p4.x, this.p4.y, this.p4.z);

        p5.endShape(p5.CLOSE);
    }
}

class Box {
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
    d: number;
    constructor(x: number, y: number, z: number, w: number, h: number, d: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.d = d;
    }

    /**
     * Find the surface area.
     * 表面積を求める。
     */
    getSurfaceArea() {
        return 2 * (this.w * this.h + this.h * this.d + this.d * this.w);
    }

    /**
     * Seek the volume.
     * 体積を求める。
     */
    getVolume() {
        return this.w * this.h * this.d;
    }

    /**
     * Enlarge and shrink the rectangular body according to the reference point.
     * 直方体を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number) {
        const boxCenter = new Point3D(
            this.x + this.w / 2,
            this.y + this.h / 2,
            this.z + this.d / 2
        );
        const l1 = new Line3D(center, boxCenter);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);

        const w = this.w * magnification;
        const h = this.h * magnification;
        const d = this.d * magnification;
        const x = p1.x - w / 2;
        const y = p1.y - h / 2;
        const z = p1.z - d / 2;

        return new Box(x, y, z, w, h, d);
    }

    draw(p5: any) {

        p5.push();

        p5.translate(this.x, this.y, this.z);

        p5.box(this.w, this.h, this.d);

        p5.pop();
    }
}

class Sphere {
    center: Point3D;
    x: number;
    y: number;
    z: number;
    r: number;

    /**
     *
     * @param x X coordinate of the center of the sphere.
     * @param y Y coordinate of the center of the sphere.
     * @param z Z coordinate of the center of the sphere.
     * @param r Radius of the sphere.
     */
    constructor(x: number, y: number, z: number, r: number) {
        this.center = new Point3D(x, y, z);
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
    }

    /**
     * Find the surface area.
     * 表面積を求める。
     */
    getSurfaceArea() {
        return 4 * Math.PI * this.r ** 2;
    }

    /**
     * Seek the volume.
     * 体積を求める。
     */
    getVolume() {
        return (4 * Math.PI * this.r ** 3) / 3;
    }

    /**
     * Enlarge and shrink the ball according to the reference point.
     * 球を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number) {
        const l1 = new Line3D(center, this.center);
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        return new Sphere(p1.x, p1.y, p1.z, this.r * magnification);
    }

    draw(p5: any) {
        p5.push();

        p5.translate(this.x, this.y, this.z);

        p5.sphere(this.r);

        p5.pop();
    }
}

class Linear {
    slope!: number;
    yIntercept!: number;

    a!: number;
    b!: number;

    vertexForm!: string;
    standardForm!: string;

    /**
     *
     * @param formula Formula.
     */
    constructor(formula: string) {
        this.setForms(formula);
    }

    setForms(formula: string) {
        const array = formula.replace(/\s/g, "").split(/\+|x/).filter((v) => v);
        this.slope = Number(array[0]);
        this.yIntercept = Number(array[1]);

        const stringSlope = String(this.slope);
        const stringYIntercept = this.yIntercept >= 0 ? "+" + String(this.yIntercept) : String(this.yIntercept);
        this.vertexForm = `${stringSlope}x${stringYIntercept}`;
    }

    /**
     * Substitute X and find the value of Y.
     * xを代入して、yの値を求める。
     */
    getY(x: number) {
        return this.slope * x + this.yIntercept;
    }

    /**
     * Finding the intersection between primary functions.
     * 一次関数同士の交点を求める。
     */
    getIntersection(linear: Linear) {
        const a = this.slope;
        const b = this.yIntercept;
        const c = linear.slope;
        const d = linear.yIntercept;
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    }

    /**
     * Finding primary functions that are perpendicular to the standard primary functions.
     * 基準となる一次関数に垂直な一次関数をもとめる。
     */
    getPerpendicularLinear(p: Point) {
        const a = this.slope;
        const x1 = p.x;
        const y1 = p.y;
        return new Linear(`${-1 / a}x+${x1 / a + y1}`);
    }

    /**
     * Finding a symmetrical point for a straight line.
     * 直線に対して対称な点を求める。
     */
    getSymmetricPointToL(p: Point) {
        const perpendicularLinear = this.getPerpendicularLinear(p);
        const center = this.getIntersection(perpendicularLinear);
        const symmetricPoint = Point.getSymmetricPoint(p, center);
        return symmetricPoint;
    }

    /**
     * Primary functions are expanded according to the reference point.
     * 一次関数を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, new Point(0, this.yIntercept));
        const l2 = new Line(center, new Point(5, this.getY(5)));
        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return Linear.estimateLinearByTwoPoints(p1, p2);
    }

    /**
     * Find the primary function that passes through 2 points.
     * 2点を通る一次関数を求める。
     */
    static estimateLinearByTwoPoints(p1: Point, p2: Point) {
        const a = (p2.y - p1.y) / (p2.x - p1.x);
        const b = (p1.y - a * p1.x);
        return new Linear(`${a}x+${b}`);
    }

    draw(min: number, max: number, p5: any) {

        p5.beginShape();
        for (let x = min; x < max; x++) {
            const y = this.getY(x);

            p5.vertex(x, y);
        }

        p5.endShape();
    }
}

class Quadratic {
    standardForm!: string;
    vertexForm!: string;

    a!: number;
    b!: number;
    c!: number;

    p!: number;
    q!: number;

    /**
     * Formula.
     * Enter even if the coefficient of x^2, x is 0, 1.
     * x^2, xの係数, 定数項が0, 1であっても入力すること。
     * @param formula
     */
    constructor(formula: string) {
        this.setForms(formula);
    }

    /**
     * Determines whether the entered function is a general form, a standard form, or something else.
     * 入力された関数が一般形であるか、標準形であるか、またはそれ以外であるか判別する。
     *  */
    static judgeForm(formula: string) {
        if (formula.match(/x\^2/g) &&
            formula.match(/x/g)) {
            return "vertex";
        } else if (formula.match(/x/g) &&
            formula.match(/\(/g) &&
            formula.match(/\)/g) &&
            formula.match(/\^2/g)) {
            return "standard";
        } else {
            return Manager.displayError(["You MUST use following:", "x", "(", ")", "^2"]);
        }
    }

    /**
     * Assign a value to a, b, c, p, q to complete general and standard forms.
     * a, b, c, p, qに値を代入し、一般形と標準形を完成させる。
     */
    setForms(formula: string) {
        if (Quadratic.judgeForm(formula) === "vertex") {
            const array = formula.replace(/\s/g, "").split(/\+|x\^2|x/).filter((v) => v);
            this.a = Number(array[0]);
            this.b = Number(array[1]);
            this.c = Number(array[2]);

            const stringA = String(this.a);
            const stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            const stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = `${stringA}x^2${stringB}x${stringC}`;

            this.p = -this.b / (2 * this.a);
            this.q = -(this.b ** 2 - 4 * this.a * this.c) / (4 * this.a);

            const stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            const stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = `${stringA}(x${stringP})^2${stringQ}`;
        } else if (Quadratic.judgeForm(formula) === "standard") {
            const array = formula.replace(/\s/g, "").split(/\(|\)|\+|x|\^2/).filter((v) => v);
            this.a = Number(array[0]);
            this.p = Number(array[1]) * (-1);
            this.q = Number(array[2]);

            const stringA = String(this.a);
            const stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            const stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = `${stringA}(x${stringP})^2${stringQ}`;

            this.b = -2 * this.a * this.p;
            this.c = this.a * this.p ** 2 + this.q;

            const stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            const stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = `${stringA}x^2${stringB}x${stringC}`;
        }
    }

    /**
     * Finding the top of the secondary function.
     * 二次関数の頂点を求める。
     *  */
    getVertex() {
        return new Point(this.p, this.q);
    }

    /**
     * Substitute X and find the value of Y.
     * xを代入して、yの値を求める。
     */
    getY(x: number) {
        return this.a * x ** 2 + this.b * x + this.c;
    }

    /**
     * Find the coordinates of y cut pieces.
     * y切片の座標を求める。
     */
    getYIntercept() {
        return new Point(0, this.getY(0));
    }

    /**
     * Finding a symmetrical secondary function for the reference point.
     * 基準点に対して対称な二次関数を求める。
     */
    getSymmetricQuadratic(center: Point) {
        const a = -this.a;
        const p = -Point.getSymmetricPoint(this.getVertex(), center).x;
        const q = Point.getSymmetricPoint(this.getVertex(), center).y;
        return new Quadratic(`${a}(x +${p})^2 + ${q}`);
    }

    getSymmetricQuadraticToX_Axis() {
        return new Quadratic(`${-this.a}x^2+${-this.b}x+${-this.c}`);
    }

    getSymmetricQuadraticToY_Axis() {
        return new Quadratic(`${this.a}x^2+${-this.b}x+${this.c}`);
    }

    /**
     * Find the intersection of secondary and primary functions.
     * 二次関数と一次関数の交点を求める。
     */
    getIntersectionsOfQL(linear: Linear) {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const d = linear.slope;
        const e = linear.yIntercept;

        const x1 = (d - b + Math.sqrt((b - d) ** 2 - 4 * a * (c - e))) / (2 * a);
        const y1 = d * x1 + e;
        const x2 = (d - b - Math.sqrt((b - d) ** 2 - 4 * a * (c - e))) / (2 * a);
        const y2 = d * x2 + e;

        return [new Point(x1, y1), new Point(x2, y2)];
    }

    /**
     * In search of intersections between secondary functions.
     * 二次関数同士の交点を求める。
     */
    getIntersectionsOfQQ(quadratic: Quadratic) {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const d = quadratic.a;
        const e = quadratic.b;
        const f = quadratic.c;

        if (a === d) {
            const x = (f - c) / (b - e);
            const y = a * x ** 2 + b * x + c;
            return [new Point(x, y), new Point(NaN, NaN)];
        } else {
            const x1 = (e - b + Math.sqrt((b - e) ** 2 - 4 * (a - d) * (c - f))) / (2 * (a - d));
            const y1 = a * x1 ** 2 + b * x1 + c;
            const x2 = (e - b - Math.sqrt((b - e) ** 2 - 4 * (a - d) * (c - f))) / (2 * (a - d));
            const y2 = a * x2 ** 2 + b * x2 + c;

            return [new Point(x1, y1), new Point(x2, y2)];
        }
    }

    /**
     * Finding a secondary function.
     * 二次関数の接線を求める。
     */
    getTangentLinear(x: number) {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const d = 2 * a * x + b;
        const e = (2 * b * d + 4 * a * c - b ** 2 - d ** 2) / (4 * a);
        return new Linear(`${d}x+${e}`);
    }

    /**
     * Finding a secondary function line.
     * 二次関数の方線を求める。
     */
    getNormalLinear(x: number) {
        const l = this.differentiate();
        return new Linear(`${-1 / l.getY(x)}x+${x / l.getY(x) + this.getY(x)}`);
    }

    /**
     * Finding a secondary equation solution.
     * 二次方程式の解を求める。
     */
    getSolution() {
        return this.getIntersectionsOfQL(new Linear("0x+0"));
    }

    /**
     * Enlarge the secondary function according to the reference point.
     * 二次関数を基準点に合わせて拡大する。
     */
    magnify(center: Point, magnification: number) {
        const l1 = new Line(center, this.getYIntercept());
        const l2 = new Line(center, new Point(-5, this.getY(-5)));
        const l3 = new Line(center, new Point(5, this.getY(5)));

        const p1 = l1.getDividingPoint(-magnification, magnification - 1);
        const p2 = l2.getDividingPoint(-magnification, magnification - 1);
        const p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return Quadratic.estimateQuadraticByThreePoints(p1, p2, p3);
    }

    /**
     * Move the secondary function parallel.
     * 二次関数を平行移動させる。
     */
    moveQuadratic(x: number, y: number) {
        const newP = -(this.p + x);
        const newQ = this.q + y;
        return new Quadratic(`${this.a}(x+${newP})^2+${newQ}`);
    }

    /**
     * Find the secondary function from the value of A and the two points that pass.
     * aの値と、通る2点から二次関数を求める。
     */
    static estimateQuadraticByAandTwoPoints(a: number, p1: Point, p2: Point) {
        const x1 = p1.x;
        const y1 = p1.y;
        const x2 = p2.x;
        const y2 = p2.y;

        const b = ((y2 - y1) - a * (x2 ** 2 - x1 ** 2)) / (x2 - x1);
        const c = y1 - a * x1 ** 2 - b * x1 ** 2;

        return new Quadratic(`${a}x^2+${b}x+${c}`);
    }

    /**
     * Finding a secondary function through 3 points.
     * 3点を通る二次関数を求める。
     */
    static estimateQuadraticByThreePoints(p1: Point, p2: Point, p3: Point) {
        return Point.estimateQuadraticByThreePoints(p1, p2, p3);
    }

    differentiate() {
        return new Linear(`${2 * this.a}x+${this.b}`);
    }

    draw(min: number, max: number, p5: any) {

        p5.beginShape();
        for (let x = min; x < max; x++) {
            const y = this.getY(x);

            p5.vertex(x, y);
        }

        p5.endShape();
    }
}

export { Point, Line, Triangle, Quad, Circle, Point3D, Line3D, Triangle3D, Quad3D, Polygon, Sphere, Box, Linear, Quadratic }