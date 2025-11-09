"use strict";

// ------------------------------
// 1.2.3 – 1.2.6: CAR OBJECTS
// ------------------------------

const car1 = new Object();
car1.color = "silver";
car1.maxSpeed = 132;
car1.driver = new Object();
car1.tuning = true;
car1["number of accidents"] = 0;
car1.driver.name = "Oleksandr Hoian";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

const car2 = {
  color: "emerald",
  maxSpeed: 118,
  driver: {
    name: "Oleksandr Hoian",
    category: "B",
    "personal limitations": null
  },
  tuning: false,
  "number of accidents": 2
};

car1.drive = function () {
  console.log("I am not driving at night");
};

car2.drive = function () {
  console.log("I can drive anytime");
};

console.group("Cars");
console.log("car1:", car1);
console.log("car2:", car2);
car1.drive();
car2.drive();
console.groupEnd();

// 1.2.7 – 1.2.10: TRUCK CONSTRUCTOR

function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  this.trip = function () {
    if (!this.driver) {
      console.log("No driver assigned");
      return;
    }

    const drivingMode = this.driver.nightDriving
      ? "drives at night"
      : "does not drive at night";

    console.log(
      `Driver ${this.driver.name} ${drivingMode} and has ${this.driver.experience} years of experience`
    );
  };
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name,
    nightDriving,
    experience
  };
};

const truckAurora = new Truck("graphite", 8400, 76.5, "MAN", "TGM 18.250");
const truckNord = new Truck("ivory", 12950, 68.2, "DAF", "CF 430");

console.group("Trucks");
console.log("Initial trip attempts without drivers:");
truckAurora.trip();
truckNord.trip();

truckAurora.AssignDriver("Oleksandr Hoian", true, 14);
truckNord.AssignDriver("Petro Malynovych", false, 9);

console.log("truckAurora:", truckAurora);
console.log("Trip attempts with assigned drivers:");
truckAurora.trip();
truckNord.trip();
console.groupEnd();

// ------------------------------
// 1.2.11 – 1.2.24: ES6 CLASSES
// ------------------------------

const degToRad = (degrees) => (degrees * Math.PI) / 180;

class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log(
      "Square: four equal sides (length a), four right angles, opposite sides are parallel."
    );
  }

  length() {
    const perimeter = this.a * 4;
    console.log(`Perimeter: ${perimeter}`);
    return perimeter;
  }

  square() {
    const area = this.a ** 2;
    console.log(`Area: ${area}`);
    return area;
  }

  info() {
    const perimeter = this.a * 4;
    const area = this.a ** 2;

    console.log("Square info:");
    console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
    console.log("Angles: 90°, 90°, 90°, 90°");
    console.log(`Perimeter: ${perimeter}`);
    console.log(`Area: ${area}`);
  }
}

class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  static help() {
    console.log(
      "Rectangle: opposite sides equal (a and b), all four angles are right angles."
    );
  }

  length() {
    const perimeter = 2 * (this.a + this.b);
    console.log(`Perimeter: ${perimeter}`);
    return perimeter;
  }

  square() {
    const area = this.a * this.b;
    console.log(`Area: ${area}`);
    return area;
  }

  info() {
    const perimeter = 2 * (this.a + this.b);
    const area = this.a * this.b;

    console.log("Rectangle info:");
    console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
    console.log("Angles: 90°, 90°, 90°, 90°");
    console.log(`Perimeter: ${perimeter}`);
    console.log(`Area: ${area}`);
  }
}

class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha;
    this.beta = beta;
  }

  get a() {
    return this._a;
  }

  set a(value) {
    if (value <= 0) {
      throw new Error("Side length must be a positive number.");
    }
    this._a = value;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    if (value <= 0 || value >= 180) {
      throw new Error("Alpha must be between 0 and 180 degrees.");
    }
    this._alpha = value;
  }

  get beta() {
    return this._beta;
  }

  set beta(value) {
    if (value <= 0 || value >= 180) {
      throw new Error("Beta must be between 0 and 180 degrees.");
    }
    this._beta = value;
  }

  static help() {
    console.log(
      "Rhombus: four equal sides (length a); opposite angles are equal (alpha and beta)."
    );
  }

  length() {
    const perimeter = this.a * 4;
    console.log(`Perimeter: ${perimeter}`);
    return perimeter;
  }

  square() {
    const area = this.a * this.a * Math.sin(degToRad(this.alpha));
    console.log(`Area: ${area}`);
    return area;
  }

  info() {
    const perimeter = this.a * 4;
    const area = this.a * this.a * Math.sin(degToRad(this.alpha));

    console.log("Rhombus info:");
    console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
    console.log(`Angles: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
    console.log(`Perimeter: ${perimeter}`);
    console.log(`Area: ${area}`);
  }
}

class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help() {
    console.log(
      "Parallelogram: opposite sides equal (a and b); opposite angles equal (alpha and beta)."
    );
  }

  length() {
    return super.length();
  }

  square() {
    const area = this.a * this.b * Math.sin(degToRad(this.alpha));
    console.log(`Area: ${area}`);
    return area;
  }

  info() {
    const perimeter = 2 * (this.a + this.b);
    const area = this.a * this.b * Math.sin(degToRad(this.alpha));

    console.log("Parallelogram info:");
    console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
    console.log(`Angles: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
    console.log(`Perimeter: ${perimeter}`);
    console.log(`Area: ${area}`);
  }
}

console.group("Shapes help");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();
console.groupEnd();

const squareSample = new Square(6);
const rectangleSample = new Rectangle(8, 5);
const rhombusSample = new Rhombus(9, 120, 60);
const parallelogramSample = new Parallelogram(7, 11, 110, 70);

console.group("Shapes info");
squareSample.info();
rectangleSample.info();
rhombusSample.info();
parallelogramSample.info();
console.groupEnd();

// ------------------------------
// 1.2.25 – 1.2.26: TRIANGULAR FACTORY FUNCTION
// ------------------------------

const Triangular = function (a = 3, b = 4, c = 5) {
  return { a, b, c };
};

console.group("Triangles");
const triangles = [
  Triangular(),
  Triangular(5, 7, 9),
  Triangular(8, 10, 13)
];

triangles.forEach((triangle, index) => {
  const { a, b, c } = triangle;
  console.log(`Triangle ${index + 1}: a=${a}, b=${b}, c=${c}`);
});
console.groupEnd();

// ------------------------------
// 1.2.27 – 1.2.28: PI MULTIPLIER
// ------------------------------

const PiMultiplier = function (multiplier) {
  return function () {
    return Math.PI * multiplier;
  };
};

const doublePi = PiMultiplier(2);
const twoThirdsPi = PiMultiplier(2 / 3);
const halfPi = PiMultiplier(0.5);

console.group("PiMultiplier");
console.log("π * 2 =", doublePi());
console.log("π * 2/3 =", twoThirdsPi());
console.log("π / 2 =", halfPi());
console.groupEnd();

// ------------------------------
// 1.2.29 – 1.2.31: PAINTER FUNCTIONS
// ------------------------------

const Painter = function (color) {
  return function (obj) {
    if (!obj.type) {
      console.log("No 'type' property occurred!");
      return;
    }

    console.log(`${color} ${obj.type}`);
  };
};

const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");

const objectOne = {
  maxSpeed: 280,
  type: "Sportcar",
  color: "magenta"
};

const objectTwo = {
  type: "Truck",
  "avg speed": 90,
  "load capacity": 2400
};

const objectThree = {
  maxSpeed: 180,
  color: "purple",
  isCar: true
};

console.group("Painters");
PaintBlue(objectOne);
PaintRed(objectOne);
PaintYellow(objectOne);

PaintBlue(objectTwo);
PaintRed(objectTwo);
PaintYellow(objectTwo);

PaintBlue(objectThree);
PaintRed(objectThree);
PaintYellow(objectThree);
console.groupEnd();

