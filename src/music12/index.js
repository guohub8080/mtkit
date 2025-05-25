var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/note/index.ts
var note_exports = {};
__export(note_exports, {
  Note: () => Note,
  getBlackRandomNote: () => getBlackRandomNote,
  getCasualRandomNote: () => getCasualRandomNote,
  getNormalRandomNote: () => getNormalRandomNote,
  getNoteByLocation: () => getNoteByLocation,
  getUpwardLocationGap: () => getUpwardLocationGap,
  getWhiteRandomNote: () => getWhiteRandomNote
});

// src/note/cls/classFn/cls_getNoteByInterval.ts
import { isNull as isNull2, isUndefined as isUndefined2 } from "lodash";

// src/common/processError/errorTypes.ts
var NoteError = class extends Error {
  constructor(message = "Note Error!") {
    super(message);
    this.name = "NoteError";
  }
};
var IntervalError = class extends Error {
  constructor(message = "Interval Error!") {
    super(message);
    this.name = "IntervalError";
  }
};
var RadixError = class extends Error {
  constructor(message = "Radix Error!") {
    super(message);
    this.name = "RadixError";
  }
};
var ChordError = class extends Error {
  constructor(message = "Chord Error!") {
    super(message);
    this.name = "ChordError";
  }
};
var ScaleError = class extends Error {
  constructor(message = "Scale Error!") {
    super(message);
    this.name = "ScaleError";
  }
};
var CircleOfFifthsError = class extends Error {
  constructor(message = "FifthCircle Error!") {
    super(message);
    this.name = "FifthCircleError";
  }
};
var FactoryError = class extends Error {
  constructor(message = "Factory Error!") {
    super(message);
    this.name = "FactoryError";
  }
};

// src/common/radix/index.ts
var radix_exports = {};
__export(radix_exports, {
  Base12Radix: () => Base12Radix,
  Base7Radix: () => Base7Radix,
  IntervalRadix: () => IntervalRadix,
  Radix: () => Radix,
  ScaleRadix: () => ScaleRadix,
  SemitoneRadix: () => SemitoneRadix,
  StepRadix: () => StepRadix
});

// src/common/radix/Radix.ts
var _base10;
var _Radix = class _Radix {
  // 构造函数
  constructor(base10, radixBase) {
    __publicField(this, "radixBase");
    __privateAdd(this, _base10);
    this.radixBase = radixBase;
    __privateSet(this, _base10, base10);
  }
  get base10() {
    return __privateGet(this, _base10);
  }
  // 同样是构造函数
  static fromArray(array, radixBase) {
    if (array.length !== 2) {
      throw new Error("The length must be 2.");
    }
    const base10Value = array[0] * radixBase + array[1];
    return new _Radix(base10Value, radixBase);
  }
  // 转换为数组
  // input: a number and a radix symbol.
  // output: a length-2-array where every digit is base10 number. Besides, array[1] forever be positive.
  // e.g. input: 13   (base12 symbol), output: [1, 1]
  // e.g. input: 13   (base7 symbol),  output: [1, 6]
  // e.g. input: 130  (base7 symbol),  output: [18, 4]
  // e.g. input: -13  (base7 symbol),  output: [-2, 1]
  // e.g. input: -1   (base7 symbol),  output: [-1, 6]
  get twoDigitArray() {
    if (this.base10 === 0) return [0, 0];
    let circle = 0;
    let position = this.base10;
    while (position >= this.radixBase) {
      position -= this.radixBase;
      circle++;
    }
    while (position < 0) {
      position = this.radixBase + position;
      circle--;
    }
    return [circle, position];
  }
  getGap(otherRadix) {
    return otherRadix.base10 - this.base10;
  }
  // input: a length-2-number-array, a number(positive: add and negative: subtract), a radixSymbol.
  // Each digit of the input length-2-number-array should be base10 number.
  // output: a new length-2-number-array where every digit is base10 number.
  // e.g. input: [0,5]   +8   (base7 symbol)     output:[1,6]
  // e.g. input: [0,5]   +8   (base12 symbol)    output:[1,1]
  add(num) {
    return new _Radix(this.base10 + num, this.radixBase);
  }
};
_base10 = new WeakMap();
var Radix = _Radix;

// src/common/radix/noteRadix.ts
import { isNull, isNumber as isNumber3, isString, isUndefined } from "lodash";

// src/common/radix/Base7Radix.ts
import { isNumber } from "lodash";
var Base7Radix = class _Base7Radix extends Radix {
  constructor(num) {
    super(num, 7);
  }
  // 同样是构造函数
  static fromArray(array) {
    if (array.length !== 2) {
      throw new Error("The Array length must be 2.");
    }
    if (!isNumber(array[0])) throw new RadixError("The first digit of the array must be a number.");
    return new _Base7Radix(array[0] * 7 + array[1]);
  }
  get firstDigit() {
    return this.twoDigitArray[0];
  }
  get lastDigit() {
    return this.twoDigitArray[1];
  }
  add(num) {
    return new _Base7Radix(this.base10 + num);
  }
  getGap(otherRadix) {
    return otherRadix.base10 - this.base10;
  }
};

// src/common/radix/intervalRadix.ts
var _base102, _radix;
var IntervalRadix = class {
  constructor(intervalNum) {
    __privateAdd(this, _base102);
    __privateAdd(this, _radix);
    if (intervalNum < 1) throw new Error("Interval number must be greater than 1.");
    __privateSet(this, _base102, intervalNum - 1);
    __privateSet(this, _radix, new Base7Radix(intervalNum - 1));
  }
  get base10() {
    return __privateGet(this, _base102) + 1;
  }
  get twoDigitArray() {
    return [__privateGet(this, _radix).twoDigitArray[0], __privateGet(this, _radix).twoDigitArray[1] + 1];
  }
  get octave() {
    return this.twoDigitArray[0];
  }
  get intervalNum() {
    return this.base10;
  }
  get intervalNumWithinOctave() {
    return this.twoDigitArray[1];
  }
};
_base102 = new WeakMap();
_radix = new WeakMap();

// src/note/static/stepList.ts
var stepList_default = ["C", "D", "E", "F", "G", "A", "B"];

// src/common/radix/Base12Radix.ts
import { isNumber as isNumber2 } from "lodash";
var Base12Radix = class _Base12Radix extends Radix {
  constructor(num) {
    super(num, 12);
  }
  // 同样是构造函数
  static fromArray(array) {
    if (array.length !== 2) {
      throw new Error("The Array length must be 2.");
    }
    if (!isNumber2(array[0])) throw new RadixError("The first digit of the array must be a number.");
    return new _Base12Radix(array[0] * 12 + array[1]);
  }
  get firstDigit() {
    return this.twoDigitArray[0];
  }
  get lastDigit() {
    return this.twoDigitArray[1];
  }
  add(num) {
    return new _Base12Radix(this.base10 + num);
  }
  getGap(otherRadix) {
    return otherRadix.base10 - this.base10;
  }
};

// src/note/static/noteMeta.ts
import collect from "collect.js";
var noteMeta_default = collect(
  [
    {
      uid: 1,
      artName: "C",
      step: "C",
      alter: 0,
      semitone: 0,
      stepIndex: 0,
      fifthValue: 0,
      locationId: 0,
      isNormal: true,
      isBlack: false,
      mathName: "C"
    },
    {
      uid: 2,
      artName: "D",
      step: "D",
      alter: 0,
      semitone: 2,
      stepIndex: 1,
      fifthValue: 2,
      locationId: 2,
      isNormal: true,
      isBlack: false,
      mathName: "D"
    },
    {
      uid: 3,
      artName: "E",
      step: "E",
      alter: 0,
      semitone: 4,
      stepIndex: 2,
      fifthValue: 4,
      locationId: 4,
      isNormal: true,
      isBlack: false,
      mathName: "E"
    },
    {
      uid: 4,
      artName: "F",
      step: "F",
      alter: 0,
      semitone: 5,
      stepIndex: 3,
      fifthValue: -1,
      locationId: 5,
      isNormal: true,
      isBlack: false,
      mathName: "F"
    },
    {
      uid: 5,
      artName: "G",
      step: "G",
      alter: 0,
      semitone: 7,
      stepIndex: 4,
      fifthValue: 1,
      locationId: 7,
      isNormal: true,
      isBlack: false,
      mathName: "G"
    },
    {
      uid: 6,
      artName: "A",
      step: "A",
      alter: 0,
      semitone: 9,
      stepIndex: 5,
      fifthValue: 3,
      locationId: 9,
      isNormal: true,
      isBlack: false,
      mathName: "A"
    },
    {
      uid: 7,
      artName: "B",
      step: "B",
      alter: 0,
      semitone: 11,
      stepIndex: 6,
      fifthValue: 5,
      locationId: 11,
      isNormal: true,
      isBlack: false,
      mathName: "B"
    },
    {
      uid: 8,
      artName: "C\u266F",
      step: "C",
      alter: 1,
      semitone: 1,
      stepIndex: 0,
      fifthValue: 7,
      locationId: 1,
      isNormal: true,
      isBlack: true,
      mathName: "C+1"
    },
    {
      uid: 9,
      artName: "C\u266D",
      step: "C",
      alter: -1,
      semitone: -1,
      stepIndex: 0,
      fifthValue: -7,
      locationId: 11,
      isNormal: false,
      isBlack: false,
      mathName: "C-1"
    },
    {
      uid: 10,
      artName: "D\u266F",
      step: "D",
      alter: 1,
      semitone: 3,
      stepIndex: 1,
      fifthValue: 9,
      locationId: 3,
      isNormal: true,
      isBlack: true,
      mathName: "D+1"
    },
    {
      uid: 11,
      artName: "D\u266D",
      step: "D",
      alter: -1,
      semitone: 1,
      stepIndex: 1,
      fifthValue: -5,
      locationId: 1,
      isNormal: true,
      isBlack: true,
      mathName: "D-1"
    },
    {
      uid: 12,
      artName: "E\u266F",
      step: "E",
      alter: 1,
      semitone: 5,
      stepIndex: 2,
      fifthValue: 11,
      locationId: 5,
      isNormal: false,
      isBlack: false,
      mathName: "E+1"
    },
    {
      uid: 13,
      artName: "E\u266D",
      step: "E",
      alter: -1,
      semitone: 3,
      stepIndex: 2,
      fifthValue: -3,
      locationId: 3,
      isNormal: true,
      isBlack: true,
      mathName: "E-1"
    },
    {
      uid: 14,
      artName: "F\u266F",
      step: "F",
      alter: 1,
      semitone: 6,
      stepIndex: 3,
      fifthValue: 6,
      locationId: 6,
      isNormal: true,
      isBlack: true,
      mathName: "F+1"
    },
    {
      uid: 15,
      artName: "F\u266D",
      step: "F",
      alter: -1,
      semitone: 4,
      stepIndex: 3,
      fifthValue: -8,
      locationId: 4,
      isNormal: false,
      isBlack: false,
      mathName: "F-1"
    },
    {
      uid: 16,
      artName: "G\u266F",
      step: "G",
      alter: 1,
      semitone: 8,
      stepIndex: 4,
      fifthValue: 8,
      locationId: 8,
      isNormal: true,
      isBlack: true,
      mathName: "G+1"
    },
    {
      uid: 17,
      artName: "G\u266D",
      step: "G",
      alter: -1,
      semitone: 6,
      stepIndex: 4,
      fifthValue: -6,
      locationId: 6,
      isNormal: true,
      isBlack: true,
      mathName: "G-1"
    },
    {
      uid: 18,
      artName: "A\u266F",
      step: "A",
      alter: 1,
      semitone: 10,
      stepIndex: 5,
      fifthValue: 10,
      locationId: 10,
      isNormal: true,
      isBlack: true,
      mathName: "A+1"
    },
    {
      uid: 19,
      artName: "A\u266D",
      step: "A",
      alter: -1,
      semitone: 8,
      stepIndex: 5,
      fifthValue: -4,
      locationId: 8,
      isNormal: true,
      isBlack: true,
      mathName: "A-1"
    },
    {
      uid: 20,
      artName: "B\u266F",
      step: "B",
      alter: 1,
      semitone: 12,
      stepIndex: 6,
      fifthValue: 12,
      locationId: 0,
      isNormal: false,
      isBlack: false,
      mathName: "B+1"
    },
    {
      uid: 21,
      artName: "B\u266D",
      step: "B",
      alter: -1,
      semitone: 10,
      stepIndex: 6,
      fifthValue: -2,
      locationId: 10,
      isNormal: true,
      isBlack: true,
      mathName: "B-1"
    },
    {
      uid: 22,
      artName: "C\u266F\u266F",
      step: "C",
      alter: 2,
      semitone: 2,
      stepIndex: 0,
      fifthValue: 14,
      locationId: 2,
      isNormal: false,
      isBlack: false,
      mathName: "C+2"
    },
    {
      uid: 23,
      artName: "C\u266D\u266D",
      step: "C",
      alter: -2,
      semitone: -2,
      stepIndex: 0,
      fifthValue: -14,
      locationId: 10,
      isNormal: false,
      isBlack: true,
      mathName: "C-2"
    },
    {
      uid: 24,
      artName: "D\u266F\u266F",
      step: "D",
      alter: 2,
      semitone: 4,
      stepIndex: 1,
      fifthValue: 16,
      locationId: 4,
      isNormal: false,
      isBlack: false,
      mathName: "D+2"
    },
    {
      uid: 25,
      artName: "D\u266D\u266D",
      step: "D",
      alter: -2,
      semitone: 0,
      stepIndex: 1,
      fifthValue: -12,
      locationId: 0,
      isNormal: false,
      isBlack: false,
      mathName: "D-2"
    },
    {
      uid: 26,
      artName: "E\u266F\u266F",
      step: "E",
      alter: 2,
      semitone: 6,
      stepIndex: 2,
      fifthValue: 18,
      locationId: 6,
      isNormal: false,
      isBlack: true,
      mathName: "E+2"
    },
    {
      uid: 27,
      artName: "E\u266D\u266D",
      step: "E",
      alter: -2,
      semitone: 2,
      stepIndex: 2,
      fifthValue: -10,
      locationId: 2,
      isNormal: false,
      isBlack: false,
      mathName: "E-2"
    },
    {
      uid: 28,
      artName: "F\u266F\u266F",
      step: "F",
      alter: 2,
      semitone: 7,
      stepIndex: 3,
      fifthValue: 13,
      locationId: 7,
      isNormal: false,
      isBlack: false,
      mathName: "F+2"
    },
    {
      uid: 29,
      artName: "F\u266D\u266D",
      step: "F",
      alter: -2,
      semitone: 3,
      stepIndex: 3,
      fifthValue: -15,
      locationId: 3,
      isNormal: false,
      isBlack: true,
      mathName: "F-2"
    },
    {
      uid: 30,
      artName: "G\u266F\u266F",
      step: "G",
      alter: 2,
      semitone: 9,
      stepIndex: 4,
      fifthValue: 15,
      locationId: 9,
      isNormal: false,
      isBlack: false,
      mathName: "G+2"
    },
    {
      uid: 31,
      artName: "G\u266D\u266D",
      step: "G",
      alter: -2,
      semitone: 5,
      stepIndex: 4,
      fifthValue: -13,
      locationId: 5,
      isNormal: false,
      isBlack: false,
      mathName: "G-2"
    },
    {
      uid: 32,
      artName: "A\u266F\u266F",
      step: "A",
      alter: 2,
      semitone: 11,
      stepIndex: 5,
      fifthValue: 17,
      locationId: 11,
      isNormal: false,
      isBlack: false,
      mathName: "A+2"
    },
    {
      uid: 33,
      artName: "A\u266D\u266D",
      step: "A",
      alter: -2,
      semitone: 7,
      stepIndex: 5,
      fifthValue: -11,
      locationId: 7,
      isNormal: false,
      isBlack: false,
      mathName: "A-2"
    },
    {
      uid: 34,
      artName: "B\u266F\u266F",
      step: "B",
      alter: 2,
      semitone: 13,
      stepIndex: 6,
      fifthValue: 19,
      locationId: 1,
      isNormal: false,
      isBlack: true,
      mathName: "B+2"
    },
    {
      uid: 35,
      artName: "B\u266D\u266D",
      step: "B",
      alter: -2,
      semitone: 9,
      stepIndex: 6,
      fifthValue: -9,
      locationId: 9,
      isNormal: false,
      isBlack: false,
      mathName: "B-2"
    }
  ]
);

// src/common/radix/noteRadix.ts
var getStepByIndex = (index) => {
  return stepList_default[index];
};
var getIndexByStep = (step) => {
  const index = stepList_default.indexOf(step);
  if (index === -1) {
    throw new Error(`Invalid step ${step}`);
  }
  return index;
};
var StepRadix = class _StepRadix extends Base7Radix {
  constructor(step) {
    if (isNumber3(step))
      super(step);
    else
      super(getIndexByStep(step));
  }
  // 同样是构造函数
  static fromArray(array) {
    if (array.length !== 2) {
      throw new Error("The Array length must be 2.");
    }
    if (!isNumber3(array[0])) throw new RadixError("The first digit of the array must be a number.");
    if (isString(array[1])) {
      try {
        const stepIndex = getIndexByStep(array[1]);
        return new _StepRadix(array[0] * 7 + stepIndex);
      } catch (e) {
        throw new RadixError("Error step.");
      }
    }
    if (isNumber3(array[1])) {
      return new _StepRadix(array[0] * 7 + array[1]);
    }
    throw new RadixError("Error array type.");
  }
  get step() {
    return getStepByIndex(this.twoDigitArray[1]);
  }
  get octave() {
    return this.twoDigitArray[0];
  }
  add(num) {
    return new _StepRadix(this.base10 + num);
  }
  get stepIndex() {
    return this.twoDigitArray[1];
  }
  getGap(otherRadix) {
    return otherRadix.base10 - this.base10;
  }
  getIntervalGap(otherRadix) {
    return new IntervalRadix(1 + otherRadix.base10 - this.base10);
  }
};
var SemitoneRadix = class _SemitoneRadix extends Base12Radix {
  constructor(semitone) {
    super(semitone);
  }
  static fromArray(array) {
    if (array.length !== 2) throw new RadixError("The length must be 2.");
    return new _SemitoneRadix(array[0] * 12 + array[1]);
  }
  getGap(otherRadix) {
    return otherRadix.base10 - this.base10;
  }
  add(num) {
    return new _SemitoneRadix(this.base10 + num);
  }
  get location() {
    return this.twoDigitArray[1];
  }
  get octave() {
    return this.twoDigitArray[0];
  }
  getKeyboardNotes(isAlterAbsLessThan) {
    if (isUndefined(isAlterAbsLessThan) || isNull(isAlterAbsLessThan)) return noteMeta_default.where("locationId", this.location).all();
    return noteMeta_default.where("locationId", this.location).filter((item) => {
      return Math.abs(item.alter) <= isAlterAbsLessThan;
    }).all();
  }
};

// src/common/radix/scaleRadix.ts
var _scaleDegreeNum, _radix2;
var _ScaleRadix = class _ScaleRadix {
  constructor(scaleDegreeNum) {
    __privateAdd(this, _scaleDegreeNum);
    __privateAdd(this, _radix2);
    if (scaleDegreeNum < 1) throw new Error("Interval number must be greater than 1.");
    __privateSet(this, _scaleDegreeNum, scaleDegreeNum - 1);
    __privateSet(this, _radix2, new Base7Radix(scaleDegreeNum - 1));
  }
  get base10() {
    return __privateGet(this, _scaleDegreeNum) + 1;
  }
  get twoDigitArray() {
    return [__privateGet(this, _radix2).twoDigitArray[0], __privateGet(this, _radix2).twoDigitArray[1] + 1];
  }
  get octave() {
    return this.twoDigitArray[0];
  }
  get totalScaleDegrees() {
    return this.base10;
  }
  get scaleDegree() {
    return this.twoDigitArray[1];
  }
  add(num) {
    return new _ScaleRadix(this.totalScaleDegrees + num);
  }
};
_scaleDegreeNum = new WeakMap();
_radix2 = new WeakMap();
var ScaleRadix = _ScaleRadix;

// src/note/cls/classFn/cls_getNoteByInterval.ts
var cls_getNoteByInterval_default = (noteInstance, intervalInstance, isAscending = true) => {
  if (isUndefined2(intervalInstance) || isNull2(intervalInstance)) throw new IntervalError("Interval is empty.");
  if (isUndefined2(noteInstance) || isNull2(noteInstance)) throw new NoteError("Note is empty.");
  const baseNoteStepRadix = StepRadix.fromArray([noteInstance.octave, noteInstance.step]);
  const baseNoteSemitoneRadix = new SemitoneRadix(noteInstance.semitoneWithinOctave);
  const targetStepRadix = isAscending ? baseNoteStepRadix.add(intervalInstance.num - 1) : baseNoteStepRadix.add((intervalInstance.num - 1) * -1);
  const targetSemitoneRadix = isAscending ? baseNoteSemitoneRadix.add(intervalInstance.semitoneGap) : baseNoteSemitoneRadix.add(intervalInstance.semitoneGap * -1);
  const findBaseNoteObj = noteMeta_default.where(
    "step",
    targetStepRadix.step
  ).where(
    "locationId",
    targetSemitoneRadix.location
  ).first();
  if (!Boolean(findBaseNoteObj)) {
    throw new NoteError("No fit note from base note by the given interval.");
  }
  return new Note(
    findBaseNoteObj.step,
    findBaseNoteObj.alter,
    targetStepRadix.octave
  );
};

// src/note/cls/classFn/cls_getSamePitchNotes.ts
import { range } from "lodash";
var cls_getSamePitchNotes_default = (givenNoteInstance, isSelfIncluded = true, alterAbsLessThan = 2) => {
  if (Math.abs(alterAbsLessThan) > 2) throw new Error("Alter abs value cannot be bigger than 2!");
  const stepRadix = StepRadix.fromArray([givenNoteInstance.octave, givenNoteInstance.step]);
  const stepsArr = isSelfIncluded ? [stepRadix.add(-1), stepRadix, stepRadix.add(1)] : [stepRadix.add(-1), stepRadix.add(1)];
  const result = [];
  const alterList = range(alterAbsLessThan * -1, alterAbsLessThan + 1);
  for (let i_step_radix = 0; i_step_radix < stepsArr.length; i_step_radix++) {
    for (let i_alter_value = 0; i_alter_value < alterList.length; i_alter_value++) {
      const compareNote = new Note(
        stepsArr[i_step_radix].step,
        alterList[i_alter_value],
        stepsArr[i_step_radix].octave
      );
      if (compareNote.pitchValue === givenNoteInstance.pitchValue) {
        result.push(compareNote);
        break;
      }
    }
  }
  return result;
};

// src/interval/cls/IntervalClass.ts
import { numberToChinese } from "chinese-numbering";

// src/interval/static/intervalMeta.ts
import collect2 from "collect.js";
var intervalMeta_default = collect2(
  [
    {
      type: "aug+",
      num: 1,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 2,
      semitoneLocation: 2,
      octaveGap: 0
    },
    {
      type: "aug",
      num: 1,
      cnPrefix: "\u589E",
      isNatural: false,
      alter: 1,
      semitoneGap: 1,
      semitoneLocation: 1,
      octaveGap: 0
    },
    {
      type: "p",
      num: 1,
      cnPrefix: "\u7EAF",
      isNatural: true,
      alter: 0,
      semitoneGap: 0,
      semitoneLocation: 0,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 1,
      cnPrefix: "\u51CF",
      isNatural: false,
      alter: -1,
      semitoneGap: -1,
      semitoneLocation: 11,
      octaveGap: -1
    },
    {
      type: "dim-",
      num: 1,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: -2,
      semitoneLocation: 10,
      octaveGap: -1
    },
    {
      type: "aug+",
      num: 2,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 4,
      semitoneLocation: 4,
      octaveGap: 0
    },
    {
      type: "aug",
      num: 2,
      cnPrefix: "\u589E",
      isNatural: false,
      alter: 1,
      semitoneGap: 3,
      semitoneLocation: 3,
      octaveGap: 0
    },
    {
      type: "maj",
      num: 2,
      cnPrefix: "\u5927",
      isNatural: true,
      alter: 0,
      semitoneGap: 2,
      semitoneLocation: 2,
      octaveGap: 0
    },
    {
      type: "min",
      num: 2,
      cnPrefix: "\u5C0F",
      isNatural: true,
      alter: 0,
      semitoneGap: 1,
      semitoneLocation: 1,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 2,
      cnPrefix: "\u51CF",
      isNatural: false,
      alter: -1,
      semitoneGap: 0,
      semitoneLocation: 0,
      octaveGap: 0
    },
    {
      type: "dim-",
      num: 2,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: -1,
      semitoneLocation: 11,
      octaveGap: -1
    },
    {
      type: "aug+",
      num: 3,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 6,
      semitoneLocation: 6,
      octaveGap: 0
    },
    {
      type: "aug",
      num: 3,
      cnPrefix: "\u589E",
      isNatural: false,
      alter: 1,
      semitoneGap: 5,
      semitoneLocation: 5,
      octaveGap: 0
    },
    {
      type: "maj",
      num: 3,
      cnPrefix: "\u5927",
      isNatural: true,
      alter: 0,
      semitoneGap: 4,
      semitoneLocation: 4,
      octaveGap: 0
    },
    {
      type: "min",
      num: 3,
      cnPrefix: "\u5C0F",
      isNatural: true,
      alter: 0,
      semitoneGap: 3,
      semitoneLocation: 3,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 3,
      cnPrefix: "\u51CF",
      isNatural: false,
      alter: -1,
      semitoneGap: 2,
      semitoneLocation: 2,
      octaveGap: 0
    },
    {
      type: "dim-",
      num: 3,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: 1,
      semitoneLocation: 1,
      octaveGap: 0
    },
    {
      type: "aug+",
      num: 4,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 7,
      semitoneLocation: 7,
      octaveGap: 0
    },
    {
      type: "aug",
      num: 4,
      cnPrefix: "\u589E",
      isNatural: true,
      alter: 1,
      semitoneGap: 6,
      semitoneLocation: 6,
      octaveGap: 0
    },
    {
      type: "p",
      num: 4,
      cnPrefix: "\u7EAF",
      isNatural: true,
      alter: 0,
      semitoneGap: 5,
      semitoneLocation: 5,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 4,
      cnPrefix: "\u51CF",
      isNatural: false,
      alter: -1,
      semitoneGap: 4,
      semitoneLocation: 4,
      octaveGap: 0
    },
    {
      type: "dim-",
      num: 4,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: 3,
      semitoneLocation: 3,
      octaveGap: 0
    },
    {
      type: "aug+",
      num: 5,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 9,
      semitoneLocation: 9,
      octaveGap: 0
    },
    {
      type: "aug",
      num: 5,
      cnPrefix: "\u589E",
      isNatural: false,
      alter: 1,
      semitoneGap: 8,
      semitoneLocation: 8,
      octaveGap: 0
    },
    {
      type: "p",
      num: 5,
      cnPrefix: "\u7EAF",
      isNatural: true,
      alter: 0,
      semitoneGap: 7,
      semitoneLocation: 7,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 5,
      cnPrefix: "\u51CF",
      isNatural: true,
      alter: -1,
      semitoneGap: 6,
      semitoneLocation: 6,
      octaveGap: 0
    },
    {
      type: "dim-",
      num: 5,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: 5,
      semitoneLocation: 5,
      octaveGap: 0
    },
    {
      type: "aug+",
      num: 6,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 11,
      semitoneLocation: 11,
      octaveGap: 0
    },
    {
      type: "aug",
      num: 6,
      cnPrefix: "\u589E",
      isNatural: false,
      alter: 1,
      semitoneGap: 10,
      semitoneLocation: 10,
      octaveGap: 0
    },
    {
      type: "maj",
      num: 6,
      cnPrefix: "\u5927",
      isNatural: true,
      alter: 0,
      semitoneGap: 9,
      semitoneLocation: 9,
      octaveGap: 0
    },
    {
      type: "min",
      num: 6,
      cnPrefix: "\u5C0F",
      isNatural: true,
      alter: 0,
      semitoneGap: 8,
      semitoneLocation: 8,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 6,
      cnPrefix: "\u51CF",
      isNatural: false,
      alter: -1,
      semitoneGap: 7,
      semitoneLocation: 7,
      octaveGap: 0
    },
    {
      type: "dim-",
      num: 6,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: 6,
      semitoneLocation: 6,
      octaveGap: 0
    },
    {
      type: "aug+",
      num: 7,
      cnPrefix: "\u500D\u589E",
      isNatural: false,
      alter: 2,
      semitoneGap: 13,
      semitoneLocation: 1,
      octaveGap: 1
    },
    {
      type: "aug",
      num: 7,
      cnPrefix: "\u589E",
      isNatural: false,
      alter: 1,
      semitoneGap: 12,
      semitoneLocation: 0,
      octaveGap: 1
    },
    {
      type: "maj",
      num: 7,
      cnPrefix: "\u5927",
      isNatural: true,
      alter: 0,
      semitoneGap: 11,
      semitoneLocation: 11,
      octaveGap: 0
    },
    {
      type: "min",
      num: 7,
      cnPrefix: "\u5C0F",
      isNatural: true,
      alter: 0,
      semitoneGap: 10,
      semitoneLocation: 10,
      octaveGap: 0
    },
    {
      type: "dim",
      num: 7,
      cnPrefix: "\u51CF",
      isNatural: false,
      alter: -1,
      semitoneGap: 9,
      semitoneLocation: 9,
      octaveGap: 0
    },
    {
      type: "dim-",
      num: 7,
      cnPrefix: "\u500D\u51CF",
      isNatural: false,
      alter: -2,
      semitoneGap: 8,
      semitoneLocation: 8,
      octaveGap: 0
    }
  ]
);

// src/interval/cls/classFn/cls_initInterval.ts
var initIntervalClass = (intervalType = "p", intervalNum = 1) => {
  if (intervalNum <= 0) throw new IntervalError("Interval num cannot be 0 or negative!");
  const intervalNumRadix = new IntervalRadix(intervalNum);
  const findObj = intervalMeta_default.where("type", intervalType).where(
    "num",
    intervalNumRadix.intervalNumWithinOctave
  ).first();
  if (findObj) return [findObj, intervalNumRadix.octave];
  throw new IntervalError("Interval type doesn't match interval num.(e.g. maj1)");
};

// src/interval/cls/classFn/cls_getEqualInterval.ts
var cls_getEqualInterval_default = (intervalInstance, isSelfTypeExcluded = false, isAugDimExcluded = false, isDoubleAugDimExcluded = false) => {
  if (intervalInstance.num < 1) throw new IntervalError("Interval num cannot be 0 or negative!");
  if (intervalInstance.num === 1 && [10, 11].includes(intervalInstance.semitoneLocation)) {
    throw new IntervalError("Don't calculate the interval of dim1 or double dim1!");
  }
  if (intervalInstance.num === 2 && intervalInstance.semitoneLocation === 11) {
    throw new IntervalError("Don't calculate the interval of double dim2!");
  }
  if (intervalInstance.num === 1 && intervalInstance.semitoneLocation === 0) {
    if (isSelfTypeExcluded && isAugDimExcluded) return [];
    if (isSelfTypeExcluded && !isAugDimExcluded) return [new Interval("dim", 2)];
    if (!isSelfTypeExcluded && !isAugDimExcluded) return [
      new Interval("p", 1),
      new Interval("dim", 2)
    ];
  }
  const findIntervalOnSameLocation = intervalMeta_default.where(
    "semitoneLocation",
    intervalInstance.semitoneLocation
  ).all();
  if (!findIntervalOnSameLocation) throw new IntervalError("Internal bugs. Can't find same intervals.");
  const resultList = [];
  const doPush = (item) => {
    const readyIntervalNum = item.num + 7 * (intervalInstance.factOctaveGap - item.octaveGap);
    if (readyIntervalNum <= 0) return;
    resultList.push(new Interval(item.type, readyIntervalNum));
  };
  findIntervalOnSameLocation.forEach((x) => {
    if (isSelfTypeExcluded && x.type === intervalInstance.type) return;
    if (isAugDimExcluded && ["aug", "dim"].includes(x.type)) return;
    if (isDoubleAugDimExcluded && ["aug+", "dim-"].includes(x.type)) return;
    doPush(x);
  });
  return resultList;
};

// src/interval/cls/IntervalClass.ts
var Interval = class {
  constructor(intervalType = "p", intervalNum = 1) {
    __publicField(this, "cnPrefix");
    __publicField(this, "type");
    __publicField(this, "isNatural");
    __publicField(this, "numWithinOctave");
    __publicField(this, "num");
    __publicField(this, "semitoneGap");
    __publicField(this, "logicOctaveGap");
    __publicField(this, "factOctaveGap");
    __publicField(this, "semitoneLocation");
    __publicField(this, "semitoneGapWithinOctave");
    const intervalFullObj = initIntervalClass(intervalType, intervalNum);
    const intervalObjWithinOctave = intervalFullObj[0];
    this.semitoneLocation = intervalObjWithinOctave.semitoneLocation;
    this.logicOctaveGap = intervalFullObj[1];
    this.cnPrefix = intervalObjWithinOctave.cnPrefix;
    this.semitoneGapWithinOctave = intervalObjWithinOctave.semitoneGap;
    this.type = intervalObjWithinOctave.type;
    this.numWithinOctave = intervalObjWithinOctave.num;
    this.num = intervalNum;
    this.isNatural = intervalObjWithinOctave.isNatural;
    this.factOctaveGap = intervalObjWithinOctave.octaveGap + this.logicOctaveGap;
    this.semitoneGap = intervalObjWithinOctave.semitoneGap + this.logicOctaveGap * 12;
  }
  get simpleDescription() {
    return `${this.cnPrefix}${numberToChinese(this.num, { chineseType: "simplified" })}\u5EA6`;
  }
  getEqualInterval(isSelfTypeExcluded = false, isAugDimExcluded = false, isDoubleAugDimExcluded = false) {
    return cls_getEqualInterval_default(
      this,
      isSelfTypeExcluded,
      isAugDimExcluded,
      isDoubleAugDimExcluded
    );
  }
};

// src/note/cls/classFn/cls_getHarmonicSeries.ts
var overtoneSeriesIntervalList = [
  ["p", 8],
  ["p", 5],
  ["p", 4],
  ["maj", 3],
  ["min", 3],
  ["min", 3],
  ["maj", 2],
  ["maj", 2],
  ["maj", 2],
  ["maj", 2],
  ["min", 2],
  ["maj", 2],
  ["min", 2],
  ["aug", 1],
  ["min", 2]
];
var cls_getHarmonicSeries_default = (step, alter, octave) => {
  let arr = [];
  if (Math.abs(alter) > 1) return arr;
  let baseNote = new Note(step, alter, octave);
  for (let i of overtoneSeriesIntervalList) {
    const intervalObj = new Interval(i[0], i[1]);
    try {
      const targetNote = baseNote.getNoteByInterval(intervalObj);
      baseNote = new Note(targetNote.step, targetNote.alter, octave);
      arr.push({
        step: targetNote.step,
        alter: targetNote.alter,
        locationID: targetNote.locationId,
        artName: targetNote.artName
      });
    } catch (e) {
      arr.push(void 0);
    }
  }
  return arr;
};

// src/note/cls/classFn/cls_initNoteClass.ts
var initNoteClass = (step = "C", alter = 0) => {
  const noteStep = step.toString().toUpperCase().trim();
  const noteObj = noteMeta_default.where("step", noteStep).where("alter", alter).first();
  if (noteObj) return noteObj;
  throw new NoteError("Note step or alter exceeds limits.");
};

// src/interval/static/interavalTypeList.ts
var intervalTypeList_145 = ["dim-", "dim", "p", "aug", "aug+"];
var intervalTypeList_2367 = ["dim-", "dim", "min", "maj", "aug", "aug+"];

// src/interval/methods/intervalSlide.ts
var intervalSlide_145 = (currentInterval = "p", move = 0) => {
  const currentIndex = intervalTypeList_145.indexOf(currentInterval);
  const newIndex = currentIndex + move;
  if (intervalTypeList_145[newIndex]) return intervalTypeList_145[newIndex];
  throw new IntervalError("Interval beyond limit. (min:dim- max:aug+)");
};
var intervalSlide_2367 = (currentInterval = "maj", move = 0) => {
  const currentIndex = intervalTypeList_2367.indexOf(currentInterval);
  const newIndex = currentIndex + move;
  if (intervalTypeList_2367[newIndex]) return intervalTypeList_2367[newIndex];
  throw new IntervalError("Interval beyond limit. (min:dim- max:aug+)");
};

// src/note/cls/classFn/cls_getNoteByString.ts
var cls_getNoteByString_default = (noteInstance, numberNotation, isAscending = true) => {
  const intervalNumReg = numberNotation.match(/\d+/g);
  if (intervalNumReg.length > 1) throw new IntervalError("2 or more interval is given.");
  const lowOctaveReg = numberNotation.match(/[.lL<vV]/g);
  const lowOctaveValue = lowOctaveReg ? lowOctaveReg.length : 0;
  const highOctaveReg = numberNotation.match(/[*hH>^]/g);
  const highOctaveValue = highOctaveReg ? highOctaveReg.length : 0;
  const flatReg = numberNotation.match(/[-fFbB]/g);
  const flatRegValue = flatReg ? flatReg.length : 0;
  const sharpReg = numberNotation.match(/[+sS#]/g);
  const sharpRegValue = sharpReg ? sharpReg.length : 0;
  const totalOctaveGap = highOctaveValue - lowOctaveValue;
  const intervalNum = Number(intervalNumReg[0]);
  const intervalNumWithinOctave = new IntervalRadix(intervalNum).intervalNumWithinOctave;
  const totalAlterValue = sharpRegValue - flatRegValue;
  let intervalPrefix;
  if ([1, 4, 5].indexOf(intervalNumWithinOctave) != -1) {
    intervalPrefix = intervalSlide_145("p", totalAlterValue);
  } else if ([2, 3, 6, 7].indexOf(intervalNumWithinOctave) != -1) {
    intervalPrefix = intervalSlide_2367("maj", totalAlterValue);
  }
  const intervalInstance = new Interval(intervalPrefix, intervalNum);
  if (totalOctaveGap === 0) return noteInstance.getNoteByInterval(intervalInstance, isAscending);
  const noteNeedOctaveShift = noteInstance.getNoteByInterval(intervalInstance, isAscending);
  return new Note(
    noteNeedOctaveShift.step,
    noteNeedOctaveShift.alter,
    noteNeedOctaveShift.octave + totalOctaveGap
  );
};

// src/note/cls/classFn/cls_getTemp251.ts
var cls_getTemp251_default = (noteInstance, noteAs) => {
  if (![1, 2, 5].includes(noteAs)) throw new NoteError("251 function must be a number of 2/5/1");
  if (noteAs === 1) {
    return [
      noteInstance.getNoteByIntervalString("2"),
      noteInstance.getNoteByIntervalString("5"),
      noteInstance
    ];
  }
  if (noteAs === 2) {
    return [
      noteInstance,
      noteInstance.getNoteByIntervalString("4"),
      noteInstance.getNoteByIntervalString("2", false)
    ];
  }
  if (noteAs === 5) {
    return [
      noteInstance.getNoteByIntervalString("4", false),
      noteInstance,
      noteInstance.getNoteByIntervalString("5", false)
    ];
  }
};

// src/note/cls/classFn/cls_semitoneMove.ts
import collect3 from "collect.js";
import { isUndefined as isUndefined3 } from "lodash";
var cls_semitoneMove = (noteInstance, moveStep) => {
  if (moveStep === 0) return noteInstance;
  const originSemitoneRadix = new SemitoneRadix(noteInstance.pitchValue);
  const endSemitoneRadix = originSemitoneRadix.add(moveStep);
  const notesInfoList = endSemitoneRadix.getKeyboardNotes(1);
  const findZeroAlterNote = collect3(notesInfoList).where("isNormal", true).where("alter", 0).first();
  if (!isUndefined3(findZeroAlterNote)) {
    return new Note(findZeroAlterNote.step, findZeroAlterNote.alter, endSemitoneRadix.octave);
  }
  if (moveStep > 0) {
    const findSharpNote = collect3(notesInfoList).where("isNormal", true).where("alter", ">", 0).first();
    return new Note(findSharpNote.step, findSharpNote.alter, endSemitoneRadix.octave);
  }
  const findFlatNote = collect3(notesInfoList).where("isNormal", true).where("alter", "<", 0).first();
  return new Note(findFlatNote.step, findFlatNote.alter, endSemitoneRadix.octave);
};
var cls_semitoneMove_default = cls_semitoneMove;

// src/note/cls/NoteClass.ts
var Note = class {
  constructor(step = "C", alter = 0, octave = 4) {
    __publicField(this, "octave");
    __publicField(this, "step");
    __publicField(this, "alter");
    __publicField(this, "artName");
    __publicField(this, "mathName");
    __publicField(this, "fifthValue");
    __publicField(this, "isNormal");
    __publicField(this, "isBlack");
    __publicField(this, "locationId");
    __publicField(this, "semitoneWithinOctave");
    __publicField(this, "stepIndex");
    const noteObj = initNoteClass(step, alter);
    this.step = noteObj.step;
    this.alter = noteObj.alter;
    this.octave = octave;
    this.artName = noteObj.artName;
    this.mathName = noteObj.mathName;
    this.fifthValue = noteObj.fifthValue;
    this.isNormal = noteObj.isNormal;
    this.isBlack = noteObj.isBlack;
    this.locationId = noteObj.locationId;
    this.semitoneWithinOctave = noteObj.semitone;
    this.stepIndex = noteObj.stepIndex;
  }
  get pitchValue() {
    return this.octave * 12 + this.semitoneWithinOctave;
  }
  get simpleDescription() {
    return `${this.artName}${this.octave}`;
  }
  getNoteByInterval(intervalInstance, isAscending = true) {
    return cls_getNoteByInterval_default(this, intervalInstance, isAscending);
  }
  getNoteByIntervalString(numberNotationString, isAscending = true) {
    return cls_getNoteByString_default(this, numberNotationString, isAscending);
  }
  getSamePitchNotes(isSelfIncluded = true, alterAbsLessThan = 1) {
    return cls_getSamePitchNotes_default(this, isSelfIncluded, alterAbsLessThan);
  }
  semitoneMove(moveStep) {
    return cls_semitoneMove_default(this, moveStep);
  }
  getHarmonicSeries() {
    return cls_getHarmonicSeries_default(this.step, this.alter, this.octave);
  }
  get251as(noteAs) {
    return cls_getTemp251_default(this, noteAs);
  }
};

// src/note/methods/utGetNote.ts
import { isArray, isNumber as isNumber4, range as range2 } from "lodash";
import collect4 from "collect.js";

// src/common/utils/byDefault.ts
import { isNull as isNull3, isUndefined as isUndefined4 } from "lodash";
var byDefault = (input, defaultValue) => {
  if (isNull3(input) || isUndefined4(input)) return defaultValue;
  return input;
};
var byDefault_default = byDefault;

// src/note/methods/utGetNote.ts
var dealOctave = (octave = 4) => {
  if (isNumber4(octave)) return octave;
  if (isArray(octave)) {
    const a = collect4(octave).random();
    if (isNumber4(a)) return a;
    throw new Error("Octave inputs must be number type!");
  }
  return -1;
};
var getCasualRandomNote = (octave = 4) => {
  const noteObj = noteMeta_default.random();
  return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
var getWhiteRandomNote = (octave = 4, isNormal = true) => {
  if (isNormal) {
    const noteObj2 = noteMeta_default.where("uid", "<=", 7).random();
    return new Note(noteObj2.step, noteObj2.alter, dealOctave(octave));
  }
  const noteObj = noteMeta_default.where("isBlack", false).random();
  return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
var getBlackRandomNote = (octave = 4, isNormal = true) => {
  if (isNormal) {
    const noteObj2 = noteMeta_default.where("isBlack", true).where("isNormal", true).random();
    return new Note(noteObj2.step, noteObj2.alter, dealOctave(octave));
  }
  const noteObj = noteMeta_default.where("isBlack", true).random();
  return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
var getNormalRandomNote = (octave = 4) => {
  const noteObj = noteMeta_default.where("isNormal", true).random();
  return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
var getNoteByLocation = (location, octave) => {
  if (!range2(12).includes(location)) throw new Error("location must be in range of 0 - 11.");
  const defaultOctave = byDefault_default(octave, 4);
  return noteMeta_default.where("isNormal", true).where("locationId", location).all().map((x) => {
    return new Note(x.step, x.alter, defaultOctave);
  });
};

// src/note/methods/getUpwardLocationGap.ts
var getUpwardLocationGap = (baseLocation, targetLocation) => {
  const numberGapWithRoot = Base12Radix.fromArray([1, baseLocation]).getGap(Base12Radix.fromArray([1, targetLocation]));
  if (numberGapWithRoot < 0) {
    return Base12Radix.fromArray([1, baseLocation]).getGap(Base12Radix.fromArray([2, targetLocation]));
  }
  return numberGapWithRoot;
};

// src/interval/index.ts
var interval_exports = {};
__export(interval_exports, {
  Interval: () => Interval,
  getIntervalByComparingNotes: () => getIntervalByComparingNotes,
  getIntervalBySemitoneGap: () => getIntervalBySemitoneGap
});

// src/interval/methods/getIntervalByComparingNotes.ts
var getIntervalByComparingNotes = (note1, note2) => {
  let semitoneGap = note2.pitchValue - note1.pitchValue;
  const note1StepRadix = StepRadix.fromArray([note1.octave, note1.step]);
  const note2StepRadix = StepRadix.fromArray([note2.octave, note2.step]);
  if (semitoneGap === 0) {
    const intervalGap = Math.abs(note1StepRadix.getGap(note2StepRadix)) + 1;
    const findIntervalObj2 = intervalMeta_default.where("semitoneGap", 0).where("num", intervalGap).first();
    if (findIntervalObj2) return new Interval(findIntervalObj2.type, findIntervalObj2.num);
    throw new IntervalError("Parallel but not fit interval.");
  }
  semitoneGap = Math.abs(semitoneGap);
  const semitoneGapArr = new SemitoneRadix(semitoneGap).twoDigitArray;
  const stepGapArr = new Base7Radix(Math.abs(note1StepRadix.getGap(note2StepRadix))).twoDigitArray;
  let semitoneWithinOctave = semitoneGapArr[1];
  if (stepGapArr[0] !== semitoneGapArr[0]) {
    semitoneWithinOctave = semitoneGapArr[1] + 12 * (semitoneGapArr[0] - stepGapArr[0]);
  }
  const findIntervalObj = intervalMeta_default.where("semitoneGap", semitoneWithinOctave).where("num", stepGapArr[1] + 1).first();
  if (findIntervalObj) {
    return new Interval(findIntervalObj.type, stepGapArr[0] * 7 + stepGapArr[1] + 1);
  }
  throw new IntervalError("Cannot find the interval.");
};

// src/interval/methods/getIntervalBySemitoneGap.ts
import { isNumber as isNumber5, isUndefined as isUndefined5 } from "lodash";
var getIntervalBySemitoneGap = (semitoneGap) => {
  const semitoneGapAbs = Math.abs(semitoneGap);
  const semitoneGapRadix = new Base12Radix(semitoneGapAbs);
  const findResult = intervalMeta_default.where("isNatural", true).where("semitoneGap", semitoneGapRadix.lastDigit).all();
  if (isUndefined5(findResult) || isNumber5(findResult)) return [];
  if (findResult.length === 0) return [];
  return findResult.map((item) => {
    return new Interval(item.type, item.num + semitoneGapRadix.firstDigit * 7);
  });
};

// src/scale/presets/ScaleMode.ts
var ScaleMode_default = {
  NaturalMajor: "MAJ",
  NaturalMinor: "MIN",
  Ionian: "MAJ",
  Aeolian: "MIN",
  Dorian: "DOR",
  Phrygian: "PHR",
  Lydian: "LYD",
  Mixolydian: "MLY",
  Locrian: "LOC",
  HarmonicMinor: "HMIN",
  HarmonicMajor: "HMAJ",
  MelodicMinorAscending: "MMINASC",
  MelodicMajorDescending: "MMAJDESC"
};

// src/scale/static/modeMeta.ts
var Major = {
  uid: ScaleMode_default.NaturalMajor,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  name: "\u81EA\u7136\u5927\u8C03",
  type: "major",
  description: "\u4E5F\u79F0\u4E3A\u81EA\u7136\u5927\u8C03\uFF0C\u81EA\u7136\u5927\u8C03\u7684 I \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 C \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 C\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 6 7 1"
};
var HarmonicMajor = {
  uid: ScaleMode_default.HarmonicMajor,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  name: "\u548C\u58F0\u5927\u8C03",
  type: "major",
  description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u516D\u7EA7\u97F3\u964D\u4F4E\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 b6 7 1"
};
var MelodicMajor = {
  uid: ScaleMode_default.MelodicMajorDescending,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  name: "\u65CB\u5F8B\u5927\u8C03\uFF08\u4E0B\u884C\uFF09",
  type: "major",
  description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u516D\u3001\u4E03\u7EA7\u97F3\u964D\u4F4E\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 b6 b7 1"
};
var Minor = {
  uid: ScaleMode_default.NaturalMinor,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  name: "\u81EA\u7136\u5C0F\u8C03",
  type: "minor",
  description: "\u81EA\u7136\u5C0F\u8C03\uFF0C\u81EA\u7136\u5927\u8C03\u7684 VI \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 A \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 A\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 b6 b7 1"
};
var HarmonicMinor = {
  uid: ScaleMode_default.HarmonicMinor,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  name: "\u548C\u58F0\u5C0F\u8C03",
  type: "minor",
  description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u4E03\u7EA7\u97F3\u5347\u9AD8\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 b6 7 1"
};
var MelodicMinor = {
  uid: ScaleMode_default.MelodicMinorAscending,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  name: "\u65CB\u5F8B\u5C0F\u8C03\uFF08\u4E0A\u884C\uFF09",
  type: "minor",
  description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u4E03\u7EA7\u97F3\u5347\u9AD8\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 6 7 1"
};
var Dorian = {
  uid: ScaleMode_default.Dorian,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  name: "Dorian",
  type: "minor",
  description: "\u81EA\u7136\u5927\u8C03\u7684 II \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 D \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 D\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 6 b7 1"
};
var Phrygian = {
  uid: ScaleMode_default.Phrygian,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  name: "Phrygian",
  type: "minor",
  description: "\u81EA\u7136\u5927\u8C03\u7684 III \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 E \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 E\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 b2 b3 4 5 b6 b7 1"
};
var Lydian = {
  uid: ScaleMode_default.Lydian,
  intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  name: "Lydian",
  type: "major",
  description: "\u81EA\u7136\u5927\u8C03\u7684 IV \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 F \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 F\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 #4 5 6 7 1"
};
var MixoLydian = {
  uid: ScaleMode_default.Mixolydian,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  name: "Mixolydian",
  type: "major",
  description: "\u81EA\u7136\u5927\u8C03\u7684 GuideDot \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 G \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 G\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 6 b7 1"
};
var Locrian = {
  uid: ScaleMode_default.Locrian,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["dim", 5], ["min", 6], ["min", 7]],
  name: "Locrian\u534A\u51CF\u4E03\u8C03",
  type: "halfdim7",
  description: "\u81EA\u7136\u5927\u8C03\u7684 VII \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 B \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 B\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 b2 b3 4 b5 b6 b7 1"
};
var modeMeta_default = [
  Major,
  Minor,
  HarmonicMajor,
  MelodicMajor,
  MelodicMinor,
  HarmonicMinor,
  Dorian,
  Lydian,
  MixoLydian,
  Locrian,
  Phrygian
];

// src/scale/cls/classFn/cls_initScale.ts
import collect5 from "collect.js";
var cls_initScale_default = (rootNote, scaleMode = "MAJ") => {
  let modeName = scaleMode.trim().toUpperCase();
  if (modeName === "AEO") modeName = "MIN";
  else if (modeName === "ION") modeName = "MAJ";
  const findModeObj = collect5(modeMeta_default).where("uid", modeName).first();
  if (!findModeObj) {
    throw new ScaleError("Cannot find the scale mode, please check.");
  }
  const type = findModeObj.type;
  const intervalPanel = {};
  const notesList = [rootNote];
  try {
    findModeObj.intervalList.forEach((x) => {
      intervalPanel[x[1]] = x[0];
      const intervalInstance = new Interval(x[0], x[1]);
      const targetNote = rootNote.getNoteByInterval(intervalInstance);
      notesList.push(targetNote);
    });
  } catch {
    throw new ScaleError("Maybe the root note is not fit for the scale.");
  }
  let staveAlters = 0;
  let staveAlterTimes = 0;
  notesList.forEach((x) => {
    if (x.alter > 0) {
      staveAlterTimes += 1;
      staveAlters += x.alter;
    } else if (x.alter < 0) {
      staveAlterTimes -= 1;
      staveAlters += x.alter;
    }
  });
  return {
    intervalPanel,
    notesList,
    includedAlters: staveAlters,
    staveAlterTimes,
    type,
    intervalList: findModeObj.intervalList,
    modeName: findModeObj.name,
    modeUID: findModeObj.uid,
    description: findModeObj.description,
    chord3OfDegreesList: findModeObj.chord3OfDegreesList,
    chord7OfDegreesList: findModeObj.chord7OfDegreesList
  };
};

// src/scale/cls/classFn/cls_getNotesList.ts
var cls_getNotesList = (rootNote, intervalList) => {
  const resultList = [rootNote];
  intervalList.forEach((x) => {
    const targetInterval = new Interval(x[0], x[1]);
    resultList.push(rootNote.getNoteByInterval(targetInterval));
  });
  return resultList;
};
var cls_getNotesList_default = cls_getNotesList;

// src/scale/cls/classFn/cls_getNotesPanel.ts
var cls_getNotesPanel = (rootNote, intervalList) => {
  const result = { 1: rootNote };
  try {
    intervalList.forEach((intervalItem) => {
      const intervalInstance = new Interval(intervalItem[0], intervalItem[1]);
      result[intervalItem[1]] = rootNote.getNoteByInterval(intervalInstance);
    });
  } catch {
    throw new ScaleError("Maybe the root note is not fit for the scale.");
  }
  return result;
};
var cls_getNotesPanel_default = cls_getNotesPanel;

// src/scale/cls/classFn/cls_getNoteByIntervalNum.ts
var cls_getNoteByIntervalNum = (notesList, num, isWithinOctave = false) => {
  const intervalNumList = new IntervalRadix(num).twoDigitArray;
  if (intervalNumList[0] === 0 || isWithinOctave) return notesList[intervalNumList[1] - 1];
  const targetNote = notesList[intervalNumList[1]];
  const newOctave = intervalNumList[0] + targetNote.octave;
  return new Note(targetNote.step, targetNote.alter, newOctave);
};
var cls_getNoteByIntervalNum_default = cls_getNoteByIntervalNum;

// src/scale/cls/classFn/cls_getIntervalList.ts
import { keys } from "lodash";
var cls_getIntervalList = (intervalPanel) => {
  const result = [];
  for (const i of keys(intervalPanel)) {
    result.push([intervalPanel[i], Number(i)]);
  }
  return result;
};
var cls_getIntervalList_default = cls_getIntervalList;

// src/scale/cls/classFn/cls_getAlterList.ts
var cls_getAlterList = (itvList) => {
  if (itvList.length !== 6) throw new ScaleError("Interval List must be the length of 6.");
  const result = Array.from({ length: 7 }, () => 0);
  itvList.map((x, y) => {
    if ([4, 5].includes(x[1])) {
      if (x[0] === "p") return;
      else if (x[0] === "dim") result[y + 1] = -1;
      else if (x[0] === "dim-") result[y + 1] = -2;
      else if (x[0] === "aug") result[y + 1] = 1;
      else if (x[0] === "aug+") result[y + 1] = 2;
      else throw new ScaleError("Unknown value type");
      return;
    }
    if (x[0] === "maj") return;
    else if (x[0] === "min") result[y + 1] = -1;
    else if (x[0] === "dim") result[y + 1] = -2;
    else if (x[0] === "aug") result[y + 1] = 1;
    else if (x[0] === "aug+") result[y + 1] = 2;
    else throw new ScaleError("Unknown value type");
  });
  return result;
};
var cls_getAlterList_default = cls_getAlterList;

// src/scale/cls/classFn/cls_getDegreeNote.ts
var cls_getDegreeNote = (notesList, degree) => {
  const index = new ScaleRadix(degree).scaleDegree - 1;
  return notesList[index];
};
var cls_getDegreeNote_default = cls_getDegreeNote;

// src/scale/cls/classFn/cls_findOneChordInScale.ts
import collect6 from "collect.js";

// src/chord/static/findChordMeta.ts
var findChordMeta = [{
  "rootNoteLocation": 0,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [0, 4, 7],
  "orderedNotesLocationList": [0, 4, 7],
  "n3L": 4,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [0, 3, 7],
  "orderedNotesLocationList": [0, 3, 7],
  "n3L": 3,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [0, 3, 6],
  "orderedNotesLocationList": [0, 3, 6],
  "n3L": 3,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [0, 4, 8],
  "orderedNotesLocationList": [0, 4, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [0, 4, 6],
  "orderedNotesLocationList": [0, 4, 6],
  "n3L": 4,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 4, 7, 9],
  "orderedNotesLocationList": [0, 4, 7, 9],
  "n3L": 4,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 3, 7, 9],
  "orderedNotesLocationList": [0, 3, 7, 9],
  "n3L": 3,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [0, 4, 7, 9, 2],
  "orderedNotesLocationList": [0, 2, 4, 7, 9],
  "n3L": 4,
  "n5L": 7,
  "n7L": -1,
  "n9L": 2,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [0, 3, 7, 9, 2],
  "orderedNotesLocationList": [0, 2, 3, 7, 9],
  "n3L": 3,
  "n5L": 7,
  "n7L": -1,
  "n9L": 2,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 4, 7, 2],
  "orderedNotesLocationList": [0, 2, 4, 7],
  "n3L": 4,
  "n5L": 7,
  "n7L": -1,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 4, 7, 5],
  "orderedNotesLocationList": [0, 4, 5, 7],
  "n3L": 4,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 3, 7, 2],
  "orderedNotesLocationList": [0, 2, 3, 7],
  "n3L": 3,
  "n5L": 7,
  "n7L": -1,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 3, 7, 5],
  "orderedNotesLocationList": [0, 3, 5, 7],
  "n3L": 3,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [0, 4, 7, 11, 5],
  "orderedNotesLocationList": [0, 4, 5, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [0, 4, 7, 9, 10],
  "orderedNotesLocationList": [0, 4, 7, 9, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [0, 6, 8],
  "orderedNotesLocationList": [0, 6, 8],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 6,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [0, 2, 6, 8],
  "orderedNotesLocationList": [0, 2, 6, 8],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 2,
  "n11L": 6,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [0, 3, 6, 8],
  "orderedNotesLocationList": [0, 3, 6, 8],
  "n3L": 3,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 6,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 4, 7, 11],
  "orderedNotesLocationList": [0, 4, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 4, 7, 10],
  "orderedNotesLocationList": [0, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 3, 7, 10],
  "orderedNotesLocationList": [0, 3, 7, 10],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 3, 6, 10],
  "orderedNotesLocationList": [0, 3, 6, 10],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 3, 6, 9],
  "orderedNotesLocationList": [0, 3, 6, 9],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 3, 7, 11],
  "orderedNotesLocationList": [0, 3, 7, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [0, 4, 8, 10],
  "orderedNotesLocationList": [0, 4, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [0, 4, 8, 11],
  "orderedNotesLocationList": [0, 4, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 6, 10],
  "orderedNotesLocationList": [0, 4, 6, 10],
  "n3L": 4,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 10, 1],
  "orderedNotesLocationList": [0, 1, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 10, 3],
  "orderedNotesLocationList": [0, 3, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 10, 6],
  "orderedNotesLocationList": [0, 4, 6, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 10, 8],
  "orderedNotesLocationList": [0, 4, 7, 8, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 6, 10, 1],
  "orderedNotesLocationList": [0, 1, 4, 6, 10],
  "n3L": 4,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 6, 10, 3],
  "orderedNotesLocationList": [0, 3, 4, 6, 10],
  "n3L": 4,
  "n5L": 6,
  "n7L": 10,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 6, 11],
  "orderedNotesLocationList": [0, 4, 6, 11],
  "n3L": 4,
  "n5L": 6,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 8, 11],
  "orderedNotesLocationList": [0, 4, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 11, 1],
  "orderedNotesLocationList": [0, 1, 4, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 11, 8],
  "orderedNotesLocationList": [0, 4, 7, 8, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 7, 11, 6],
  "orderedNotesLocationList": [0, 4, 6, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [0, 3, 8, 10],
  "orderedNotesLocationList": [0, 3, 8, 10],
  "n3L": 3,
  "n5L": 8,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [0, 3, 6, 11],
  "orderedNotesLocationList": [0, 3, 6, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [0, 3, 8, 11],
  "orderedNotesLocationList": [0, 3, 8, 11],
  "n3L": 3,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 8, 10, 1],
  "orderedNotesLocationList": [0, 1, 4, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [0, 4, 8, 10, 3],
  "orderedNotesLocationList": [0, 3, 4, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 10,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [0, 2, 7],
  "orderedNotesLocationList": [0, 2, 7],
  "n3L": -1,
  "n5L": 7,
  "n7L": -1,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7],
  "orderedNotesLocationList": [0, 5, 7],
  "n3L": -1,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [0, 2, 7, 10],
  "orderedNotesLocationList": [0, 2, 7, 10],
  "n3L": -1,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7, 10],
  "orderedNotesLocationList": [0, 5, 7, 10],
  "n3L": -1,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [0, 2, 7, 11],
  "orderedNotesLocationList": [0, 2, 7, 11],
  "n3L": -1,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7, 11],
  "orderedNotesLocationList": [0, 5, 7, 11],
  "n3L": -1,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 5, 7, 10],
  "n3L": -1,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 5, 7, 11],
  "n3L": -1,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7, 10, 2, 9],
  "orderedNotesLocationList": [0, 2, 5, 7, 9, 10],
  "n3L": -1,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [0, 5, 7, 11, 2, 9],
  "orderedNotesLocationList": [0, 2, 5, 7, 9, 11],
  "n3L": -1,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [0, 2, 7, 11, 9],
  "orderedNotesLocationList": [0, 2, 7, 9, 11],
  "n3L": -1,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 4, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [0, 3, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 7, 10],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [0, 3, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 3, 7, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [0, 4, 8, 10, 2],
  "orderedNotesLocationList": [0, 2, 4, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 10,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 10, 1],
  "orderedNotesLocationList": [0, 1, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 10, 2, 4],
  "orderedNotesLocationList": [0, 2, 4, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 10, 2, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 10, 2, 8],
  "orderedNotesLocationList": [0, 2, 4, 7, 8, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [0, 4, 6, 11, 2],
  "orderedNotesLocationList": [0, 2, 4, 6, 11],
  "n3L": 4,
  "n5L": 6,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [0, 4, 8, 11, 2],
  "orderedNotesLocationList": [0, 2, 4, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 11, 2, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [0, 4, 7, 11, 2, 8],
  "orderedNotesLocationList": [0, 2, 4, 7, 8, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [0, 3, 6, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 6, 10],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [0, 3, 7, 10, 1],
  "orderedNotesLocationList": [0, 1, 3, 7, 10],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [0, 4, 7, 11, 2, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [0, 4, 7, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [0, 3, 7, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 10],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [0, 3, 7, 11, 2, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [0, 4, 6, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 6, 10],
  "n3L": 4,
  "n5L": 6,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [0, 4, 8, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [0, 4, 7, 10, 1, 5],
  "orderedNotesLocationList": [0, 1, 4, 5, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [0, 4, 7, 10, 3, 5],
  "orderedNotesLocationList": [0, 3, 4, 5, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 3,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [0, 4, 7, 10, 2, 5, 8],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": 8
}, {
  "rootNoteLocation": 0,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [0, 3, 6, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 10],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 11, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 10, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [0, 3, 7, 10, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [0, 3, 7, 11, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [0, 4, 6, 10, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 4, 5, 6, 9, 10],
  "n3L": 4,
  "n5L": 6,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [0, 4, 8, 10, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 4, 5, 8, 9, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 10,
  "n9L": 2,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 10, 1, 5, 9],
  "orderedNotesLocationList": [0, 1, 4, 5, 7, 9, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": 5,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 10, 3, 9],
  "orderedNotesLocationList": [0, 3, 4, 7, 9, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 3,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 10, 2, 6, 9],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": 2,
  "n11L": 6,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [0, 4, 6, 11, 2, 9],
  "orderedNotesLocationList": [0, 2, 4, 6, 9, 11],
  "n3L": 4,
  "n5L": 6,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [0, 4, 8, 11, 2, 9],
  "orderedNotesLocationList": [0, 2, 4, 8, 9, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 11, 1, 9],
  "orderedNotesLocationList": [0, 1, 4, 7, 9, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 1,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 0,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [0, 4, 7, 11, 2, 6, 9],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": 6,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [1, 5, 8],
  "orderedNotesLocationList": [1, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [1, 4, 8],
  "orderedNotesLocationList": [1, 4, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [1, 4, 7],
  "orderedNotesLocationList": [1, 4, 7],
  "n3L": 4,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [1, 5, 9],
  "orderedNotesLocationList": [1, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [1, 5, 7],
  "orderedNotesLocationList": [1, 5, 7],
  "n3L": 5,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 5, 8, 10],
  "orderedNotesLocationList": [1, 5, 8, 10],
  "n3L": 5,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 4, 8, 10],
  "orderedNotesLocationList": [1, 4, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [1, 5, 8, 10, 3],
  "orderedNotesLocationList": [1, 3, 5, 8, 10],
  "n3L": 5,
  "n5L": 8,
  "n7L": -1,
  "n9L": 3,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [1, 4, 8, 10, 3],
  "orderedNotesLocationList": [1, 3, 4, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": -1,
  "n9L": 3,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 5, 8, 3],
  "orderedNotesLocationList": [1, 3, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": -1,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 5, 8, 6],
  "orderedNotesLocationList": [1, 5, 6, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 4, 8, 3],
  "orderedNotesLocationList": [1, 3, 4, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": -1,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 4, 8, 6],
  "orderedNotesLocationList": [1, 4, 6, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [1, 5, 8, 0, 6],
  "orderedNotesLocationList": [0, 1, 5, 6, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [1, 5, 8, 10, 11],
  "orderedNotesLocationList": [1, 5, 8, 10, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [1, 7, 9],
  "orderedNotesLocationList": [1, 7, 9],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 7,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [1, 3, 7, 9],
  "orderedNotesLocationList": [1, 3, 7, 9],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 3,
  "n11L": 7,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [1, 4, 7, 9],
  "orderedNotesLocationList": [1, 4, 7, 9],
  "n3L": 4,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 7,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 5, 8, 11],
  "orderedNotesLocationList": [1, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 4, 8, 11],
  "orderedNotesLocationList": [1, 4, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 4, 7, 11],
  "orderedNotesLocationList": [1, 4, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 4, 7, 10],
  "orderedNotesLocationList": [1, 4, 7, 10],
  "n3L": 4,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 4, 8, 0],
  "orderedNotesLocationList": [0, 1, 4, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [1, 5, 9, 11],
  "orderedNotesLocationList": [1, 5, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [1, 5, 9, 0],
  "orderedNotesLocationList": [0, 1, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 7, 11],
  "orderedNotesLocationList": [1, 5, 7, 11],
  "n3L": 5,
  "n5L": 7,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 11, 2],
  "orderedNotesLocationList": [1, 2, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 11, 4],
  "orderedNotesLocationList": [1, 4, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 11, 7],
  "orderedNotesLocationList": [1, 5, 7, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 11, 9],
  "orderedNotesLocationList": [1, 5, 8, 9, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 7, 11, 2],
  "orderedNotesLocationList": [1, 2, 5, 7, 11],
  "n3L": 5,
  "n5L": 7,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 7, 11, 4],
  "orderedNotesLocationList": [1, 4, 5, 7, 11],
  "n3L": 5,
  "n5L": 7,
  "n7L": 11,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 7, 0],
  "orderedNotesLocationList": [0, 1, 5, 7],
  "n3L": 5,
  "n5L": 7,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 9, 0],
  "orderedNotesLocationList": [0, 1, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 0, 2],
  "orderedNotesLocationList": [0, 1, 2, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 0, 9],
  "orderedNotesLocationList": [0, 1, 5, 8, 9],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 8, 0, 7],
  "orderedNotesLocationList": [0, 1, 5, 7, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [1, 4, 9, 11],
  "orderedNotesLocationList": [1, 4, 9, 11],
  "n3L": 4,
  "n5L": 9,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [1, 4, 7, 0],
  "orderedNotesLocationList": [0, 1, 4, 7],
  "n3L": 4,
  "n5L": 7,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [1, 4, 9, 0],
  "orderedNotesLocationList": [0, 1, 4, 9],
  "n3L": 4,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 9, 11, 2],
  "orderedNotesLocationList": [1, 2, 5, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [1, 5, 9, 11, 4],
  "orderedNotesLocationList": [1, 4, 5, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 11,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [1, 3, 8],
  "orderedNotesLocationList": [1, 3, 8],
  "n3L": -1,
  "n5L": 8,
  "n7L": -1,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8],
  "orderedNotesLocationList": [1, 6, 8],
  "n3L": -1,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [1, 3, 8, 11],
  "orderedNotesLocationList": [1, 3, 8, 11],
  "n3L": -1,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8, 11],
  "orderedNotesLocationList": [1, 6, 8, 11],
  "n3L": -1,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [1, 3, 8, 0],
  "orderedNotesLocationList": [0, 1, 3, 8],
  "n3L": -1,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8, 0],
  "orderedNotesLocationList": [0, 1, 6, 8],
  "n3L": -1,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 6, 8, 11],
  "n3L": -1,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 6, 8],
  "n3L": -1,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8, 11, 3, 10],
  "orderedNotesLocationList": [1, 3, 6, 8, 10, 11],
  "n3L": -1,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [1, 6, 8, 0, 3, 10],
  "orderedNotesLocationList": [0, 1, 3, 6, 8, 10],
  "n3L": -1,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [1, 3, 8, 0, 10],
  "orderedNotesLocationList": [0, 1, 3, 8, 10],
  "n3L": -1,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [1, 4, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [1, 4, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 4, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [1, 5, 9, 11, 3],
  "orderedNotesLocationList": [1, 3, 5, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 11,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 11, 2],
  "orderedNotesLocationList": [1, 2, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 11, 3, 5],
  "orderedNotesLocationList": [1, 3, 5, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 11, 3, 7],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 11, 3, 9],
  "orderedNotesLocationList": [1, 3, 5, 8, 9, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [1, 5, 7, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 7],
  "n3L": 5,
  "n5L": 7,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [1, 5, 9, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 0, 3, 7],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [1, 5, 8, 0, 3, 9],
  "orderedNotesLocationList": [0, 1, 3, 5, 8, 9],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [1, 4, 7, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [1, 4, 8, 11, 2],
  "orderedNotesLocationList": [1, 2, 4, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [1, 5, 8, 0, 3, 6],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [1, 5, 8, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [1, 4, 8, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [1, 4, 8, 0, 3, 6],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8],
  "n3L": 4,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [1, 5, 7, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 5, 6, 7, 11],
  "n3L": 5,
  "n5L": 7,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [1, 5, 9, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 5, 6, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [1, 5, 8, 11, 2, 6],
  "orderedNotesLocationList": [1, 2, 5, 6, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [1, 5, 8, 11, 4, 6],
  "orderedNotesLocationList": [1, 4, 5, 6, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 4,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [1, 5, 8, 11, 3, 6, 9],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": 9
}, {
  "rootNoteLocation": 1,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [1, 4, 7, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 11],
  "n3L": 4,
  "n5L": 7,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 0, 3, 6, 10],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 11, 3, 6, 10],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [1, 4, 8, 11, 3, 6, 10],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n3L": 4,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [1, 4, 8, 0, 3, 6, 10],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
  "n3L": 4,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [1, 5, 7, 11, 3, 6, 10],
  "orderedNotesLocationList": [1, 3, 5, 6, 7, 10, 11],
  "n3L": 5,
  "n5L": 7,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [1, 5, 9, 11, 3, 6, 10],
  "orderedNotesLocationList": [1, 3, 5, 6, 9, 10, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 11,
  "n9L": 3,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 11, 2, 6, 10],
  "orderedNotesLocationList": [1, 2, 5, 6, 8, 10, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 2,
  "n11L": 6,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 11, 4, 10],
  "orderedNotesLocationList": [1, 4, 5, 8, 10, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 4,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 11, 3, 7, 10],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": 3,
  "n11L": 7,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [1, 5, 7, 0, 3, 10],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 10],
  "n3L": 5,
  "n5L": 7,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [1, 5, 9, 0, 3, 10],
  "orderedNotesLocationList": [0, 1, 3, 5, 9, 10],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 0, 2, 10],
  "orderedNotesLocationList": [0, 1, 2, 5, 8, 10],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 2,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 1,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [1, 5, 8, 0, 3, 7, 10],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": 7,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [2, 6, 9],
  "orderedNotesLocationList": [2, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [2, 5, 9],
  "orderedNotesLocationList": [2, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [2, 5, 8],
  "orderedNotesLocationList": [2, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [2, 6, 10],
  "orderedNotesLocationList": [2, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [2, 6, 8],
  "orderedNotesLocationList": [2, 6, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 6, 9, 11],
  "orderedNotesLocationList": [2, 6, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 5, 9, 11],
  "orderedNotesLocationList": [2, 5, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [2, 6, 9, 11, 4],
  "orderedNotesLocationList": [2, 4, 6, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": -1,
  "n9L": 4,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [2, 5, 9, 11, 4],
  "orderedNotesLocationList": [2, 4, 5, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": -1,
  "n9L": 4,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 6, 9, 4],
  "orderedNotesLocationList": [2, 4, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": -1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 6, 9, 7],
  "orderedNotesLocationList": [2, 6, 7, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 5, 9, 4],
  "orderedNotesLocationList": [2, 4, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": -1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 5, 9, 7],
  "orderedNotesLocationList": [2, 5, 7, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [2, 6, 9, 1, 7],
  "orderedNotesLocationList": [1, 2, 6, 7, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [2, 6, 9, 11, 0],
  "orderedNotesLocationList": [0, 2, 6, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [2, 8, 10],
  "orderedNotesLocationList": [2, 8, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 8,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [2, 4, 8, 10],
  "orderedNotesLocationList": [2, 4, 8, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 4,
  "n11L": 8,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [2, 5, 8, 10],
  "orderedNotesLocationList": [2, 5, 8, 10],
  "n3L": 5,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 8,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 6, 9, 1],
  "orderedNotesLocationList": [1, 2, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 6, 9, 0],
  "orderedNotesLocationList": [0, 2, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 5, 9, 0],
  "orderedNotesLocationList": [0, 2, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 5, 8, 0],
  "orderedNotesLocationList": [0, 2, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 5, 8, 11],
  "orderedNotesLocationList": [2, 5, 8, 11],
  "n3L": 5,
  "n5L": 8,
  "n7L": 11,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 5, 9, 1],
  "orderedNotesLocationList": [1, 2, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [2, 6, 10, 0],
  "orderedNotesLocationList": [0, 2, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [2, 6, 10, 1],
  "orderedNotesLocationList": [1, 2, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 8, 0],
  "orderedNotesLocationList": [0, 2, 6, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 0, 5],
  "orderedNotesLocationList": [0, 2, 5, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 0, 8],
  "orderedNotesLocationList": [0, 2, 6, 8, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 0, 10],
  "orderedNotesLocationList": [0, 2, 6, 9, 10],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 8, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 6, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 8, 0, 5],
  "orderedNotesLocationList": [0, 2, 5, 6, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": 0,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 8, 1],
  "orderedNotesLocationList": [1, 2, 6, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 10, 1],
  "orderedNotesLocationList": [1, 2, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 1, 3],
  "orderedNotesLocationList": [1, 2, 3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 1, 10],
  "orderedNotesLocationList": [1, 2, 6, 9, 10],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 9, 1, 8],
  "orderedNotesLocationList": [1, 2, 6, 8, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [2, 5, 10, 0],
  "orderedNotesLocationList": [0, 2, 5, 10],
  "n3L": 5,
  "n5L": 10,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [2, 5, 8, 1],
  "orderedNotesLocationList": [1, 2, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [2, 5, 10, 1],
  "orderedNotesLocationList": [1, 2, 5, 10],
  "n3L": 5,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 10, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [2, 6, 10, 0, 5],
  "orderedNotesLocationList": [0, 2, 5, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 0,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [2, 4, 9],
  "orderedNotesLocationList": [2, 4, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": -1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9],
  "orderedNotesLocationList": [2, 7, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [2, 4, 9, 0],
  "orderedNotesLocationList": [0, 2, 4, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9, 0],
  "orderedNotesLocationList": [0, 2, 7, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [2, 4, 9, 1],
  "orderedNotesLocationList": [1, 2, 4, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9, 1],
  "orderedNotesLocationList": [1, 2, 7, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 7, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 7, 9],
  "n3L": -1,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9, 0, 4, 11],
  "orderedNotesLocationList": [0, 2, 4, 7, 9, 11],
  "n3L": -1,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [2, 7, 9, 1, 4, 11],
  "orderedNotesLocationList": [1, 2, 4, 7, 9, 11],
  "n3L": -1,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [2, 4, 9, 1, 11],
  "orderedNotesLocationList": [1, 2, 4, 9, 11],
  "n3L": -1,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [2, 5, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [2, 5, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [2, 6, 10, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 0,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 0, 4, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 6,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 0, 4, 8],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 0, 4, 10],
  "orderedNotesLocationList": [0, 2, 4, 6, 9, 10],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [2, 6, 8, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [2, 6, 10, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 1, 4, 8],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [2, 6, 9, 1, 4, 10],
  "orderedNotesLocationList": [1, 2, 4, 6, 9, 10],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [2, 5, 8, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [2, 5, 9, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [2, 6, 9, 1, 4, 7],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [2, 6, 9, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [2, 5, 9, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [2, 5, 9, 1, 4, 7],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9],
  "n3L": 5,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [2, 6, 8, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 8],
  "n3L": 6,
  "n5L": 8,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [2, 6, 10, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [2, 6, 9, 0, 3, 7],
  "orderedNotesLocationList": [0, 2, 3, 6, 7, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [2, 6, 9, 0, 5, 7],
  "orderedNotesLocationList": [0, 2, 5, 6, 7, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 5,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [2, 6, 9, 0, 4, 7, 10],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": 10
}, {
  "rootNoteLocation": 2,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [2, 5, 8, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8],
  "n3L": 5,
  "n5L": 8,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 1, 4, 7, 11],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 0, 4, 7, 11],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [2, 5, 9, 0, 4, 7, 11],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [2, 5, 9, 1, 4, 7, 11],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
  "n3L": 5,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [2, 6, 8, 0, 4, 7, 11],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 8, 11],
  "n3L": 6,
  "n5L": 8,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [2, 6, 10, 0, 4, 7, 11],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 10, 11],
  "n3L": 6,
  "n5L": 10,
  "n7L": 0,
  "n9L": 4,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 0, 3, 7, 11],
  "orderedNotesLocationList": [0, 2, 3, 6, 7, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 3,
  "n11L": 7,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 0, 5, 11],
  "orderedNotesLocationList": [0, 2, 5, 6, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 5,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 0, 4, 8, 11],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": 4,
  "n11L": 8,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [2, 6, 8, 1, 4, 11],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 11],
  "n3L": 6,
  "n5L": 8,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [2, 6, 10, 1, 4, 11],
  "orderedNotesLocationList": [1, 2, 4, 6, 10, 11],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 1, 3, 11],
  "orderedNotesLocationList": [1, 2, 3, 6, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 3,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 2,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [2, 6, 9, 1, 4, 8, 11],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": 8,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [3, 7, 10],
  "orderedNotesLocationList": [3, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [3, 6, 10],
  "orderedNotesLocationList": [3, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [3, 6, 9],
  "orderedNotesLocationList": [3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [3, 7, 11],
  "orderedNotesLocationList": [3, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [3, 7, 9],
  "orderedNotesLocationList": [3, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 7, 10, 0],
  "orderedNotesLocationList": [0, 3, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 6, 10, 0],
  "orderedNotesLocationList": [0, 3, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [3, 7, 10, 0, 5],
  "orderedNotesLocationList": [0, 3, 5, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": -1,
  "n9L": 5,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [3, 6, 10, 0, 5],
  "orderedNotesLocationList": [0, 3, 5, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": -1,
  "n9L": 5,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 7, 10, 5],
  "orderedNotesLocationList": [3, 5, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": -1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 7, 10, 8],
  "orderedNotesLocationList": [3, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 6, 10, 5],
  "orderedNotesLocationList": [3, 5, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": -1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 6, 10, 8],
  "orderedNotesLocationList": [3, 6, 8, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [3, 7, 10, 2, 8],
  "orderedNotesLocationList": [2, 3, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [3, 7, 10, 0, 1],
  "orderedNotesLocationList": [0, 1, 3, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [3, 9, 11],
  "orderedNotesLocationList": [3, 9, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 9,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [3, 5, 9, 11],
  "orderedNotesLocationList": [3, 5, 9, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 5,
  "n11L": 9,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [3, 6, 9, 11],
  "orderedNotesLocationList": [3, 6, 9, 11],
  "n3L": 6,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 9,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 7, 10, 2],
  "orderedNotesLocationList": [2, 3, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 7, 10, 1],
  "orderedNotesLocationList": [1, 3, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 6, 10, 1],
  "orderedNotesLocationList": [1, 3, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 6, 9, 1],
  "orderedNotesLocationList": [1, 3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 6, 9, 0],
  "orderedNotesLocationList": [0, 3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 0,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 6, 10, 2],
  "orderedNotesLocationList": [2, 3, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [3, 7, 11, 1],
  "orderedNotesLocationList": [1, 3, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [3, 7, 11, 2],
  "orderedNotesLocationList": [2, 3, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 9, 1],
  "orderedNotesLocationList": [1, 3, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 1, 6],
  "orderedNotesLocationList": [1, 3, 6, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 1, 9],
  "orderedNotesLocationList": [1, 3, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 1, 11],
  "orderedNotesLocationList": [1, 3, 7, 10, 11],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 9, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 9, 1, 6],
  "orderedNotesLocationList": [1, 3, 6, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 1,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 9, 2],
  "orderedNotesLocationList": [2, 3, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 11, 2],
  "orderedNotesLocationList": [2, 3, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 2, 4],
  "orderedNotesLocationList": [2, 3, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 2, 11],
  "orderedNotesLocationList": [2, 3, 7, 10, 11],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 10, 2, 9],
  "orderedNotesLocationList": [2, 3, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [3, 6, 11, 1],
  "orderedNotesLocationList": [1, 3, 6, 11],
  "n3L": 6,
  "n5L": 11,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [3, 6, 9, 2],
  "orderedNotesLocationList": [2, 3, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [3, 6, 11, 2],
  "orderedNotesLocationList": [2, 3, 6, 11],
  "n3L": 6,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 11, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [3, 7, 11, 1, 6],
  "orderedNotesLocationList": [1, 3, 6, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 1,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [3, 5, 10],
  "orderedNotesLocationList": [3, 5, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": -1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10],
  "orderedNotesLocationList": [3, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [3, 5, 10, 1],
  "orderedNotesLocationList": [1, 3, 5, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10, 1],
  "orderedNotesLocationList": [1, 3, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [3, 5, 10, 2],
  "orderedNotesLocationList": [2, 3, 5, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10, 2],
  "orderedNotesLocationList": [2, 3, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10, 2, 5],
  "orderedNotesLocationList": [2, 3, 5, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10, 1, 5, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [3, 8, 10, 2, 5, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 8, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [3, 5, 10, 2, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 10],
  "n3L": -1,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 2, 5],
  "orderedNotesLocationList": [2, 3, 5, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [3, 6, 10, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [3, 6, 10, 2, 5],
  "orderedNotesLocationList": [2, 3, 5, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [3, 7, 11, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 1, 5, 7],
  "orderedNotesLocationList": [1, 3, 5, 7, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 7,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 1, 5, 9],
  "orderedNotesLocationList": [1, 3, 5, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 1, 5, 11],
  "orderedNotesLocationList": [1, 3, 5, 7, 10, 11],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [3, 7, 9, 2, 5],
  "orderedNotesLocationList": [2, 3, 5, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [3, 7, 11, 2, 5],
  "orderedNotesLocationList": [2, 3, 5, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 2, 5, 9],
  "orderedNotesLocationList": [2, 3, 5, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [3, 7, 10, 2, 5, 11],
  "orderedNotesLocationList": [2, 3, 5, 7, 10, 11],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [3, 6, 9, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [3, 6, 10, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 6, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [3, 7, 10, 2, 5, 8],
  "orderedNotesLocationList": [2, 3, 5, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [3, 7, 10, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [3, 6, 10, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [3, 6, 10, 2, 5, 8],
  "orderedNotesLocationList": [2, 3, 5, 6, 8, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [3, 7, 9, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [3, 7, 11, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [3, 7, 10, 1, 4, 8],
  "orderedNotesLocationList": [1, 3, 4, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [3, 7, 10, 1, 6, 8],
  "orderedNotesLocationList": [1, 3, 6, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 6,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [3, 7, 10, 1, 5, 8, 11],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": 11
}, {
  "rootNoteLocation": 3,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [3, 6, 9, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 9],
  "n3L": 6,
  "n5L": 9,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 2, 5, 8, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [3, 6, 10, 1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [3, 6, 10, 2, 5, 8, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
  "n3L": 6,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [3, 7, 9, 1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [3, 7, 11, 1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 1,
  "n9L": 5,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 1, 4, 8, 0],
  "orderedNotesLocationList": [0, 1, 3, 4, 7, 8, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 4,
  "n11L": 8,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 1, 6, 0],
  "orderedNotesLocationList": [0, 1, 3, 6, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 6,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 1, 5, 9, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": 5,
  "n11L": 9,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [3, 7, 9, 2, 5, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9],
  "n3L": 7,
  "n5L": 9,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [3, 7, 11, 2, 5, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 2, 4, 0],
  "orderedNotesLocationList": [0, 2, 3, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 4,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 3,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [3, 7, 10, 2, 5, 9, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": 9,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [4, 8, 11],
  "orderedNotesLocationList": [4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [4, 7, 11],
  "orderedNotesLocationList": [4, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [4, 7, 10],
  "orderedNotesLocationList": [4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [4, 8, 0],
  "orderedNotesLocationList": [0, 4, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [4, 8, 10],
  "orderedNotesLocationList": [4, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 8, 11, 1],
  "orderedNotesLocationList": [1, 4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 7, 11, 1],
  "orderedNotesLocationList": [1, 4, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [4, 8, 11, 1, 6],
  "orderedNotesLocationList": [1, 4, 6, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": -1,
  "n9L": 6,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [4, 7, 11, 1, 6],
  "orderedNotesLocationList": [1, 4, 6, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": -1,
  "n9L": 6,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 8, 11, 6],
  "orderedNotesLocationList": [4, 6, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": -1,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 8, 11, 9],
  "orderedNotesLocationList": [4, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 7, 11, 6],
  "orderedNotesLocationList": [4, 6, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": -1,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 7, 11, 9],
  "orderedNotesLocationList": [4, 7, 9, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [4, 8, 11, 3, 9],
  "orderedNotesLocationList": [3, 4, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [4, 8, 11, 1, 2],
  "orderedNotesLocationList": [1, 2, 4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [4, 10, 0],
  "orderedNotesLocationList": [0, 4, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 10,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [4, 6, 10, 0],
  "orderedNotesLocationList": [0, 4, 6, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 6,
  "n11L": 10,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [4, 7, 10, 0],
  "orderedNotesLocationList": [0, 4, 7, 10],
  "n3L": 7,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 10,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 8, 11, 3],
  "orderedNotesLocationList": [3, 4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 8, 11, 2],
  "orderedNotesLocationList": [2, 4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 7, 11, 2],
  "orderedNotesLocationList": [2, 4, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 7, 10, 2],
  "orderedNotesLocationList": [2, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 7, 10, 1],
  "orderedNotesLocationList": [1, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 7, 11, 3],
  "orderedNotesLocationList": [3, 4, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [4, 8, 0, 2],
  "orderedNotesLocationList": [0, 2, 4, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [4, 8, 0, 3],
  "orderedNotesLocationList": [0, 3, 4, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 10, 2],
  "orderedNotesLocationList": [2, 4, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 2, 5],
  "orderedNotesLocationList": [2, 4, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 2, 7],
  "orderedNotesLocationList": [2, 4, 7, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 2, 10],
  "orderedNotesLocationList": [2, 4, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 2, 0],
  "orderedNotesLocationList": [0, 2, 4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 10, 2, 5],
  "orderedNotesLocationList": [2, 4, 5, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 10, 2, 7],
  "orderedNotesLocationList": [2, 4, 7, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 2,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 10, 3],
  "orderedNotesLocationList": [3, 4, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 0, 3],
  "orderedNotesLocationList": [0, 3, 4, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 3, 5],
  "orderedNotesLocationList": [3, 4, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 3, 0],
  "orderedNotesLocationList": [0, 3, 4, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 11, 3, 10],
  "orderedNotesLocationList": [3, 4, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [4, 7, 0, 2],
  "orderedNotesLocationList": [0, 2, 4, 7],
  "n3L": 7,
  "n5L": 0,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [4, 7, 10, 3],
  "orderedNotesLocationList": [3, 4, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [4, 7, 0, 3],
  "orderedNotesLocationList": [0, 3, 4, 7],
  "n3L": 7,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 0, 2, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [4, 8, 0, 2, 7],
  "orderedNotesLocationList": [0, 2, 4, 7, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 2,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [4, 6, 11],
  "orderedNotesLocationList": [4, 6, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": -1,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11],
  "orderedNotesLocationList": [4, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [4, 6, 11, 2],
  "orderedNotesLocationList": [2, 4, 6, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11, 2],
  "orderedNotesLocationList": [2, 4, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [4, 6, 11, 3],
  "orderedNotesLocationList": [3, 4, 6, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11, 3],
  "orderedNotesLocationList": [3, 4, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11, 2, 6],
  "orderedNotesLocationList": [2, 4, 6, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11, 3, 6],
  "orderedNotesLocationList": [3, 4, 6, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11, 2, 6, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [4, 9, 11, 3, 6, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 9, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [4, 6, 11, 3, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 11],
  "n3L": -1,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 3, 6],
  "orderedNotesLocationList": [3, 4, 6, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 2, 6],
  "orderedNotesLocationList": [2, 4, 6, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [4, 7, 11, 2, 6],
  "orderedNotesLocationList": [2, 4, 6, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [4, 7, 11, 3, 6],
  "orderedNotesLocationList": [3, 4, 6, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [4, 8, 0, 2, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 2,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 2, 5],
  "orderedNotesLocationList": [2, 4, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 2, 6, 8],
  "orderedNotesLocationList": [2, 4, 6, 8, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 8,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 2, 6, 10],
  "orderedNotesLocationList": [2, 4, 6, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 2, 6, 0],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [4, 8, 10, 3, 6],
  "orderedNotesLocationList": [3, 4, 6, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [4, 8, 0, 3, 6],
  "orderedNotesLocationList": [0, 3, 4, 6, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 3, 6, 10],
  "orderedNotesLocationList": [3, 4, 6, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [4, 8, 11, 3, 6, 0],
  "orderedNotesLocationList": [0, 3, 4, 6, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [4, 7, 10, 2, 6],
  "orderedNotesLocationList": [2, 4, 6, 7, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [4, 7, 11, 2, 5],
  "orderedNotesLocationList": [2, 4, 5, 7, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [4, 8, 11, 3, 6, 9],
  "orderedNotesLocationList": [3, 4, 6, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [4, 8, 11, 2, 6, 9],
  "orderedNotesLocationList": [2, 4, 6, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [4, 7, 11, 2, 6, 9],
  "orderedNotesLocationList": [2, 4, 6, 7, 9, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [4, 7, 11, 3, 6, 9],
  "orderedNotesLocationList": [3, 4, 6, 7, 9, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [4, 8, 10, 2, 6, 9],
  "orderedNotesLocationList": [2, 4, 6, 8, 9, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [4, 8, 0, 2, 6, 9],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9],
  "n3L": 8,
  "n5L": 0,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [4, 8, 11, 2, 5, 9],
  "orderedNotesLocationList": [2, 4, 5, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [4, 8, 11, 2, 7, 9],
  "orderedNotesLocationList": [2, 4, 7, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 7,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [4, 8, 11, 2, 6, 9, 0],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": 0
}, {
  "rootNoteLocation": 4,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [4, 7, 10, 2, 6, 9],
  "orderedNotesLocationList": [2, 4, 6, 7, 9, 10],
  "n3L": 7,
  "n5L": 10,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 3, 6, 9, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 2, 6, 9, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [4, 7, 11, 2, 6, 9, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [4, 7, 11, 3, 6, 9, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
  "n3L": 7,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [4, 8, 10, 2, 6, 9, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [4, 8, 0, 2, 6, 9, 1],
  "orderedNotesLocationList": [0, 1, 2, 4, 6, 8, 9],
  "n3L": 8,
  "n5L": 0,
  "n7L": 2,
  "n9L": 6,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 2, 5, 9, 1],
  "orderedNotesLocationList": [1, 2, 4, 5, 8, 9, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 5,
  "n11L": 9,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 2, 7, 1],
  "orderedNotesLocationList": [1, 2, 4, 7, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 7,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 2, 6, 10, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": 6,
  "n11L": 10,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [4, 8, 10, 3, 6, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10],
  "n3L": 8,
  "n5L": 10,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [4, 8, 0, 3, 6, 1],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 3, 5, 1],
  "orderedNotesLocationList": [1, 3, 4, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 5,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 4,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [4, 8, 11, 3, 6, 10, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": 10,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [5, 9, 0],
  "orderedNotesLocationList": [0, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [5, 8, 0],
  "orderedNotesLocationList": [0, 5, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [5, 8, 11],
  "orderedNotesLocationList": [5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [5, 9, 1],
  "orderedNotesLocationList": [1, 5, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [5, 9, 11],
  "orderedNotesLocationList": [5, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 9, 0, 2],
  "orderedNotesLocationList": [0, 2, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 8, 0, 2],
  "orderedNotesLocationList": [0, 2, 5, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [5, 9, 0, 2, 7],
  "orderedNotesLocationList": [0, 2, 5, 7, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": -1,
  "n9L": 7,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [5, 8, 0, 2, 7],
  "orderedNotesLocationList": [0, 2, 5, 7, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": -1,
  "n9L": 7,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 9, 0, 7],
  "orderedNotesLocationList": [0, 5, 7, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": -1,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 9, 0, 10],
  "orderedNotesLocationList": [0, 5, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 8, 0, 7],
  "orderedNotesLocationList": [0, 5, 7, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": -1,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 8, 0, 10],
  "orderedNotesLocationList": [0, 5, 8, 10],
  "n3L": 8,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [5, 9, 0, 4, 10],
  "orderedNotesLocationList": [0, 4, 5, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [5, 9, 0, 2, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [5, 11, 1],
  "orderedNotesLocationList": [1, 5, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 11,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [5, 7, 11, 1],
  "orderedNotesLocationList": [1, 5, 7, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 7,
  "n11L": 11,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [5, 8, 11, 1],
  "orderedNotesLocationList": [1, 5, 8, 11],
  "n3L": 8,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 11,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 9, 0, 4],
  "orderedNotesLocationList": [0, 4, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 9, 0, 3],
  "orderedNotesLocationList": [0, 3, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 8, 0, 3],
  "orderedNotesLocationList": [0, 3, 5, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 8, 11, 3],
  "orderedNotesLocationList": [3, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 8, 11, 2],
  "orderedNotesLocationList": [2, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 2,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 8, 0, 4],
  "orderedNotesLocationList": [0, 4, 5, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [5, 9, 1, 3],
  "orderedNotesLocationList": [1, 3, 5, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [5, 9, 1, 4],
  "orderedNotesLocationList": [1, 4, 5, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 11, 3],
  "orderedNotesLocationList": [3, 5, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 3, 6],
  "orderedNotesLocationList": [0, 3, 5, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 3, 8],
  "orderedNotesLocationList": [0, 3, 5, 8, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 3, 11],
  "orderedNotesLocationList": [0, 3, 5, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 3, 1],
  "orderedNotesLocationList": [0, 1, 3, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 11, 3, 6],
  "orderedNotesLocationList": [3, 5, 6, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 11, 3, 8],
  "orderedNotesLocationList": [3, 5, 8, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 3,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 11, 4],
  "orderedNotesLocationList": [4, 5, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 1, 4],
  "orderedNotesLocationList": [1, 4, 5, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 4, 6],
  "orderedNotesLocationList": [0, 4, 5, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 4, 1],
  "orderedNotesLocationList": [0, 1, 4, 5, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 0, 4, 11],
  "orderedNotesLocationList": [0, 4, 5, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [5, 8, 1, 3],
  "orderedNotesLocationList": [1, 3, 5, 8],
  "n3L": 8,
  "n5L": 1,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [5, 8, 11, 4],
  "orderedNotesLocationList": [4, 5, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [5, 8, 1, 4],
  "orderedNotesLocationList": [1, 4, 5, 8],
  "n3L": 8,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 1, 3, 6],
  "orderedNotesLocationList": [1, 3, 5, 6, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [5, 9, 1, 3, 8],
  "orderedNotesLocationList": [1, 3, 5, 8, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 3,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [5, 7, 0],
  "orderedNotesLocationList": [0, 5, 7],
  "n3L": -1,
  "n5L": 0,
  "n7L": -1,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0],
  "orderedNotesLocationList": [0, 5, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [5, 7, 0, 3],
  "orderedNotesLocationList": [0, 3, 5, 7],
  "n3L": -1,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0, 3],
  "orderedNotesLocationList": [0, 3, 5, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [5, 7, 0, 4],
  "orderedNotesLocationList": [0, 4, 5, 7],
  "n3L": -1,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0, 4],
  "orderedNotesLocationList": [0, 4, 5, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0, 3, 7],
  "orderedNotesLocationList": [0, 3, 5, 7, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 5, 7, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0, 3, 7, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [5, 10, 0, 4, 7, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 10],
  "n3L": -1,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [5, 7, 0, 4, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7],
  "n3L": -1,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 5, 7, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 3, 7],
  "orderedNotesLocationList": [0, 3, 5, 7, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [5, 8, 0, 3, 7],
  "orderedNotesLocationList": [0, 3, 5, 7, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [5, 8, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 5, 7, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [5, 9, 1, 3, 7],
  "orderedNotesLocationList": [1, 3, 5, 7, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 3,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 3, 6],
  "orderedNotesLocationList": [0, 3, 5, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 3, 7, 9],
  "orderedNotesLocationList": [0, 3, 5, 7, 9, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 9,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 3, 7, 11],
  "orderedNotesLocationList": [0, 3, 5, 7, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 3, 7, 1],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [5, 9, 11, 4, 7],
  "orderedNotesLocationList": [4, 5, 7, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [5, 9, 1, 4, 7],
  "orderedNotesLocationList": [1, 4, 5, 7, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 4, 7, 11],
  "orderedNotesLocationList": [0, 4, 5, 7, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [5, 9, 0, 4, 7, 1],
  "orderedNotesLocationList": [0, 1, 4, 5, 7, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [5, 8, 11, 3, 7],
  "orderedNotesLocationList": [3, 5, 7, 8, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [5, 8, 0, 3, 6],
  "orderedNotesLocationList": [0, 3, 5, 6, 8],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [5, 9, 0, 4, 7, 10],
  "orderedNotesLocationList": [0, 4, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [5, 9, 0, 3, 7, 10],
  "orderedNotesLocationList": [0, 3, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [5, 8, 0, 3, 7, 10],
  "orderedNotesLocationList": [0, 3, 5, 7, 8, 10],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [5, 8, 0, 4, 7, 10],
  "orderedNotesLocationList": [0, 4, 5, 7, 8, 10],
  "n3L": 8,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [5, 9, 11, 3, 7, 10],
  "orderedNotesLocationList": [3, 5, 7, 9, 10, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [5, 9, 1, 3, 7, 10],
  "orderedNotesLocationList": [1, 3, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 1,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [5, 9, 0, 3, 6, 10],
  "orderedNotesLocationList": [0, 3, 5, 6, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [5, 9, 0, 3, 8, 10],
  "orderedNotesLocationList": [0, 3, 5, 8, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 8,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [5, 9, 0, 3, 7, 10, 1],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": 1
}, {
  "rootNoteLocation": 5,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [5, 8, 11, 3, 7, 10],
  "orderedNotesLocationList": [3, 5, 7, 8, 10, 11],
  "n3L": 8,
  "n5L": 11,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 4, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 3, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [5, 8, 0, 3, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n3L": 8,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [5, 8, 0, 4, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
  "n3L": 8,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [5, 9, 11, 3, 7, 10, 2],
  "orderedNotesLocationList": [2, 3, 5, 7, 9, 10, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [5, 9, 1, 3, 7, 10, 2],
  "orderedNotesLocationList": [1, 2, 3, 5, 7, 9, 10],
  "n3L": 9,
  "n5L": 1,
  "n7L": 3,
  "n9L": 7,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 3, 6, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 9, 10],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 6,
  "n11L": 10,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 3, 8, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 8, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 8,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 3, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": 7,
  "n11L": 11,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [5, 9, 11, 4, 7, 2],
  "orderedNotesLocationList": [2, 4, 5, 7, 9, 11],
  "n3L": 9,
  "n5L": 11,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [5, 9, 1, 4, 7, 2],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 4, 6, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 6,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 5,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [5, 9, 0, 4, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": 11,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [6, 10, 1],
  "orderedNotesLocationList": [1, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [6, 9, 1],
  "orderedNotesLocationList": [1, 6, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [6, 9, 0],
  "orderedNotesLocationList": [0, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [6, 10, 2],
  "orderedNotesLocationList": [2, 6, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [6, 10, 0],
  "orderedNotesLocationList": [0, 6, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 10, 1, 3],
  "orderedNotesLocationList": [1, 3, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 9, 1, 3],
  "orderedNotesLocationList": [1, 3, 6, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [6, 10, 1, 3, 8],
  "orderedNotesLocationList": [1, 3, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": -1,
  "n9L": 8,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [6, 9, 1, 3, 8],
  "orderedNotesLocationList": [1, 3, 6, 8, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": -1,
  "n9L": 8,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 10, 1, 8],
  "orderedNotesLocationList": [1, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": -1,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 10, 1, 11],
  "orderedNotesLocationList": [1, 6, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 9, 1, 8],
  "orderedNotesLocationList": [1, 6, 8, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": -1,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 9, 1, 11],
  "orderedNotesLocationList": [1, 6, 9, 11],
  "n3L": 9,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [6, 10, 1, 5, 11],
  "orderedNotesLocationList": [1, 5, 6, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [6, 10, 1, 3, 4],
  "orderedNotesLocationList": [1, 3, 4, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [6, 0, 2],
  "orderedNotesLocationList": [0, 2, 6],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 0,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [6, 8, 0, 2],
  "orderedNotesLocationList": [0, 2, 6, 8],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 8,
  "n11L": 0,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [6, 9, 0, 2],
  "orderedNotesLocationList": [0, 2, 6, 9],
  "n3L": 9,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 0,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 10, 1, 5],
  "orderedNotesLocationList": [1, 5, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 10, 1, 4],
  "orderedNotesLocationList": [1, 4, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 9, 1, 4],
  "orderedNotesLocationList": [1, 4, 6, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 9, 0, 4],
  "orderedNotesLocationList": [0, 4, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 9, 0, 3],
  "orderedNotesLocationList": [0, 3, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 3,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 9, 1, 5],
  "orderedNotesLocationList": [1, 5, 6, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [6, 10, 2, 4],
  "orderedNotesLocationList": [2, 4, 6, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [6, 10, 2, 5],
  "orderedNotesLocationList": [2, 5, 6, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 0, 4],
  "orderedNotesLocationList": [0, 4, 6, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 4, 7],
  "orderedNotesLocationList": [1, 4, 6, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 4, 9],
  "orderedNotesLocationList": [1, 4, 6, 9, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 4, 0],
  "orderedNotesLocationList": [0, 1, 4, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 4, 2],
  "orderedNotesLocationList": [1, 2, 4, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 6, 7, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 0, 4, 9],
  "orderedNotesLocationList": [0, 4, 6, 9, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": 4,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 0, 5],
  "orderedNotesLocationList": [0, 5, 6, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 2, 5],
  "orderedNotesLocationList": [2, 5, 6, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 5, 7],
  "orderedNotesLocationList": [1, 5, 6, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 5, 2],
  "orderedNotesLocationList": [1, 2, 5, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 1, 5, 0],
  "orderedNotesLocationList": [0, 1, 5, 6, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [6, 9, 2, 4],
  "orderedNotesLocationList": [2, 4, 6, 9],
  "n3L": 9,
  "n5L": 2,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [6, 9, 0, 5],
  "orderedNotesLocationList": [0, 5, 6, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [6, 9, 2, 5],
  "orderedNotesLocationList": [2, 5, 6, 9],
  "n3L": 9,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 2, 4, 7],
  "orderedNotesLocationList": [2, 4, 6, 7, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [6, 10, 2, 4, 9],
  "orderedNotesLocationList": [2, 4, 6, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 4,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [6, 8, 1],
  "orderedNotesLocationList": [1, 6, 8],
  "n3L": -1,
  "n5L": 1,
  "n7L": -1,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1],
  "orderedNotesLocationList": [1, 6, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [6, 8, 1, 4],
  "orderedNotesLocationList": [1, 4, 6, 8],
  "n3L": -1,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1, 4],
  "orderedNotesLocationList": [1, 4, 6, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [6, 8, 1, 5],
  "orderedNotesLocationList": [1, 5, 6, 8],
  "n3L": -1,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1, 5],
  "orderedNotesLocationList": [1, 5, 6, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1, 4, 8],
  "orderedNotesLocationList": [1, 4, 6, 8, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 6, 8, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1, 4, 8, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [6, 11, 1, 5, 8, 3],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 11],
  "n3L": -1,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [6, 8, 1, 5, 3],
  "orderedNotesLocationList": [1, 3, 5, 6, 8],
  "n3L": -1,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 4, 8],
  "orderedNotesLocationList": [1, 4, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [6, 9, 1, 4, 8],
  "orderedNotesLocationList": [1, 4, 6, 8, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [6, 9, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 6, 8, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [6, 10, 2, 4, 8],
  "orderedNotesLocationList": [2, 4, 6, 8, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 4,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 4, 7],
  "orderedNotesLocationList": [1, 4, 6, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 4, 8, 10],
  "orderedNotesLocationList": [1, 4, 6, 8, 10, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 10,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 4, 8, 0],
  "orderedNotesLocationList": [0, 1, 4, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 4, 8, 2],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [6, 10, 0, 5, 8],
  "orderedNotesLocationList": [0, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [6, 10, 2, 5, 8],
  "orderedNotesLocationList": [2, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [6, 10, 1, 5, 8, 2],
  "orderedNotesLocationList": [1, 2, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [6, 9, 0, 4, 8],
  "orderedNotesLocationList": [0, 4, 6, 8, 9],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [6, 9, 1, 4, 7],
  "orderedNotesLocationList": [1, 4, 6, 7, 9],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [6, 10, 1, 5, 8, 11],
  "orderedNotesLocationList": [1, 5, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [6, 10, 1, 4, 8, 11],
  "orderedNotesLocationList": [1, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [6, 9, 1, 4, 8, 11],
  "orderedNotesLocationList": [1, 4, 6, 8, 9, 11],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [6, 9, 1, 5, 8, 11],
  "orderedNotesLocationList": [1, 5, 6, 8, 9, 11],
  "n3L": 9,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [6, 10, 0, 4, 8, 11],
  "orderedNotesLocationList": [0, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 0,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [6, 10, 2, 4, 8, 11],
  "orderedNotesLocationList": [2, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 2,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [6, 10, 1, 4, 7, 11],
  "orderedNotesLocationList": [1, 4, 6, 7, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [6, 10, 1, 4, 9, 11],
  "orderedNotesLocationList": [1, 4, 6, 9, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 9,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [6, 10, 1, 4, 8, 11, 2],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": 2
}, {
  "rootNoteLocation": 6,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [6, 9, 0, 4, 8, 11],
  "orderedNotesLocationList": [0, 4, 6, 8, 9, 11],
  "n3L": 9,
  "n5L": 0,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 5, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 4, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [6, 9, 1, 4, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n3L": 9,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [6, 9, 1, 5, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
  "n3L": 9,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [6, 10, 0, 4, 8, 11, 3],
  "orderedNotesLocationList": [0, 3, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 0,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [6, 10, 2, 4, 8, 11, 3],
  "orderedNotesLocationList": [2, 3, 4, 6, 8, 10, 11],
  "n3L": 10,
  "n5L": 2,
  "n7L": 4,
  "n9L": 8,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 4, 7, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 10, 11],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 7,
  "n11L": 11,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 4, 9, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 9, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 9,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 4, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": 8,
  "n11L": 0,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [6, 10, 0, 5, 8, 3],
  "orderedNotesLocationList": [0, 3, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 0,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [6, 10, 2, 5, 8, 3],
  "orderedNotesLocationList": [2, 3, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 5, 7, 3],
  "orderedNotesLocationList": [1, 3, 5, 6, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 7,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 6,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [6, 10, 1, 5, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": 0,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [7, 11, 2],
  "orderedNotesLocationList": [2, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [7, 10, 2],
  "orderedNotesLocationList": [2, 7, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [7, 10, 1],
  "orderedNotesLocationList": [1, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [7, 11, 3],
  "orderedNotesLocationList": [3, 7, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [7, 11, 1],
  "orderedNotesLocationList": [1, 7, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 11, 2, 4],
  "orderedNotesLocationList": [2, 4, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 10, 2, 4],
  "orderedNotesLocationList": [2, 4, 7, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [7, 11, 2, 4, 9],
  "orderedNotesLocationList": [2, 4, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": -1,
  "n9L": 9,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [7, 10, 2, 4, 9],
  "orderedNotesLocationList": [2, 4, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": -1,
  "n9L": 9,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 11, 2, 9],
  "orderedNotesLocationList": [2, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": -1,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 11, 2, 0],
  "orderedNotesLocationList": [0, 2, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 10, 2, 9],
  "orderedNotesLocationList": [2, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": -1,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 10, 2, 0],
  "orderedNotesLocationList": [0, 2, 7, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [7, 11, 2, 6, 0],
  "orderedNotesLocationList": [0, 2, 6, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [7, 11, 2, 4, 5],
  "orderedNotesLocationList": [2, 4, 5, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [7, 1, 3],
  "orderedNotesLocationList": [1, 3, 7],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [7, 9, 1, 3],
  "orderedNotesLocationList": [1, 3, 7, 9],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 9,
  "n11L": 1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [7, 10, 1, 3],
  "orderedNotesLocationList": [1, 3, 7, 10],
  "n3L": 10,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 11, 2, 6],
  "orderedNotesLocationList": [2, 6, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 11, 2, 5],
  "orderedNotesLocationList": [2, 5, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 10, 2, 5],
  "orderedNotesLocationList": [2, 5, 7, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 10, 1, 5],
  "orderedNotesLocationList": [1, 5, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 10, 1, 4],
  "orderedNotesLocationList": [1, 4, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 4,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 10, 2, 6],
  "orderedNotesLocationList": [2, 6, 7, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [7, 11, 3, 5],
  "orderedNotesLocationList": [3, 5, 7, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [7, 11, 3, 6],
  "orderedNotesLocationList": [3, 6, 7, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 1, 5],
  "orderedNotesLocationList": [1, 5, 7, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 5, 8],
  "orderedNotesLocationList": [2, 5, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 5, 10],
  "orderedNotesLocationList": [2, 5, 7, 10, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 5, 1],
  "orderedNotesLocationList": [1, 2, 5, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 5, 3],
  "orderedNotesLocationList": [2, 3, 5, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 7, 8, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 1, 5, 10],
  "orderedNotesLocationList": [1, 5, 7, 10, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 5,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 1, 6],
  "orderedNotesLocationList": [1, 6, 7, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 3, 6],
  "orderedNotesLocationList": [3, 6, 7, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 6, 8],
  "orderedNotesLocationList": [2, 6, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 6, 3],
  "orderedNotesLocationList": [2, 3, 6, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 2, 6, 1],
  "orderedNotesLocationList": [1, 2, 6, 7, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [7, 10, 3, 5],
  "orderedNotesLocationList": [3, 5, 7, 10],
  "n3L": 10,
  "n5L": 3,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [7, 10, 1, 6],
  "orderedNotesLocationList": [1, 6, 7, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [7, 10, 3, 6],
  "orderedNotesLocationList": [3, 6, 7, 10],
  "n3L": 10,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 3, 5, 8],
  "orderedNotesLocationList": [3, 5, 7, 8, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [7, 11, 3, 5, 10],
  "orderedNotesLocationList": [3, 5, 7, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 5,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [7, 9, 2],
  "orderedNotesLocationList": [2, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": -1,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2],
  "orderedNotesLocationList": [0, 2, 7],
  "n3L": -1,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [7, 9, 2, 5],
  "orderedNotesLocationList": [2, 5, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2, 5],
  "orderedNotesLocationList": [0, 2, 5, 7],
  "n3L": -1,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [7, 9, 2, 6],
  "orderedNotesLocationList": [2, 6, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2, 6],
  "orderedNotesLocationList": [0, 2, 6, 7],
  "n3L": -1,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2, 5, 9],
  "orderedNotesLocationList": [0, 2, 5, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2, 6, 9],
  "orderedNotesLocationList": [0, 2, 6, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2, 5, 9, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [7, 0, 2, 6, 9, 4],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [7, 9, 2, 6, 4],
  "orderedNotesLocationList": [2, 4, 6, 7, 9],
  "n3L": -1,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 6, 9],
  "orderedNotesLocationList": [2, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 5, 9],
  "orderedNotesLocationList": [2, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [7, 10, 2, 5, 9],
  "orderedNotesLocationList": [2, 5, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [7, 10, 2, 6, 9],
  "orderedNotesLocationList": [2, 6, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [7, 11, 3, 5, 9],
  "orderedNotesLocationList": [3, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 5,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 5, 8],
  "orderedNotesLocationList": [2, 5, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 5, 9, 11],
  "orderedNotesLocationList": [2, 5, 7, 9, 11, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 11,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 5, 9, 1],
  "orderedNotesLocationList": [1, 2, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 5, 9, 3],
  "orderedNotesLocationList": [2, 3, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [7, 11, 1, 6, 9],
  "orderedNotesLocationList": [1, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [7, 11, 3, 6, 9],
  "orderedNotesLocationList": [3, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 6, 9, 1],
  "orderedNotesLocationList": [1, 2, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [7, 11, 2, 6, 9, 3],
  "orderedNotesLocationList": [2, 3, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [7, 10, 1, 5, 9],
  "orderedNotesLocationList": [1, 5, 7, 9, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [7, 10, 2, 5, 8],
  "orderedNotesLocationList": [2, 5, 7, 8, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [7, 11, 2, 6, 9, 0],
  "orderedNotesLocationList": [0, 2, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [7, 11, 2, 5, 9, 0],
  "orderedNotesLocationList": [0, 2, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [7, 10, 2, 5, 9, 0],
  "orderedNotesLocationList": [0, 2, 5, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [7, 10, 2, 6, 9, 0],
  "orderedNotesLocationList": [0, 2, 6, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [7, 11, 1, 5, 9, 0],
  "orderedNotesLocationList": [0, 1, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [7, 11, 3, 5, 9, 0],
  "orderedNotesLocationList": [0, 3, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [7, 11, 2, 5, 8, 0],
  "orderedNotesLocationList": [0, 2, 5, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [7, 11, 2, 5, 10, 0],
  "orderedNotesLocationList": [0, 2, 5, 7, 10, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 10,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [7, 11, 2, 5, 9, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": 3
}, {
  "rootNoteLocation": 7,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [7, 10, 1, 5, 9, 0],
  "orderedNotesLocationList": [0, 1, 5, 7, 9, 10],
  "n3L": 10,
  "n5L": 1,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 6, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 5, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [7, 10, 2, 5, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [7, 10, 2, 6, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
  "n3L": 10,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [7, 11, 1, 5, 9, 0, 4],
  "orderedNotesLocationList": [0, 1, 4, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [7, 11, 3, 5, 9, 0, 4],
  "orderedNotesLocationList": [0, 3, 4, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 5,
  "n9L": 9,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 5, 8, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 8,
  "n11L": 0,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 5, 10, 4],
  "orderedNotesLocationList": [2, 4, 5, 7, 10, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 10,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 5, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": 9,
  "n11L": 1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [7, 11, 1, 6, 9, 4],
  "orderedNotesLocationList": [1, 4, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 1,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [7, 11, 3, 6, 9, 4],
  "orderedNotesLocationList": [3, 4, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 6, 8, 4],
  "orderedNotesLocationList": [2, 4, 6, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 8,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 7,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [7, 11, 2, 6, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": 1,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [8, 0, 3],
  "orderedNotesLocationList": [0, 3, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [8, 11, 3],
  "orderedNotesLocationList": [3, 8, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [8, 11, 2],
  "orderedNotesLocationList": [2, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [8, 0, 4],
  "orderedNotesLocationList": [0, 4, 8],
  "n3L": 0,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [8, 0, 2],
  "orderedNotesLocationList": [0, 2, 8],
  "n3L": 0,
  "n5L": 2,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 0, 3, 5],
  "orderedNotesLocationList": [0, 3, 5, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 11, 3, 5],
  "orderedNotesLocationList": [3, 5, 8, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [8, 0, 3, 5, 10],
  "orderedNotesLocationList": [0, 3, 5, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": -1,
  "n9L": 10,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [8, 11, 3, 5, 10],
  "orderedNotesLocationList": [3, 5, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": -1,
  "n9L": 10,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 0, 3, 10],
  "orderedNotesLocationList": [0, 3, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": -1,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 0, 3, 1],
  "orderedNotesLocationList": [0, 1, 3, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 11, 3, 10],
  "orderedNotesLocationList": [3, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": -1,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 11, 3, 1],
  "orderedNotesLocationList": [1, 3, 8, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [8, 0, 3, 7, 1],
  "orderedNotesLocationList": [0, 1, 3, 7, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [8, 0, 3, 5, 6],
  "orderedNotesLocationList": [0, 3, 5, 6, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [8, 2, 4],
  "orderedNotesLocationList": [2, 4, 8],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 2,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [8, 10, 2, 4],
  "orderedNotesLocationList": [2, 4, 8, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 10,
  "n11L": 2,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [8, 11, 2, 4],
  "orderedNotesLocationList": [2, 4, 8, 11],
  "n3L": 11,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 2,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 0, 3, 7],
  "orderedNotesLocationList": [0, 3, 7, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 0, 3, 6],
  "orderedNotesLocationList": [0, 3, 6, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 11, 3, 6],
  "orderedNotesLocationList": [3, 6, 8, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 11, 2, 6],
  "orderedNotesLocationList": [2, 6, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 11, 2, 5],
  "orderedNotesLocationList": [2, 5, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 5,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 11, 3, 7],
  "orderedNotesLocationList": [3, 7, 8, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [8, 0, 4, 6],
  "orderedNotesLocationList": [0, 4, 6, 8],
  "n3L": 0,
  "n5L": 4,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [8, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 7, 8],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 2, 6],
  "orderedNotesLocationList": [0, 2, 6, 8],
  "n3L": 0,
  "n5L": 2,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 6, 9],
  "orderedNotesLocationList": [0, 3, 6, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 6, 11],
  "orderedNotesLocationList": [0, 3, 6, 8, 11],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 6, 2],
  "orderedNotesLocationList": [0, 2, 3, 6, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 6, 4],
  "orderedNotesLocationList": [0, 3, 4, 6, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 2, 6, 9],
  "orderedNotesLocationList": [0, 2, 6, 8, 9],
  "n3L": 0,
  "n5L": 2,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 2, 6, 11],
  "orderedNotesLocationList": [0, 2, 6, 8, 11],
  "n3L": 0,
  "n5L": 2,
  "n7L": 6,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 2, 7],
  "orderedNotesLocationList": [0, 2, 7, 8],
  "n3L": 0,
  "n5L": 2,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 7, 8],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 7, 9],
  "orderedNotesLocationList": [0, 3, 7, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 7, 4],
  "orderedNotesLocationList": [0, 3, 4, 7, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 3, 7, 2],
  "orderedNotesLocationList": [0, 2, 3, 7, 8],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [8, 11, 4, 6],
  "orderedNotesLocationList": [4, 6, 8, 11],
  "n3L": 11,
  "n5L": 4,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [8, 11, 2, 7],
  "orderedNotesLocationList": [2, 7, 8, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [8, 11, 4, 7],
  "orderedNotesLocationList": [4, 7, 8, 11],
  "n3L": 11,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 4, 6, 9],
  "orderedNotesLocationList": [0, 4, 6, 8, 9],
  "n3L": 0,
  "n5L": 4,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [8, 0, 4, 6, 11],
  "orderedNotesLocationList": [0, 4, 6, 8, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 6,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [8, 10, 3],
  "orderedNotesLocationList": [3, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": -1,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3],
  "orderedNotesLocationList": [1, 3, 8],
  "n3L": -1,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [8, 10, 3, 6],
  "orderedNotesLocationList": [3, 6, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3, 6],
  "orderedNotesLocationList": [1, 3, 6, 8],
  "n3L": -1,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [8, 10, 3, 7],
  "orderedNotesLocationList": [3, 7, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3, 7],
  "orderedNotesLocationList": [1, 3, 7, 8],
  "n3L": -1,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3, 6, 10],
  "orderedNotesLocationList": [1, 3, 6, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3, 7, 10],
  "orderedNotesLocationList": [1, 3, 7, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3, 6, 10, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [8, 1, 3, 7, 10, 5],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [8, 10, 3, 7, 5],
  "orderedNotesLocationList": [3, 5, 7, 8, 10],
  "n3L": -1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 7, 10],
  "orderedNotesLocationList": [0, 3, 7, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 6, 10],
  "orderedNotesLocationList": [0, 3, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [8, 11, 3, 6, 10],
  "orderedNotesLocationList": [3, 6, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [8, 11, 3, 7, 10],
  "orderedNotesLocationList": [3, 7, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [8, 0, 4, 6, 10],
  "orderedNotesLocationList": [0, 4, 6, 8, 10],
  "n3L": 0,
  "n5L": 4,
  "n7L": 6,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 6, 9],
  "orderedNotesLocationList": [0, 3, 6, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 6, 10, 0],
  "orderedNotesLocationList": [0, 0, 3, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 0,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 6, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 6, 10, 4],
  "orderedNotesLocationList": [0, 3, 4, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [8, 0, 2, 7, 10],
  "orderedNotesLocationList": [0, 2, 7, 8, 10],
  "n3L": 0,
  "n5L": 2,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [8, 0, 4, 7, 10],
  "orderedNotesLocationList": [0, 4, 7, 8, 10],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 7, 10, 2],
  "orderedNotesLocationList": [0, 2, 3, 7, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [8, 0, 3, 7, 10, 4],
  "orderedNotesLocationList": [0, 3, 4, 7, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [8, 11, 2, 6, 10],
  "orderedNotesLocationList": [2, 6, 8, 10, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [8, 11, 3, 6, 9],
  "orderedNotesLocationList": [3, 6, 8, 9, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [8, 0, 3, 7, 10, 1],
  "orderedNotesLocationList": [0, 1, 3, 7, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [8, 0, 3, 6, 10, 1],
  "orderedNotesLocationList": [0, 1, 3, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [8, 11, 3, 6, 10, 1],
  "orderedNotesLocationList": [1, 3, 6, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [8, 11, 3, 7, 10, 1],
  "orderedNotesLocationList": [1, 3, 7, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [8, 0, 2, 6, 10, 1],
  "orderedNotesLocationList": [0, 1, 2, 6, 8, 10],
  "n3L": 0,
  "n5L": 2,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [8, 0, 4, 6, 10, 1],
  "orderedNotesLocationList": [0, 1, 4, 6, 8, 10],
  "n3L": 0,
  "n5L": 4,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [8, 0, 3, 6, 9, 1],
  "orderedNotesLocationList": [0, 1, 3, 6, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [8, 0, 3, 6, 11, 1],
  "orderedNotesLocationList": [0, 1, 3, 6, 8, 11],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 11,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [8, 0, 3, 6, 10, 1, 4],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": 4
}, {
  "rootNoteLocation": 8,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [8, 11, 2, 6, 10, 1],
  "orderedNotesLocationList": [1, 2, 6, 8, 10, 11],
  "n3L": 11,
  "n5L": 2,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 7, 10, 1, 5],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 6, 10, 1, 5],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [8, 11, 3, 6, 10, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [8, 11, 3, 7, 10, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
  "n3L": 11,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [8, 0, 2, 6, 10, 1, 5],
  "orderedNotesLocationList": [0, 1, 2, 5, 6, 8, 10],
  "n3L": 0,
  "n5L": 2,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [8, 0, 4, 6, 10, 1, 5],
  "orderedNotesLocationList": [0, 1, 4, 5, 6, 8, 10],
  "n3L": 0,
  "n5L": 4,
  "n7L": 6,
  "n9L": 10,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 6, 9, 1, 5],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 9,
  "n11L": 1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 6, 11, 5],
  "orderedNotesLocationList": [0, 3, 5, 6, 8, 11],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 11,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 6, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": 10,
  "n11L": 2,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [8, 0, 2, 7, 10, 5],
  "orderedNotesLocationList": [0, 2, 5, 7, 8, 10],
  "n3L": 0,
  "n5L": 2,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [8, 0, 4, 7, 10, 5],
  "orderedNotesLocationList": [0, 4, 5, 7, 8, 10],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 7, 9, 5],
  "orderedNotesLocationList": [0, 3, 5, 7, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 9,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 8,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [8, 0, 3, 7, 10, 2, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": 2,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [9, 1, 4],
  "orderedNotesLocationList": [1, 4, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [9, 0, 4],
  "orderedNotesLocationList": [0, 4, 9],
  "n3L": 0,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [9, 0, 3],
  "orderedNotesLocationList": [0, 3, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [9, 1, 5],
  "orderedNotesLocationList": [1, 5, 9],
  "n3L": 1,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [9, 1, 3],
  "orderedNotesLocationList": [1, 3, 9],
  "n3L": 1,
  "n5L": 3,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 1, 4, 6],
  "orderedNotesLocationList": [1, 4, 6, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 0, 4, 6],
  "orderedNotesLocationList": [0, 4, 6, 9],
  "n3L": 0,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [9, 1, 4, 6, 11],
  "orderedNotesLocationList": [1, 4, 6, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": -1,
  "n9L": 11,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [9, 0, 4, 6, 11],
  "orderedNotesLocationList": [0, 4, 6, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": -1,
  "n9L": 11,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 1, 4, 11],
  "orderedNotesLocationList": [1, 4, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": -1,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 1, 4, 2],
  "orderedNotesLocationList": [1, 2, 4, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 0, 4, 11],
  "orderedNotesLocationList": [0, 4, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": -1,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 0, 4, 2],
  "orderedNotesLocationList": [0, 2, 4, 9],
  "n3L": 0,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [9, 1, 4, 8, 2],
  "orderedNotesLocationList": [1, 2, 4, 8, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [9, 1, 4, 6, 7],
  "orderedNotesLocationList": [1, 4, 6, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [9, 3, 5],
  "orderedNotesLocationList": [3, 5, 9],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 3,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [9, 11, 3, 5],
  "orderedNotesLocationList": [3, 5, 9, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 11,
  "n11L": 3,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [9, 0, 3, 5],
  "orderedNotesLocationList": [0, 3, 5, 9],
  "n3L": 0,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 3,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 1, 4, 8],
  "orderedNotesLocationList": [1, 4, 8, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 1, 4, 7],
  "orderedNotesLocationList": [1, 4, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 0, 4, 7],
  "orderedNotesLocationList": [0, 4, 7, 9],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 0, 3, 7],
  "orderedNotesLocationList": [0, 3, 7, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 0, 3, 6],
  "orderedNotesLocationList": [0, 3, 6, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 6,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 0, 4, 8],
  "orderedNotesLocationList": [0, 4, 8, 9],
  "n3L": 0,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [9, 1, 5, 7],
  "orderedNotesLocationList": [1, 5, 7, 9],
  "n3L": 1,
  "n5L": 5,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [9, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 8, 9],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 3, 7],
  "orderedNotesLocationList": [1, 3, 7, 9],
  "n3L": 1,
  "n5L": 3,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 7, 10],
  "orderedNotesLocationList": [1, 4, 7, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 7, 0],
  "orderedNotesLocationList": [0, 1, 4, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 7, 3],
  "orderedNotesLocationList": [1, 3, 4, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 7, 5],
  "orderedNotesLocationList": [1, 4, 5, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 3, 7, 10],
  "orderedNotesLocationList": [1, 3, 7, 9, 10],
  "n3L": 1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 3, 7, 0],
  "orderedNotesLocationList": [0, 1, 3, 7, 9],
  "n3L": 1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 3, 8],
  "orderedNotesLocationList": [1, 3, 8, 9],
  "n3L": 1,
  "n5L": 3,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 8, 9],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 8, 10],
  "orderedNotesLocationList": [1, 4, 8, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 8, 5],
  "orderedNotesLocationList": [1, 4, 5, 8, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 4, 8, 3],
  "orderedNotesLocationList": [1, 3, 4, 8, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [9, 0, 5, 7],
  "orderedNotesLocationList": [0, 5, 7, 9],
  "n3L": 0,
  "n5L": 5,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [9, 0, 3, 8],
  "orderedNotesLocationList": [0, 3, 8, 9],
  "n3L": 0,
  "n5L": 3,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [9, 0, 5, 8],
  "orderedNotesLocationList": [0, 5, 8, 9],
  "n3L": 0,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 5, 7, 10],
  "orderedNotesLocationList": [1, 5, 7, 9, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [9, 1, 5, 7, 0],
  "orderedNotesLocationList": [0, 1, 5, 7, 9],
  "n3L": 1,
  "n5L": 5,
  "n7L": 7,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [9, 11, 4],
  "orderedNotesLocationList": [4, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": -1,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4],
  "orderedNotesLocationList": [2, 4, 9],
  "n3L": -1,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [9, 11, 4, 7],
  "orderedNotesLocationList": [4, 7, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4, 7],
  "orderedNotesLocationList": [2, 4, 7, 9],
  "n3L": -1,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [9, 11, 4, 8],
  "orderedNotesLocationList": [4, 8, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4, 8],
  "orderedNotesLocationList": [2, 4, 8, 9],
  "n3L": -1,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4, 7, 11],
  "orderedNotesLocationList": [2, 4, 7, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4, 8, 11],
  "orderedNotesLocationList": [2, 4, 8, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4, 7, 11, 6],
  "orderedNotesLocationList": [2, 4, 6, 7, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [9, 2, 4, 8, 11, 6],
  "orderedNotesLocationList": [2, 4, 6, 8, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [9, 11, 4, 8, 6],
  "orderedNotesLocationList": [4, 6, 8, 9, 11],
  "n3L": -1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 8, 11],
  "orderedNotesLocationList": [1, 4, 8, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 7, 11],
  "orderedNotesLocationList": [1, 4, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [9, 0, 4, 7, 11],
  "orderedNotesLocationList": [0, 4, 7, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [9, 0, 4, 8, 11],
  "orderedNotesLocationList": [0, 4, 8, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [9, 1, 5, 7, 11],
  "orderedNotesLocationList": [1, 5, 7, 9, 11],
  "n3L": 1,
  "n5L": 5,
  "n7L": 7,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 7, 10],
  "orderedNotesLocationList": [1, 4, 7, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 7, 11, 1],
  "orderedNotesLocationList": [1, 1, 4, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 7, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 7, 11, 5],
  "orderedNotesLocationList": [1, 4, 5, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [9, 1, 3, 8, 11],
  "orderedNotesLocationList": [1, 3, 8, 9, 11],
  "n3L": 1,
  "n5L": 3,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [9, 1, 5, 8, 11],
  "orderedNotesLocationList": [1, 5, 8, 9, 11],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 8, 11, 3],
  "orderedNotesLocationList": [1, 3, 4, 8, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [9, 1, 4, 8, 11, 5],
  "orderedNotesLocationList": [1, 4, 5, 8, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [9, 0, 3, 7, 11],
  "orderedNotesLocationList": [0, 3, 7, 9, 11],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [9, 0, 4, 7, 10],
  "orderedNotesLocationList": [0, 4, 7, 9, 10],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [9, 1, 4, 8, 11, 2],
  "orderedNotesLocationList": [1, 2, 4, 8, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [9, 1, 4, 7, 11, 2],
  "orderedNotesLocationList": [1, 2, 4, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [9, 0, 4, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 4, 7, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [9, 0, 4, 8, 11, 2],
  "orderedNotesLocationList": [0, 2, 4, 8, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [9, 1, 3, 7, 11, 2],
  "orderedNotesLocationList": [1, 2, 3, 7, 9, 11],
  "n3L": 1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [9, 1, 5, 7, 11, 2],
  "orderedNotesLocationList": [1, 2, 5, 7, 9, 11],
  "n3L": 1,
  "n5L": 5,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [9, 1, 4, 7, 10, 2],
  "orderedNotesLocationList": [1, 2, 4, 7, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [9, 1, 4, 7, 0, 2],
  "orderedNotesLocationList": [0, 1, 2, 4, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 0,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [9, 1, 4, 7, 11, 2, 5],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": 5
}, {
  "rootNoteLocation": 9,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [9, 0, 3, 7, 11, 2],
  "orderedNotesLocationList": [0, 2, 3, 7, 9, 11],
  "n3L": 0,
  "n5L": 3,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 8, 11, 2, 6],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 7, 11, 2, 6],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [9, 0, 4, 7, 11, 2, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [9, 0, 4, 8, 11, 2, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
  "n3L": 0,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [9, 1, 3, 7, 11, 2, 6],
  "orderedNotesLocationList": [1, 2, 3, 6, 7, 9, 11],
  "n3L": 1,
  "n5L": 3,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [9, 1, 5, 7, 11, 2, 6],
  "orderedNotesLocationList": [1, 2, 5, 6, 7, 9, 11],
  "n3L": 1,
  "n5L": 5,
  "n7L": 7,
  "n9L": 11,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 7, 10, 2, 6],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 10,
  "n11L": 2,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 7, 0, 6],
  "orderedNotesLocationList": [0, 1, 4, 6, 7, 9],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 0,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 7, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": 11,
  "n11L": 3,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [9, 1, 3, 8, 11, 6],
  "orderedNotesLocationList": [1, 3, 6, 8, 9, 11],
  "n3L": 1,
  "n5L": 3,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [9, 1, 5, 8, 11, 6],
  "orderedNotesLocationList": [1, 5, 6, 8, 9, 11],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 8, 10, 6],
  "orderedNotesLocationList": [1, 4, 6, 8, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 10,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 9,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [9, 1, 4, 8, 11, 3, 6],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": 3,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [10, 2, 5],
  "orderedNotesLocationList": [2, 5, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [10, 1, 5],
  "orderedNotesLocationList": [1, 5, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [10, 1, 4],
  "orderedNotesLocationList": [1, 4, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [10, 2, 6],
  "orderedNotesLocationList": [2, 6, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [10, 2, 4],
  "orderedNotesLocationList": [2, 4, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 2, 5, 7],
  "orderedNotesLocationList": [2, 5, 7, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 1, 5, 7],
  "orderedNotesLocationList": [1, 5, 7, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [10, 2, 5, 7, 0],
  "orderedNotesLocationList": [0, 2, 5, 7, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": -1,
  "n9L": 0,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [10, 1, 5, 7, 0],
  "orderedNotesLocationList": [0, 1, 5, 7, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": -1,
  "n9L": 0,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 2, 5, 0],
  "orderedNotesLocationList": [0, 2, 5, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": -1,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 2, 5, 3],
  "orderedNotesLocationList": [2, 3, 5, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 1, 5, 0],
  "orderedNotesLocationList": [0, 1, 5, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": -1,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 1, 5, 3],
  "orderedNotesLocationList": [1, 3, 5, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [10, 2, 5, 9, 3],
  "orderedNotesLocationList": [2, 3, 5, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [10, 2, 5, 7, 8],
  "orderedNotesLocationList": [2, 5, 7, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [10, 4, 6],
  "orderedNotesLocationList": [4, 6, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 4,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [10, 0, 4, 6],
  "orderedNotesLocationList": [0, 4, 6, 10],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 0,
  "n11L": 4,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [10, 1, 4, 6],
  "orderedNotesLocationList": [1, 4, 6, 10],
  "n3L": 1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 4,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 2, 5, 9],
  "orderedNotesLocationList": [2, 5, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 2, 5, 8],
  "orderedNotesLocationList": [2, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 1, 5, 8],
  "orderedNotesLocationList": [1, 5, 8, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 1, 4, 8],
  "orderedNotesLocationList": [1, 4, 8, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 1, 4, 7],
  "orderedNotesLocationList": [1, 4, 7, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 7,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 1, 5, 9],
  "orderedNotesLocationList": [1, 5, 9, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [10, 2, 6, 8],
  "orderedNotesLocationList": [2, 6, 8, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [10, 2, 6, 9],
  "orderedNotesLocationList": [2, 6, 9, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 4, 8],
  "orderedNotesLocationList": [2, 4, 8, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 8, 11],
  "orderedNotesLocationList": [2, 5, 8, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 8, 1],
  "orderedNotesLocationList": [1, 2, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 8, 4],
  "orderedNotesLocationList": [2, 4, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 8, 6],
  "orderedNotesLocationList": [2, 5, 6, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 4, 8, 11],
  "orderedNotesLocationList": [2, 4, 8, 10, 11],
  "n3L": 2,
  "n5L": 4,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 4, 8, 1],
  "orderedNotesLocationList": [1, 2, 4, 8, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 8,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 4, 9],
  "orderedNotesLocationList": [2, 4, 9, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 6, 9],
  "orderedNotesLocationList": [2, 6, 9, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 9, 11],
  "orderedNotesLocationList": [2, 5, 9, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 9, 6],
  "orderedNotesLocationList": [2, 5, 6, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 5, 9, 4],
  "orderedNotesLocationList": [2, 4, 5, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [10, 1, 6, 8],
  "orderedNotesLocationList": [1, 6, 8, 10],
  "n3L": 1,
  "n5L": 6,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [10, 1, 4, 9],
  "orderedNotesLocationList": [1, 4, 9, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [10, 1, 6, 9],
  "orderedNotesLocationList": [1, 6, 9, 10],
  "n3L": 1,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 6, 8, 11],
  "orderedNotesLocationList": [2, 6, 8, 10, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [10, 2, 6, 8, 1],
  "orderedNotesLocationList": [1, 2, 6, 8, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 8,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [10, 0, 5],
  "orderedNotesLocationList": [0, 5, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": -1,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5],
  "orderedNotesLocationList": [3, 5, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [10, 0, 5, 8],
  "orderedNotesLocationList": [0, 5, 8, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5, 8],
  "orderedNotesLocationList": [3, 5, 8, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [10, 0, 5, 9],
  "orderedNotesLocationList": [0, 5, 9, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5, 9],
  "orderedNotesLocationList": [3, 5, 9, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5, 8, 0],
  "orderedNotesLocationList": [0, 3, 5, 8, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5, 9, 0],
  "orderedNotesLocationList": [0, 3, 5, 9, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5, 8, 0, 7],
  "orderedNotesLocationList": [0, 3, 5, 7, 8, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [10, 3, 5, 9, 0, 7],
  "orderedNotesLocationList": [0, 3, 5, 7, 9, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [10, 0, 5, 9, 7],
  "orderedNotesLocationList": [0, 5, 7, 9, 10],
  "n3L": -1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 9, 0],
  "orderedNotesLocationList": [0, 2, 5, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 8, 0],
  "orderedNotesLocationList": [0, 2, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [10, 1, 5, 8, 0],
  "orderedNotesLocationList": [0, 1, 5, 8, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [10, 1, 5, 9, 0],
  "orderedNotesLocationList": [0, 1, 5, 9, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [10, 2, 6, 8, 0],
  "orderedNotesLocationList": [0, 2, 6, 8, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 8,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 8, 11],
  "orderedNotesLocationList": [2, 5, 8, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 8, 0, 2],
  "orderedNotesLocationList": [0, 2, 2, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 2,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 8, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 8, 0, 6],
  "orderedNotesLocationList": [0, 2, 5, 6, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [10, 2, 4, 9, 0],
  "orderedNotesLocationList": [0, 2, 4, 9, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [10, 2, 6, 9, 0],
  "orderedNotesLocationList": [0, 2, 6, 9, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 9, 0, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [10, 2, 5, 9, 0, 6],
  "orderedNotesLocationList": [0, 2, 5, 6, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [10, 1, 4, 8, 0],
  "orderedNotesLocationList": [0, 1, 4, 8, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [10, 1, 5, 8, 11],
  "orderedNotesLocationList": [1, 5, 8, 10, 11],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [10, 2, 5, 9, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [10, 2, 5, 8, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [10, 1, 5, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 8, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [10, 1, 5, 9, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 9, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [10, 2, 4, 8, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 4, 8, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [10, 2, 6, 8, 0, 3],
  "orderedNotesLocationList": [0, 2, 3, 6, 8, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [10, 2, 5, 8, 11, 3],
  "orderedNotesLocationList": [2, 3, 5, 8, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [10, 2, 5, 8, 1, 3],
  "orderedNotesLocationList": [1, 2, 3, 5, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [10, 2, 5, 8, 0, 3, 6],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": 6
}, {
  "rootNoteLocation": 10,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [10, 1, 4, 8, 0, 3],
  "orderedNotesLocationList": [0, 1, 3, 4, 8, 10],
  "n3L": 1,
  "n5L": 4,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 9, 0, 3, 7],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 8, 0, 3, 7],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [10, 1, 5, 8, 0, 3, 7],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [10, 1, 5, 9, 0, 3, 7],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
  "n3L": 1,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [10, 2, 4, 8, 0, 3, 7],
  "orderedNotesLocationList": [0, 2, 3, 4, 7, 8, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [10, 2, 6, 8, 0, 3, 7],
  "orderedNotesLocationList": [0, 2, 3, 6, 7, 8, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 8,
  "n9L": 0,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 8, 11, 3, 7],
  "orderedNotesLocationList": [2, 3, 5, 7, 8, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 11,
  "n11L": 3,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 8, 1, 7],
  "orderedNotesLocationList": [1, 2, 5, 7, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 8, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": 0,
  "n11L": 4,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [10, 2, 4, 9, 0, 7],
  "orderedNotesLocationList": [0, 2, 4, 7, 9, 10],
  "n3L": 2,
  "n5L": 4,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [10, 2, 6, 9, 0, 7],
  "orderedNotesLocationList": [0, 2, 6, 7, 9, 10],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 9, 11, 7],
  "orderedNotesLocationList": [2, 5, 7, 9, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 11,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 10,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [10, 2, 5, 9, 0, 4, 7],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": 4,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj3",
  "cnName": "\u5927\u4E09",
  "type": "chord3",
  "notesLocationList": [11, 3, 6],
  "orderedNotesLocationList": [3, 6, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min3",
  "cnName": "\u5C0F\u4E09",
  "type": "chord3",
  "notesLocationList": [11, 2, 6],
  "orderedNotesLocationList": [2, 6, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dim3",
  "cnName": "\u51CF\u4E09",
  "type": "chord3",
  "notesLocationList": [11, 2, 5],
  "orderedNotesLocationList": [2, 5, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "aug3",
  "cnName": "\u589E\u4E09",
  "type": "chord3",
  "notesLocationList": [11, 3, 7],
  "orderedNotesLocationList": [3, 7, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj3b5",
  "cnName": "\u5927\u4E09\u51CF\u4E94",
  "type": "chord3",
  "notesLocationList": [11, 3, 5],
  "orderedNotesLocationList": [3, 5, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj3add6",
  "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 3, 6, 8],
  "orderedNotesLocationList": [3, 6, 8, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "min3add6",
  "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 2, 6, 8],
  "orderedNotesLocationList": [2, 6, 8, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj3add6add9",
  "cnName": "\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [11, 3, 6, 8, 1],
  "orderedNotesLocationList": [1, 3, 6, 8, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": -1,
  "n9L": 1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "min3add6add9",
  "cnName": "\u5C0F\u516D\u4E5D",
  "type": "add",
  "notesLocationList": [11, 2, 6, 8, 1],
  "orderedNotesLocationList": [1, 2, 6, 8, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": -1,
  "n9L": 1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj3add9",
  "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 3, 6, 1],
  "orderedNotesLocationList": [1, 3, 6, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": -1,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj3add11",
  "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 3, 6, 4],
  "orderedNotesLocationList": [3, 4, 6, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min3add9",
  "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 2, 6, 1],
  "orderedNotesLocationList": [1, 2, 6, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": -1,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min3add11",
  "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 2, 6, 4],
  "orderedNotesLocationList": [2, 4, 6, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7add11",
  "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
  "type": "add",
  "notesLocationList": [11, 3, 6, 10, 4],
  "orderedNotesLocationList": [3, 4, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7add6",
  "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
  "type": "add",
  "notesLocationList": [11, 3, 6, 8, 9],
  "orderedNotesLocationList": [3, 6, 8, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "itaug6",
  "cnName": "\u610F\u5927\u5229\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [11, 5, 7],
  "orderedNotesLocationList": [5, 7, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 5,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "fraug6",
  "cnName": "\u6CD5\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [11, 1, 5, 7],
  "orderedNotesLocationList": [1, 5, 7, 11],
  "n3L": -1,
  "n5L": -1,
  "n7L": -1,
  "n9L": 1,
  "n11L": 5,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "graug6",
  "cnName": "\u5FB7\u56FD\u589E\u516D",
  "type": "aug6",
  "notesLocationList": [11, 2, 5, 7],
  "orderedNotesLocationList": [2, 5, 7, 11],
  "n3L": 2,
  "n5L": -1,
  "n7L": -1,
  "n9L": -1,
  "n11L": 5,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7",
  "cnName": "\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 3, 6, 10],
  "orderedNotesLocationList": [3, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7",
  "cnName": "\u5C5E\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 3, 6, 9],
  "orderedNotesLocationList": [3, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min7",
  "cnName": "\u5C0F\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 2, 6, 9],
  "orderedNotesLocationList": [2, 6, 9, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "halfdim7",
  "cnName": "\u534A\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 2, 5, 9],
  "orderedNotesLocationList": [2, 5, 9, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dim7",
  "cnName": "\u51CF\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 2, 5, 8],
  "orderedNotesLocationList": [2, 5, 8, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 8,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "minmaj7",
  "cnName": "\u5C0F\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 2, 6, 10],
  "orderedNotesLocationList": [2, 6, 10, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7#5",
  "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
  "type": "chord7",
  "notesLocationList": [11, 3, 7, 9],
  "orderedNotesLocationList": [3, 7, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "augmaj7",
  "cnName": "\u589E\u5927\u4E03",
  "type": "chord7",
  "notesLocationList": [11, 3, 7, 10],
  "orderedNotesLocationList": [3, 7, 10, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7b5",
  "cnName": "\u5C5E\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 5, 9],
  "orderedNotesLocationList": [3, 5, 9, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 9, 0],
  "orderedNotesLocationList": [0, 3, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7#9",
  "cnName": "\u5C5E\u4E03\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 9, 2],
  "orderedNotesLocationList": [2, 3, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7#11",
  "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 9, 5],
  "orderedNotesLocationList": [3, 5, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7b13",
  "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 9, 7],
  "orderedNotesLocationList": [3, 6, 7, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7b5b9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 5, 9, 0],
  "orderedNotesLocationList": [0, 3, 5, 9, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7b5#9",
  "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 5, 9, 2],
  "orderedNotesLocationList": [2, 3, 5, 9, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 9,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7b5",
  "cnName": "\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 5, 10],
  "orderedNotesLocationList": [3, 5, 10, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7#5",
  "cnName": "\u5927\u4E03\u589E\u4E94",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 7, 10],
  "orderedNotesLocationList": [3, 7, 10, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7b9",
  "cnName": "\u5927\u4E03\u964D\u4E5D",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 10, 0],
  "orderedNotesLocationList": [0, 3, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7b13",
  "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 10, 7],
  "orderedNotesLocationList": [3, 6, 7, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7#11",
  "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 6, 10, 5],
  "orderedNotesLocationList": [3, 5, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min7#5",
  "cnName": "\u5C0F\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [11, 2, 7, 9],
  "orderedNotesLocationList": [2, 7, 9, 11],
  "n3L": 2,
  "n5L": 7,
  "n7L": 9,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "minmaj7b5",
  "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
  "type": "chord7alt",
  "notesLocationList": [11, 2, 5, 10],
  "orderedNotesLocationList": [2, 5, 10, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "minmaj7#5",
  "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
  "type": "chord7alt",
  "notesLocationList": [11, 2, 7, 10],
  "orderedNotesLocationList": [2, 7, 10, 11],
  "n3L": 2,
  "n5L": 7,
  "n7L": 10,
  "n9L": -1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7#5b9",
  "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 7, 9, 0],
  "orderedNotesLocationList": [0, 3, 7, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7#5#9",
  "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
  "type": "chord7alt",
  "notesLocationList": [11, 3, 7, 9, 2],
  "orderedNotesLocationList": [2, 3, 7, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 9,
  "n9L": 2,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "sus2",
  "cnName": "\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [11, 1, 6],
  "orderedNotesLocationList": [1, 6, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": -1,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "sus4",
  "cnName": "\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6],
  "orderedNotesLocationList": [4, 6, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": -1,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7sus2",
  "cnName": "\u5C5E\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [11, 1, 6, 9],
  "orderedNotesLocationList": [1, 6, 9, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom7sus4",
  "cnName": "\u5C5E\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6, 9],
  "orderedNotesLocationList": [4, 6, 9, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 9,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7sus2",
  "cnName": "\u5927\u4E03\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [11, 1, 6, 10],
  "orderedNotesLocationList": [1, 6, 10, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj7sus4",
  "cnName": "\u5927\u4E03\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6, 10],
  "orderedNotesLocationList": [4, 6, 10, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 10,
  "n9L": -1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9sus4",
  "cnName": "\u5C5E\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6, 9, 1],
  "orderedNotesLocationList": [1, 4, 6, 9, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj9sus4",
  "cnName": "\u5927\u4E5D\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6, 10, 1],
  "orderedNotesLocationList": [1, 4, 6, 10, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13sus4",
  "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6, 9, 1, 8],
  "orderedNotesLocationList": [1, 4, 6, 8, 9, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13sus4",
  "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
  "type": "sus",
  "notesLocationList": [11, 4, 6, 10, 1, 8],
  "orderedNotesLocationList": [1, 4, 6, 8, 10, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13sus2",
  "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
  "type": "sus",
  "notesLocationList": [11, 1, 6, 10, 8],
  "orderedNotesLocationList": [1, 6, 8, 10, 11],
  "n3L": -1,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj9",
  "cnName": "\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 10, 1],
  "orderedNotesLocationList": [1, 3, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9",
  "cnName": "\u5C5E\u4E5D",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 9, 1],
  "orderedNotesLocationList": [1, 3, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min9",
  "cnName": "\u5C0F\u4E5D",
  "type": "chord9",
  "notesLocationList": [11, 2, 6, 9, 1],
  "orderedNotesLocationList": [1, 2, 6, 9, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "minmaj9",
  "cnName": "\u5C0F\u5927\u4E5D",
  "type": "chord9",
  "notesLocationList": [11, 2, 6, 10, 1],
  "orderedNotesLocationList": [1, 2, 6, 10, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9#5",
  "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
  "type": "chord9",
  "notesLocationList": [11, 3, 7, 9, 1],
  "orderedNotesLocationList": [1, 3, 7, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 9,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9b9",
  "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 9, 0],
  "orderedNotesLocationList": [0, 3, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9b11",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 9, 1, 3],
  "orderedNotesLocationList": [1, 3, 3, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 3,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9#11",
  "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 9, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom9b13",
  "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 9, 1, 7],
  "orderedNotesLocationList": [1, 3, 6, 7, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj9b5",
  "cnName": "\u5927\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [11, 3, 5, 10, 1],
  "orderedNotesLocationList": [1, 3, 5, 10, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj9#5",
  "cnName": "\u5927\u4E5D\u5347\u4E94",
  "type": "chord9",
  "notesLocationList": [11, 3, 7, 10, 1],
  "orderedNotesLocationList": [1, 3, 7, 10, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj9#11",
  "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 10, 1, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 5,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj9b13",
  "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
  "type": "chord9",
  "notesLocationList": [11, 3, 6, 10, 1, 7],
  "orderedNotesLocationList": [1, 3, 6, 7, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "min9b5",
  "cnName": "\u5C0F\u4E5D\u964D\u4E94",
  "type": "chord9",
  "notesLocationList": [11, 2, 5, 9, 1],
  "orderedNotesLocationList": [1, 2, 5, 9, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 1,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min9b9",
  "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
  "type": "chord9",
  "notesLocationList": [11, 2, 6, 9, 0],
  "orderedNotesLocationList": [0, 2, 6, 9, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": -1,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj11",
  "cnName": "\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [11, 3, 6, 10, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 6, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom11",
  "cnName": "\u5C5E\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [11, 3, 6, 9, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "min11",
  "cnName": "\u5C0F\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [11, 2, 6, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 9, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "minmaj11",
  "cnName": "\u5C0F\u5927\u5341\u4E00",
  "type": "chord11",
  "notesLocationList": [11, 2, 6, 10, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 10, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom11b5",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [11, 3, 5, 9, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 5, 9, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom11#5",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
  "type": "chord11",
  "notesLocationList": [11, 3, 7, 9, 1, 4],
  "orderedNotesLocationList": [1, 3, 4, 7, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom11b9",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
  "type": "chord11",
  "notesLocationList": [11, 3, 6, 9, 0, 4],
  "orderedNotesLocationList": [0, 3, 4, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom11#9",
  "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
  "type": "chord11",
  "notesLocationList": [11, 3, 6, 9, 2, 4],
  "orderedNotesLocationList": [2, 3, 4, 6, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 2,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom11b13",
  "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
  "type": "chord11",
  "notesLocationList": [11, 3, 6, 9, 1, 4, 7],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": 7
}, {
  "rootNoteLocation": 11,
  "chordKey": "min11b5",
  "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
  "type": "chord11",
  "notesLocationList": [11, 2, 5, 9, 1, 4],
  "orderedNotesLocationList": [1, 2, 4, 5, 9, 11],
  "n3L": 2,
  "n5L": 5,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": -1
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13",
  "cnName": "\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 10, 1, 4, 8],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13",
  "cnName": "\u5C5E\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 9, 1, 4, 8],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "min13",
  "cnName": "\u5C0F\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [11, 2, 6, 9, 1, 4, 8],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "minmaj13",
  "cnName": "\u5C0F\u5927\u5341\u4E09",
  "type": "chord13",
  "notesLocationList": [11, 2, 6, 10, 1, 4, 8],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
  "n3L": 2,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13b5",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [11, 3, 5, 9, 1, 4, 8],
  "orderedNotesLocationList": [1, 3, 4, 5, 8, 9, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13#5",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [11, 3, 7, 9, 1, 4, 8],
  "orderedNotesLocationList": [1, 3, 4, 7, 8, 9, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 9,
  "n9L": 1,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13b9",
  "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 9, 0, 4, 8],
  "orderedNotesLocationList": [0, 3, 4, 6, 8, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 0,
  "n11L": 4,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13#9",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 9, 2, 8],
  "orderedNotesLocationList": [2, 3, 6, 8, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 2,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "dom13#11",
  "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 9, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 9,
  "n9L": 1,
  "n11L": 5,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13b5",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
  "type": "chord13",
  "notesLocationList": [11, 3, 5, 10, 1, 8],
  "orderedNotesLocationList": [1, 3, 5, 8, 10, 11],
  "n3L": 3,
  "n5L": 5,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13#5",
  "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
  "type": "chord13",
  "notesLocationList": [11, 3, 7, 10, 1, 8],
  "orderedNotesLocationList": [1, 3, 7, 8, 10, 11],
  "n3L": 3,
  "n5L": 7,
  "n7L": 10,
  "n9L": 1,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13b9",
  "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 10, 0, 8],
  "orderedNotesLocationList": [0, 3, 6, 8, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 0,
  "n11L": -1,
  "n13L": 8
}, {
  "rootNoteLocation": 11,
  "chordKey": "maj13#11",
  "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
  "type": "chord13",
  "notesLocationList": [11, 3, 6, 10, 1, 5, 8],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n3L": 3,
  "n5L": 6,
  "n7L": 10,
  "n9L": 1,
  "n11L": 5,
  "n13L": 8
}];
var findChordMeta_default = findChordMeta;

// src/scale/cls/classFn/cls_findOneChordInScale.ts
import { isEmpty, isEqual } from "lodash";
var cls_findOneChordInScale = (notesList, scaleDegree, isChord3) => {
  const scaleRadix = new ScaleRadix(scaleDegree);
  let selectedDegreeList = [
    scaleRadix.scaleDegree,
    scaleRadix.add(2).scaleDegree,
    scaleRadix.add(4).scaleDegree
  ];
  if (!isChord3) selectedDegreeList = [...selectedDegreeList, scaleRadix.add(6).scaleDegree];
  const notesLocationList = selectedDegreeList.map((x) => {
    return notesList[x - 1].locationId;
  });
  const findObj = collect6(findChordMeta_default).filter((x) => {
    return isEqual(x.notesLocationList, notesLocationList);
  }).first();
  if (isEmpty(findObj)) throw new ChordError(`No such chord.`);
  return findObj.chordKey;
};
var cls_findOneChordInScale_default = cls_findOneChordInScale;

// src/scale/cls/classFn/cls_findDegreeChordInScale.ts
import { range as range3 } from "lodash";
var cls_findDegreeChordInScale = (notesList, isChord3) => {
  if (notesList && notesList.length !== 7) throw new ScaleError("This function only support the scale containing 7 notes.");
  return range3(7).map((x) => cls_findOneChordInScale_default(notesList, x + 1, isChord3));
};
var cls_findDegreeChordInScale_default = cls_findDegreeChordInScale;

// src/chord/static/chordMeta.ts
var chordMeta = [
  {
    "type": "chord3",
    "cnName": "\u5927\u4E09",
    "chordKey": "maj3",
    "scoreDisplay": "",
    "intervalList": [["maj", 3], ["p", 5]],
    "notesNum": 3,
    "semitoneLocationList": [4, 7],
    "orderedSemitoneLocationList": [4, 7]
  },
  {
    "type": "chord3",
    "cnName": "\u5C0F\u4E09",
    "chordKey": "min3",
    "scoreDisplay": "m",
    "intervalList": [["min", 3], ["p", 5]],
    "notesNum": 3,
    "semitoneLocationList": [3, 7],
    "orderedSemitoneLocationList": [3, 7]
  },
  {
    "type": "chord3",
    "cnName": "\u51CF\u4E09",
    "chordKey": "dim3",
    "scoreDisplay": "\xB0",
    "intervalList": [["min", 3], ["dim", 5]],
    "notesNum": 3,
    "semitoneLocationList": [3, 6],
    "orderedSemitoneLocationList": [3, 6]
  },
  {
    "type": "chord3",
    "cnName": "\u589E\u4E09",
    "chordKey": "aug3",
    "scoreDisplay": "+",
    "intervalList": [["maj", 3], ["aug", 5]],
    "notesNum": 3,
    "semitoneLocationList": [4, 8],
    "orderedSemitoneLocationList": [4, 8]
  },
  {
    "type": "chord3",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "chordKey": "maj3b5",
    "scoreDisplay": -5,
    "intervalList": [["maj", 3], ["dim", 5]],
    "notesNum": 3,
    "semitoneLocationList": [4, 6],
    "orderedSemitoneLocationList": [4, 6]
  },
  {
    "type": "add",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "chordKey": "maj3add6",
    "scoreDisplay": 6,
    "intervalList": [["maj", 3], ["p", 5], ["maj", 6]],
    "notesNum": 4,
    "semitoneLocationList": [4, 7, 9],
    "orderedSemitoneLocationList": [4, 7, 9]
  },
  {
    "type": "add",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "chordKey": "min3add6",
    "scoreDisplay": "m6",
    "intervalList": [["min", 3], ["p", 5], ["maj", 6]],
    "notesNum": 4,
    "semitoneLocationList": [3, 7, 9],
    "orderedSemitoneLocationList": [3, 7, 9]
  },
  {
    "type": "add",
    "cnName": "\u516D\u4E5D",
    "chordKey": "maj3add6add9",
    "scoreDisplay": "6/9",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 6], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 9, 2],
    "orderedSemitoneLocationList": [2, 4, 7, 9]
  },
  {
    "type": "add",
    "cnName": "\u5C0F\u516D\u4E5D",
    "chordKey": "min3add6add9",
    "scoreDisplay": "m6/9",
    "intervalList": [["min", 3], ["p", 5], ["maj", 6], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [3, 7, 9, 2],
    "orderedSemitoneLocationList": [2, 3, 7, 9]
  },
  {
    "type": "add",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "chordKey": "maj3add9",
    "scoreDisplay": "add9",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 9]],
    "notesNum": 4,
    "semitoneLocationList": [4, 7, 2],
    "orderedSemitoneLocationList": [2, 4, 7]
  },
  {
    "type": "add",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "chordKey": "maj3add11",
    "scoreDisplay": "add11",
    "intervalList": [["maj", 3], ["p", 5], ["p", 11]],
    "notesNum": 4,
    "semitoneLocationList": [4, 7, 5],
    "orderedSemitoneLocationList": [4, 5, 7]
  },
  {
    "type": "add",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "chordKey": "min3add9",
    "scoreDisplay": "madd9",
    "intervalList": [["min", 3], ["p", 5], ["maj", 9]],
    "notesNum": 4,
    "semitoneLocationList": [3, 7, 2],
    "orderedSemitoneLocationList": [2, 3, 7]
  },
  {
    "type": "add",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "chordKey": "min3add11",
    "scoreDisplay": "madd11",
    "intervalList": [["min", 3], ["p", 5], ["p", 11]],
    "notesNum": 4,
    "semitoneLocationList": [3, 7, 5],
    "orderedSemitoneLocationList": [3, 5, 7]
  },
  {
    "type": "add",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "chordKey": "maj7add11",
    "scoreDisplay": "M7add11",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["p", 11]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 11, 5],
    "orderedSemitoneLocationList": [4, 5, 7, 11]
  },
  {
    "type": "add",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "chordKey": "dom7add6",
    "scoreDisplay": "7/6",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 6], ["min", 7]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 9, 10],
    "orderedSemitoneLocationList": [4, 7, 9, 10]
  },
  {
    "type": "aug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "chordKey": "itaug6",
    "scoreDisplay": "It+6",
    "intervalList": [["aug", 4], ["min", 6]],
    "notesNum": 3,
    "semitoneLocationList": [6, 8],
    "orderedSemitoneLocationList": [6, 8]
  },
  {
    "type": "aug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "chordKey": "fraug6",
    "scoreDisplay": "Fr+6",
    "intervalList": [["maj", 2], ["aug", 4], ["min", 6]],
    "notesNum": 4,
    "semitoneLocationList": [2, 6, 8],
    "orderedSemitoneLocationList": [2, 6, 8]
  },
  {
    "type": "aug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "chordKey": "graug6",
    "scoreDisplay": "Gr+6",
    "intervalList": [["min", 3], ["aug", 4], ["min", 6]],
    "notesNum": 4,
    "semitoneLocationList": [3, 6, 8],
    "orderedSemitoneLocationList": [3, 6, 8]
  },
  {
    "type": "chord7",
    "cnName": "\u5927\u4E03",
    "chordKey": "maj7",
    "scoreDisplay": "M7",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 7, 11],
    "orderedSemitoneLocationList": [4, 7, 11]
  },
  {
    "type": "chord7",
    "cnName": "\u5C5E\u4E03",
    "chordKey": "dom7",
    "scoreDisplay": 7,
    "intervalList": [["maj", 3], ["p", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 7, 10],
    "orderedSemitoneLocationList": [4, 7, 10]
  },
  {
    "type": "chord7",
    "cnName": "\u5C0F\u4E03",
    "chordKey": "min7",
    "scoreDisplay": "m7",
    "intervalList": [["min", 3], ["p", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 7, 10],
    "orderedSemitoneLocationList": [3, 7, 10]
  },
  {
    "type": "chord7",
    "cnName": "\u534A\u51CF\u4E03",
    "chordKey": "halfdim7",
    "scoreDisplay": "\xF8",
    "intervalList": [["min", 3], ["dim", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 6, 10],
    "orderedSemitoneLocationList": [3, 6, 10]
  },
  {
    "type": "chord7",
    "cnName": "\u51CF\u4E03",
    "chordKey": "dim7",
    "scoreDisplay": "\xB07",
    "intervalList": [["min", 3], ["dim", 5], ["dim", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 6, 9],
    "orderedSemitoneLocationList": [3, 6, 9]
  },
  {
    "type": "chord7",
    "cnName": "\u5C0F\u5927\u4E03",
    "chordKey": "minmaj7",
    "scoreDisplay": "mM7",
    "intervalList": [["min", 3], ["p", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 7, 11],
    "orderedSemitoneLocationList": [3, 7, 11]
  },
  {
    "type": "chord7",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "chordKey": "dom7#5",
    "scoreDisplay": "+7",
    "intervalList": [["maj", 3], ["aug", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 8, 10],
    "orderedSemitoneLocationList": [4, 8, 10]
  },
  {
    "type": "chord7",
    "cnName": "\u589E\u5927\u4E03",
    "chordKey": "augmaj7",
    "scoreDisplay": "+M7",
    "intervalList": [["maj", 3], ["aug", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 8, 11],
    "orderedSemitoneLocationList": [4, 8, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "chordKey": "dom7b5",
    "scoreDisplay": "7b5",
    "intervalList": [["maj", 3], ["dim", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 6, 10],
    "orderedSemitoneLocationList": [4, 6, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "chordKey": "dom7b9",
    "scoreDisplay": "7b9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 10, 1],
    "orderedSemitoneLocationList": [1, 4, 7, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "chordKey": "dom7#9",
    "scoreDisplay": "7#9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 10, 3],
    "orderedSemitoneLocationList": [3, 4, 7, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "chordKey": "dom7#11",
    "scoreDisplay": "7#11",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 11]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 10, 6],
    "orderedSemitoneLocationList": [4, 6, 7, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "chordKey": "dom7b13",
    "scoreDisplay": "7b13",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 13]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 10, 8],
    "orderedSemitoneLocationList": [4, 7, 8, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "chordKey": "dom7b5b9",
    "scoreDisplay": "7b5b9",
    "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["min", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 6, 10, 1],
    "orderedSemitoneLocationList": [1, 4, 6, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "chordKey": "dom7b5#9",
    "scoreDisplay": "7b5#9",
    "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["aug", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 6, 10, 3],
    "orderedSemitoneLocationList": [3, 4, 6, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "chordKey": "maj7b5",
    "scoreDisplay": "M7b5",
    "intervalList": [["maj", 3], ["dim", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 6, 11],
    "orderedSemitoneLocationList": [4, 6, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "chordKey": "maj7#5",
    "scoreDisplay": "M7#5",
    "intervalList": [["maj", 3], ["aug", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [4, 8, 11],
    "orderedSemitoneLocationList": [4, 8, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "chordKey": "maj7b9",
    "scoreDisplay": "M7b9",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 11, 1],
    "orderedSemitoneLocationList": [1, 4, 7, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "chordKey": "maj7b13",
    "scoreDisplay": "M7b13",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 13]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 11, 8],
    "orderedSemitoneLocationList": [4, 7, 8, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "chordKey": "maj7#11",
    "scoreDisplay": "M7#11",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["aug", 11]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 11, 6],
    "orderedSemitoneLocationList": [4, 6, 7, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "chordKey": "min7#5",
    "scoreDisplay": "m7#5",
    "intervalList": [["min", 3], ["aug", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 8, 10],
    "orderedSemitoneLocationList": [3, 8, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "chordKey": "minmaj7b5",
    "scoreDisplay": "mM7b5",
    "intervalList": [["min", 3], ["dim", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 6, 11],
    "orderedSemitoneLocationList": [3, 6, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "chordKey": "minmaj7#5",
    "scoreDisplay": "mM7#5",
    "intervalList": [["min", 3], ["aug", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [3, 8, 11],
    "orderedSemitoneLocationList": [3, 8, 11]
  },
  {
    "type": "chord7alt",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "chordKey": "dom7#5b9",
    "scoreDisplay": "+7b9",
    "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["min", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 8, 10, 1],
    "orderedSemitoneLocationList": [1, 4, 8, 10]
  },
  {
    "type": "chord7alt",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "chordKey": "dom7#5#9",
    "scoreDisplay": "+7#9",
    "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["aug", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 8, 10, 3],
    "orderedSemitoneLocationList": [3, 4, 8, 10]
  },
  {
    "type": "sus",
    "cnName": "\u6302\u4E8C",
    "chordKey": "sus2",
    "scoreDisplay": "sus2",
    "intervalList": [["maj", 2], ["p", 5]],
    "notesNum": 3,
    "semitoneLocationList": [2, 7],
    "orderedSemitoneLocationList": [2, 7]
  },
  {
    "type": "sus",
    "cnName": "\u6302\u56DB",
    "chordKey": "sus4",
    "scoreDisplay": "sus4",
    "intervalList": [["p", 4], ["p", 5]],
    "notesNum": 3,
    "semitoneLocationList": [5, 7],
    "orderedSemitoneLocationList": [5, 7]
  },
  {
    "type": "sus",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "chordKey": "dom7sus2",
    "scoreDisplay": "7sus2",
    "intervalList": [["maj", 2], ["p", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [2, 7, 10],
    "orderedSemitoneLocationList": [2, 7, 10]
  },
  {
    "type": "sus",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "chordKey": "dom7sus4",
    "scoreDisplay": "7sus4",
    "intervalList": [["p", 4], ["p", 5], ["min", 7]],
    "notesNum": 4,
    "semitoneLocationList": [5, 7, 10],
    "orderedSemitoneLocationList": [5, 7, 10]
  },
  {
    "type": "sus",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "chordKey": "maj7sus2",
    "scoreDisplay": "M7sus2",
    "intervalList": [["maj", 2], ["p", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [2, 7, 11],
    "orderedSemitoneLocationList": [2, 7, 11]
  },
  {
    "type": "sus",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "chordKey": "maj7sus4",
    "scoreDisplay": "M7sus4",
    "intervalList": [["p", 4], ["p", 5], ["maj", 7]],
    "notesNum": 4,
    "semitoneLocationList": [5, 7, 11],
    "orderedSemitoneLocationList": [5, 7, 11]
  },
  {
    "type": "sus",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "chordKey": "dom9sus4",
    "scoreDisplay": "9sus4",
    "intervalList": [["p", 4], ["p", 5], ["min", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [5, 7, 10, 2],
    "orderedSemitoneLocationList": [2, 5, 7, 10]
  },
  {
    "type": "sus",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "chordKey": "maj9sus4",
    "scoreDisplay": "M9sus4",
    "intervalList": [["p", 4], ["p", 5], ["maj", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [5, 7, 11, 2],
    "orderedSemitoneLocationList": [2, 5, 7, 11]
  },
  {
    "type": "sus",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "chordKey": "dom13sus4",
    "scoreDisplay": "13sus4",
    "intervalList": [["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]],
    "notesNum": 6,
    "semitoneLocationList": [5, 7, 10, 2, 9],
    "orderedSemitoneLocationList": [2, 5, 7, 9, 10]
  },
  {
    "type": "sus",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "chordKey": "maj13sus4",
    "scoreDisplay": "M13sus4",
    "intervalList": [["p", 4], ["p", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
    "notesNum": 6,
    "semitoneLocationList": [5, 7, 11, 2, 9],
    "orderedSemitoneLocationList": [2, 5, 7, 9, 11]
  },
  {
    "type": "sus",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "chordKey": "maj13sus2",
    "scoreDisplay": "M13sus2",
    "intervalList": [["maj", 2], ["p", 5], ["maj", 7], ["maj", 13]],
    "notesNum": 5,
    "semitoneLocationList": [2, 7, 11, 9],
    "orderedSemitoneLocationList": [2, 7, 9, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u5927\u4E5D",
    "chordKey": "maj9",
    "scoreDisplay": "M9",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 11, 2],
    "orderedSemitoneLocationList": [2, 4, 7, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u5C5E\u4E5D",
    "chordKey": "dom9",
    "scoreDisplay": 9,
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 10, 2],
    "orderedSemitoneLocationList": [2, 4, 7, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C0F\u4E5D",
    "chordKey": "min9",
    "scoreDisplay": "m9",
    "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [3, 7, 10, 2],
    "orderedSemitoneLocationList": [2, 3, 7, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "chordKey": "minmaj9",
    "scoreDisplay": "mM9",
    "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [3, 7, 11, 2],
    "orderedSemitoneLocationList": [2, 3, 7, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "chordKey": "dom9#5",
    "scoreDisplay": "+9",
    "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 8, 10, 2],
    "orderedSemitoneLocationList": [2, 4, 8, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "chordKey": "dom9b9",
    "scoreDisplay": "9b9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 7, 10, 1],
    "orderedSemitoneLocationList": [1, 4, 7, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "chordKey": "dom9b11",
    "scoreDisplay": "9b11",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["dim", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 2, 4],
    "orderedSemitoneLocationList": [2, 4, 4, 7, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "chordKey": "dom9#11",
    "scoreDisplay": "9#11",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 2, 6],
    "orderedSemitoneLocationList": [2, 4, 6, 7, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "chordKey": "dom9b13",
    "scoreDisplay": "9b13",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["min", 13]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 2, 8],
    "orderedSemitoneLocationList": [2, 4, 7, 8, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "chordKey": "maj9b5",
    "scoreDisplay": "M9b5",
    "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 6, 11, 2],
    "orderedSemitoneLocationList": [2, 4, 6, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "chordKey": "maj9#5",
    "scoreDisplay": "M9#5",
    "intervalList": [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [4, 8, 11, 2],
    "orderedSemitoneLocationList": [2, 4, 8, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "chordKey": "maj9#11",
    "scoreDisplay": "M9#11",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 11, 2, 6],
    "orderedSemitoneLocationList": [2, 4, 6, 7, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "chordKey": "maj9b13",
    "scoreDisplay": "M9b13",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["min", 13]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 11, 2, 8],
    "orderedSemitoneLocationList": [2, 4, 7, 8, 11]
  },
  {
    "type": "chord9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "chordKey": "min9b5",
    "scoreDisplay": "m9b5",
    "intervalList": [["min", 3], ["dim", 5], ["min", 7], ["maj", 9]],
    "notesNum": 5,
    "semitoneLocationList": [3, 6, 10, 2],
    "orderedSemitoneLocationList": [2, 3, 6, 10]
  },
  {
    "type": "chord9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "chordKey": "min9b9",
    "scoreDisplay": "m9b9",
    "intervalList": [["min", 3], ["p", 5], ["min", 7], ["min", 9]],
    "notesNum": 5,
    "semitoneLocationList": [3, 7, 10, 1],
    "orderedSemitoneLocationList": [1, 3, 7, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5927\u5341\u4E00",
    "chordKey": "maj11",
    "scoreDisplay": "M11",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 11, 2, 5],
    "orderedSemitoneLocationList": [2, 4, 5, 7, 11]
  },
  {
    "type": "chord11",
    "cnName": "\u5C5E\u5341\u4E00",
    "chordKey": "dom11",
    "scoreDisplay": 11,
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 2, 5],
    "orderedSemitoneLocationList": [2, 4, 5, 7, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C0F\u5341\u4E00",
    "chordKey": "min11",
    "scoreDisplay": "m11",
    "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [3, 7, 10, 2, 5],
    "orderedSemitoneLocationList": [2, 3, 5, 7, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "chordKey": "minmaj11",
    "scoreDisplay": "mM11",
    "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [3, 7, 11, 2, 5],
    "orderedSemitoneLocationList": [2, 3, 5, 7, 11]
  },
  {
    "type": "chord11",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "chordKey": "dom11b5",
    "scoreDisplay": "11b5",
    "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 6, 10, 2, 5],
    "orderedSemitoneLocationList": [2, 4, 5, 6, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "chordKey": "dom11#5",
    "scoreDisplay": "11#5",
    "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 8, 10, 2, 5],
    "orderedSemitoneLocationList": [2, 4, 5, 8, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "chordKey": "dom11b9",
    "scoreDisplay": "11b9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 1, 5],
    "orderedSemitoneLocationList": [1, 4, 5, 7, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "chordKey": "dom11#9",
    "scoreDisplay": "11#9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 3, 5],
    "orderedSemitoneLocationList": [3, 4, 5, 7, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "chordKey": "dom11b13",
    "scoreDisplay": "11b13",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["min", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 7, 10, 2, 5, 8],
    "orderedSemitoneLocationList": [2, 4, 5, 7, 8, 10]
  },
  {
    "type": "chord11",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "chordKey": "min11b5",
    "scoreDisplay": "m11b5",
    "intervalList": [["min", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
    "notesNum": 6,
    "semitoneLocationList": [3, 6, 10, 2, 5],
    "orderedSemitoneLocationList": [2, 3, 5, 6, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5927\u5341\u4E09",
    "chordKey": "maj13",
    "scoreDisplay": "M13",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 7, 11, 2, 5, 9],
    "orderedSemitoneLocationList": [2, 4, 5, 7, 9, 11]
  },
  {
    "type": "chord13",
    "cnName": "\u5C5E\u5341\u4E09",
    "chordKey": "dom13",
    "scoreDisplay": 13,
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 7, 10, 2, 5, 9],
    "orderedSemitoneLocationList": [2, 4, 5, 7, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5C0F\u5341\u4E09",
    "chordKey": "min13",
    "scoreDisplay": "m13",
    "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [3, 7, 10, 2, 5, 9],
    "orderedSemitoneLocationList": [2, 3, 5, 7, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "chordKey": "minmaj13",
    "scoreDisplay": "mM13",
    "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [3, 7, 11, 2, 5, 9],
    "orderedSemitoneLocationList": [2, 3, 5, 7, 9, 11]
  },
  {
    "type": "chord13",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "chordKey": "dom13b5",
    "scoreDisplay": "13b5",
    "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 6, 10, 2, 5, 9],
    "orderedSemitoneLocationList": [2, 4, 5, 6, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "chordKey": "dom13#5",
    "scoreDisplay": "13#5",
    "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 8, 10, 2, 5, 9],
    "orderedSemitoneLocationList": [2, 4, 5, 8, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "chordKey": "dom13b9",
    "scoreDisplay": "13b9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 7, 10, 1, 5, 9],
    "orderedSemitoneLocationList": [1, 4, 5, 7, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "chordKey": "dom13#9",
    "scoreDisplay": "13#9",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["maj", 13]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 10, 3, 9],
    "orderedSemitoneLocationList": [3, 4, 7, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "chordKey": "dom13#11",
    "scoreDisplay": "13#11",
    "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 7, 10, 2, 6, 9],
    "orderedSemitoneLocationList": [2, 4, 6, 7, 9, 10]
  },
  {
    "type": "chord13",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "chordKey": "maj13b5",
    "scoreDisplay": "M13b5",
    "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
    "notesNum": 6,
    "semitoneLocationList": [4, 6, 11, 2, 9],
    "orderedSemitoneLocationList": [2, 4, 6, 9, 11]
  },
  {
    "type": "chord13",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "chordKey": "maj13#5",
    "scoreDisplay": "M13#5",
    "intervalList": [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
    "notesNum": 6,
    "semitoneLocationList": [4, 8, 11, 2, 9],
    "orderedSemitoneLocationList": [2, 4, 8, 9, 11]
  },
  {
    "type": "chord13",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "chordKey": "maj13b9",
    "scoreDisplay": "M13b9",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 9], ["maj", 13]],
    "notesNum": 6,
    "semitoneLocationList": [4, 7, 11, 1, 9],
    "orderedSemitoneLocationList": [1, 4, 7, 9, 11]
  },
  {
    "type": "chord13",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "chordKey": "maj13#11",
    "scoreDisplay": "M13#11",
    "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
    "notesNum": 7,
    "semitoneLocationList": [4, 7, 11, 2, 6, 9],
    "orderedSemitoneLocationList": [2, 4, 6, 7, 9, 11]
  }
];
var chordMeta_default = chordMeta;

// src/chord/cls/classFn/cls_initChordClass.ts
import collect7 from "collect.js";
var cls_initChordClass = (chordKey) => {
  const findChordObj = collect7(chordMeta_default).where("chordKey", chordKey).first();
  if (!findChordObj) throw new ChordError(`No such chord term like ${chordKey}.`);
  const targetBaseIntervalPanel = {
    2: void 0,
    3: void 0,
    4: void 0,
    5: void 0,
    6: void 0,
    7: void 0,
    9: void 0,
    11: void 0,
    13: void 0
  };
  findChordObj.intervalList.forEach((x) => {
    targetBaseIntervalPanel[x[1]] = x[0];
  });
  return {
    baseIntervalList: findChordObj.intervalList,
    baseIntervalPanel: targetBaseIntervalPanel,
    scoreSymbol: findChordObj.scoreDisplay,
    chordKey: findChordObj.chordKey,
    cnName: findChordObj.cnName,
    type: findChordObj.type
  };
};
var cls_initChordClass_default = cls_initChordClass;

// src/chord/cls/classFn/cls_dealTransformString.ts
var cls_dealTransformString = (originTransformPanel, transformString) => {
  const targetTransformPanel = { ...originTransformPanel };
  if (["4", "5", "11"].includes(transformString)) {
    targetTransformPanel[transformString] = "p";
    return targetTransformPanel;
  }
  if (["2", "3", "6", "7", "9", "13"].includes(transformString)) {
    targetTransformPanel[transformString] = "maj";
    return targetTransformPanel;
  }
  if (["#4", "#5", "#11", "#2", "#3", "#6", "#7", "#9", "#13"].includes(transformString)) {
    targetTransformPanel[transformString.slice(1)] = "aug";
    return targetTransformPanel;
  }
  if (["b2", "b3", "b6", "b7", "b9", "b13"].includes(transformString)) {
    targetTransformPanel[transformString.slice(1)] = "min";
    return targetTransformPanel;
  }
  if (["b4", "b5", "b11"].includes(transformString)) {
    targetTransformPanel[transformString.slice(1)] = "dim";
    return targetTransformPanel;
  }
  throw new ChordError("Please check the chord transform string.");
};
var cls_dealTransformString_default = cls_dealTransformString;

// src/chord/cls/classFn/cls_dealOmit.ts
var cls_dealOmit = (originTransformPanel, omitInterval) => {
  const targetTransformPanel = originTransformPanel;
  targetTransformPanel[omitInterval] = "omit";
  return targetTransformPanel;
};
var cls_dealOmit_default = cls_dealOmit;

// src/chord/cls/classFn/cls_getIntervalPanel.ts
import { keys as keys2 } from "lodash";
var cls_getIntervalPanel = (baseIntervalPanel, transformPanel) => {
  const targetIntervalPanel = { ...baseIntervalPanel };
  for (const i_key of keys2(baseIntervalPanel)) {
    if (!transformPanel[i_key]) continue;
    if (transformPanel[i_key] === "omit") {
      targetIntervalPanel[i_key] = void 0;
      continue;
    }
    if (["maj", "min", "p", "dim", "aug"].includes(transformPanel[i_key])) {
      targetIntervalPanel[i_key] = transformPanel[i_key];
    }
  }
  return targetIntervalPanel;
};
var cls_getIntervalPanel_default = cls_getIntervalPanel;

// src/chord/cls/classFn/cls_getNotesList.ts
import { keys as keys3 } from "lodash";
var cls_getNotesList2 = (rootNote, intervalPanel) => {
  const targetNotesList = [rootNote];
  const dealPush = (intervalType, intervalNum) => {
    const targetInterval = new Interval(intervalType, intervalNum);
    const pushNote = rootNote.getNoteByInterval(targetInterval);
    targetNotesList.push(pushNote);
  };
  for (const i_key of keys3(intervalPanel)) {
    if (!intervalPanel[i_key]) continue;
    switch (i_key) {
      case "2":
        dealPush(intervalPanel[i_key], 2);
        continue;
      case "3":
        dealPush(intervalPanel[i_key], 3);
        continue;
      case "4":
        dealPush(intervalPanel[i_key], 4);
        continue;
      case "5":
        dealPush(intervalPanel[i_key], 5);
        continue;
      case "6":
        dealPush(intervalPanel[i_key], 6);
        continue;
      case "7":
        dealPush(intervalPanel[i_key], 7);
        continue;
      case "9":
        dealPush(intervalPanel[i_key], 9);
        continue;
      case "11":
        dealPush(intervalPanel[i_key], 11);
        continue;
      case "13":
        dealPush(intervalPanel[i_key], 13);
        continue;
      default:
        throw new ChordError("Please check chord intervals.");
    }
  }
  return targetNotesList;
};
var cls_getNotesList_default2 = cls_getNotesList2;

// src/chord/cls/classFn/cls_getNotesPanel.ts
import { keys as keys4 } from "lodash";
var cls_getNotesPanel2 = (rootNote, intervalPanel) => {
  const targetNotesPanel = {
    1: rootNote,
    2: void 0,
    3: void 0,
    4: void 0,
    5: void 0,
    6: void 0,
    7: void 0,
    9: void 0,
    11: void 0,
    13: void 0
  };
  const dealPush = (intervalType, intervalNum, key) => {
    const targetInterval = new Interval(intervalType, intervalNum);
    targetNotesPanel[key] = rootNote.getNoteByInterval(targetInterval);
  };
  for (const i_key of keys4(intervalPanel)) {
    if (!intervalPanel[i_key]) continue;
    switch (i_key) {
      case "2":
        dealPush(intervalPanel[i_key], 2, i_key);
        continue;
      case "3":
        dealPush(intervalPanel[i_key], 3, i_key);
        continue;
      case "4":
        dealPush(intervalPanel[i_key], 4, i_key);
        continue;
      case "5":
        dealPush(intervalPanel[i_key], 5, i_key);
        continue;
      case "6":
        dealPush(intervalPanel[i_key], 6, i_key);
        continue;
      case "7":
        dealPush(intervalPanel[i_key], 7, i_key);
        continue;
      case "9":
        dealPush(intervalPanel[i_key], 9, i_key);
        continue;
      case "11":
        dealPush(intervalPanel[i_key], 11, i_key);
        continue;
      case "13":
        dealPush(intervalPanel[i_key], 13, i_key);
        continue;
      default:
        throw new ChordError("Please check chord intervals.");
    }
  }
  return targetNotesPanel;
};
var cls_getNotesPanel_default2 = cls_getNotesPanel2;

// src/chord/cls/classFn/cls_getIntervalList.ts
import { keys as keys5 } from "lodash";
var cls_getIntervalList2 = (intervalPanel) => {
  const resultList = [];
  for (const i of keys5(intervalPanel)) {
    if (!intervalPanel[i]) continue;
    switch (i) {
      case "2":
        resultList.push([intervalPanel[i], 2]);
        continue;
      case "3":
        resultList.push([intervalPanel[i], 3]);
        continue;
      case "4":
        resultList.push([intervalPanel[i], 4]);
        continue;
      case "5":
        resultList.push([intervalPanel[i], 5]);
        continue;
      case "6":
        resultList.push([intervalPanel[i], 6]);
        continue;
      case "7":
        resultList.push([intervalPanel[i], 7]);
        continue;
      case "9":
        resultList.push([intervalPanel[i], 9]);
        continue;
      case "11":
        resultList.push([intervalPanel[i], 11]);
        continue;
      case "13":
        resultList.push([intervalPanel[i], 13]);
        continue;
      default:
        throw new ChordError("Please check chord intervals.");
    }
  }
  return resultList;
};
var cls_getIntervalList_default2 = cls_getIntervalList2;

// src/chord/cls/classFn/cls_getScoreSymbol.ts
import { isEmpty as isEmpty2, keys as keys6 } from "lodash";
var cls_getScoreSymbol = (rootNote, baseScoreSymbol, baseIntervalPanel, transformPanel) => {
  const omitResults = [];
  const alterResults = [];
  for (const i_key of keys6(baseIntervalPanel)) {
    if (isEmpty2(transformPanel[i_key])) continue;
    if (transformPanel[i_key] === "omit") {
      if (!baseIntervalPanel[i_key]) continue;
      else omitResults.push(i_key);
    }
    if (baseIntervalPanel[i_key] === transformPanel[i_key]) continue;
    if (transformPanel[i_key] === "aug") alterResults.push(`\u266F${i_key}`);
    if (transformPanel[i_key] === "p") alterResults.push(`\u266E${i_key}`);
    if (transformPanel[i_key] === "maj") alterResults.push(`\u266E${i_key}`);
    if (transformPanel[i_key] === "min") alterResults.push(`\u266D${i_key}`);
    if (transformPanel[i_key] === "dim") {
      if (["2", "3", "6", "7", "13"].includes(i_key)) {
        alterResults.push(`\u266D\u266D${i_key}`);
      } else alterResults.push(`\u266D${i_key}`);
    }
  }
  const chordTerm1 = `${baseScoreSymbol}`;
  const alterString = alterResults.join(",");
  const omitString = omitResults.join(",");
  if (alterString.length + omitString.length === 0) return `${chordTerm1}`;
  if (alterString.length > 0 && omitString.length === 0) return `${chordTerm1}(${alterString})`;
  if (alterString.length > 0 && omitString.length > 0) return `${chordTerm1}(${alterString},omit${omitString})`;
  if (alterString.length === 0 && omitString.length > 0) return `${chordTerm1}(omit${omitString})`;
};
var cls_getScoreSymbol_default = cls_getScoreSymbol;

// src/chord/cls/ChordClass.ts
import { isEmpty as isEmpty5 } from "lodash";

// src/chord/cls/classFn/cls_isTransformEmpty.ts
import { isUndefined as isUndefined6, keys as keys7 } from "lodash";
var cls_isTransformEmpty = (obj) => {
  let result = true;
  for (let k of keys7(obj)) {
    if (!isUndefined6(obj[k])) {
      result = false;
      break;
    }
  }
  return result;
};
var cls_isTransformEmpty_default = cls_isTransformEmpty;

// src/chord/cls/classFn/cls_tryToMergeTransform.ts
import { isEmpty as isEmpty4, isEqual as isEqual2, isString as isString2, keys as keys8 } from "lodash";

// src/factory/index.ts
var factory_exports = {};
__export(factory_exports, {
  getChord: () => getChord,
  getInterval: () => getInterval,
  getNote: () => getNote,
  getScale: () => getScale
});

// src/factory/methods/getNote.ts
var getNote = (step, alter, octave = 5) => {
  const noteStep = step.trim().toUpperCase();
  if (!stepList_default.includes(noteStep)) throw new FactoryError("Invalid step.");
  if (Math.abs(alter) > 2) throw new FactoryError("Invalid alter.");
  return new Note(noteStep, alter, octave);
};

// src/factory/methods/getInterval.ts
var getInterval = (type, num) => {
  try {
    return new Interval(type.trim(), num);
  } catch (e) {
    throw new FactoryError(e.message);
  }
};

// src/factory/methods/getScale.ts
var getScale = (step, alter, octave, mode) => {
  try {
    const rootNote = getNote(step, alter, octave);
    return new Scale(rootNote, mode.trim().toUpperCase());
  } catch (e) {
    throw new FactoryError(e.message);
  }
};

// src/factory/methods/getChord.ts
var getChord = (step, alter, octave, chordKey, transformPanel) => {
  const rootNote = new Note(step, alter, octave);
  return new Chord(rootNote, chordKey, transformPanel);
};

// src/chord/cls/classFn/cls_tryToMergeTransform.ts
import collect8 from "collect.js";
var cls_tryToMergeTransform = (rootNote, chordKey, intervalPanel, transformPanel) => {
  if (cls_isTransformEmpty_default(transformPanel)) return new Chord(rootNote, chordKey);
  const newIntervalPanel = { ...intervalPanel };
  for (let k of keys8(transformPanel)) {
    const tk = transformPanel[k];
    if (!isString2(tk)) continue;
    if (tk === "omit") {
      newIntervalPanel[k] = void 0;
    } else if (tk.length > 0) {
      newIntervalPanel[k] = tk;
    }
  }
  const findSemitoneList = keys8(newIntervalPanel).map((k) => {
    if (!isEmpty4(newIntervalPanel[k])) {
      return getInterval(newIntervalPanel[k], parseInt(k, 10));
    }
  }).filter(Boolean).map((x) => x.semitoneLocation).sort((a, b) => a - b);
  const findNewResult = collect8(chordMeta_default).filter((x) => {
    if (isEqual2(x.orderedSemitoneLocationList, findSemitoneList)) return true;
  }).first();
  if (isEmpty4(findNewResult)) return new Chord(rootNote, chordKey, transformPanel);
  return new Chord(rootNote, findNewResult.chordKey);
};
var cls_tryToMergeTransform_default = cls_tryToMergeTransform;

// src/chord/cls/ChordClass.ts
var defaultTransform = {
  2: void 0,
  3: void 0,
  4: void 0,
  5: void 0,
  6: void 0,
  7: void 0,
  9: void 0,
  11: void 0,
  13: void 0
};
var _transformPanel, _initInfo, _Chord_instances, intervalPanel_get, notesPanel_get;
var Chord = class {
  constructor(rootNote, chordKey, initTransform) {
    __privateAdd(this, _Chord_instances);
    __publicField(this, "rootNote");
    __privateAdd(this, _transformPanel);
    __privateAdd(this, _initInfo);
    this.rootNote = rootNote;
    const initChordInfo = cls_initChordClass_default(chordKey);
    __privateSet(this, _initInfo, {
      scoreSymbol: initChordInfo.scoreSymbol,
      intervalList: initChordInfo.baseIntervalList,
      chordKey: initChordInfo.chordKey,
      cnName: initChordInfo.cnName,
      intervalPanel: initChordInfo.baseIntervalPanel,
      type: initChordInfo.type
    });
    __privateSet(this, _transformPanel, isEmpty5(initTransform) ? defaultTransform : { ...defaultTransform, ...initTransform });
  }
  tryToMergeTransform() {
    return cls_tryToMergeTransform_default(this.rootNote, __privateGet(this, _initInfo).chordKey, __privateGet(this, _Chord_instances, intervalPanel_get), __privateGet(this, _transformPanel));
  }
  get transformPanel() {
    return __privateGet(this, _transformPanel);
  }
  get chordKey() {
    return __privateGet(this, _initInfo).chordKey;
  }
  setTransform(transformString) {
    __privateSet(this, _transformPanel, cls_dealTransformString_default(__privateGet(this, _transformPanel), transformString));
    return this;
  }
  get baseSymbol() {
    return __privateGet(this, _initInfo).scoreSymbol;
  }
  setOmit(omitInterval) {
    __privateSet(this, _transformPanel, cls_dealOmit_default(__privateGet(this, _transformPanel), omitInterval));
  }
  get scoreSymbol() {
    return cls_getScoreSymbol_default(
      this.rootNote,
      __privateGet(this, _initInfo).scoreSymbol,
      __privateGet(this, _initInfo).intervalPanel,
      __privateGet(this, _transformPanel)
    );
  }
  clearTransform() {
    __privateSet(this, _transformPanel, defaultTransform);
  }
  get isTransformed() {
    return !cls_isTransformEmpty_default(__privateGet(this, _transformPanel));
  }
  get intervalList() {
    return cls_getIntervalList_default2(__privateGet(this, _Chord_instances, intervalPanel_get));
  }
  get notesList() {
    return cls_getNotesList_default2(this.rootNote, __privateGet(this, _Chord_instances, intervalPanel_get));
  }
  get simpleDescription() {
    return this.notesList.map((noteInstance) => noteInstance.simpleDescription).join(",");
  }
};
_transformPanel = new WeakMap();
_initInfo = new WeakMap();
_Chord_instances = new WeakSet();
intervalPanel_get = function() {
  return cls_getIntervalPanel_default(__privateGet(this, _initInfo).intervalPanel, __privateGet(this, _transformPanel));
};
notesPanel_get = function() {
  return cls_getNotesPanel_default2(this.rootNote, __privateGet(this, _Chord_instances, intervalPanel_get));
};

// src/scale/cls/ScaleClass.ts
var _modeUID;
var Scale = class {
  constructor(rootNote, scaleMode) {
    __publicField(this, "modeDescription");
    __publicField(this, "intervalPanel");
    __publicField(this, "alterSum");
    __publicField(this, "alterTimesSum");
    __publicField(this, "rootNote");
    __privateAdd(this, _modeUID);
    __publicField(this, "modeName");
    __publicField(this, "type");
    if (Math.abs(rootNote.alter) > 1) throw new ScaleError("The root note's alter is too big.");
    const scaleInitInfo = cls_initScale_default(rootNote, scaleMode);
    this.intervalPanel = scaleInitInfo.intervalPanel;
    this.rootNote = rootNote;
    this.modeDescription = scaleInitInfo.description;
    this.type = scaleInitInfo.type;
    this.alterSum = scaleInitInfo.includedAlters;
    this.alterTimesSum = scaleInitInfo.staveAlterTimes;
    this.modeName = scaleInitInfo.modeName;
    __privateSet(this, _modeUID, scaleInitInfo.modeUID);
  }
  get chord3OfDegreesList() {
    return cls_findDegreeChordInScale_default(this.notesList, true);
  }
  get chord7OfDegreesList() {
    return cls_findDegreeChordInScale_default(this.notesList, false);
  }
  get notesList() {
    return cls_getNotesList_default(this.rootNote, this.intervalList);
  }
  get intervalList() {
    return cls_getIntervalList_default(this.intervalPanel);
  }
  get notesPanel() {
    return cls_getNotesPanel_default(this.rootNote, this.intervalList);
  }
  get naturalNotesNum() {
    return this.notesList.filter((x) => x.alter === 0).length;
  }
  get alteredNotesNum() {
    return this.notesList.filter((x) => Math.abs(x.alter) >= 1).length;
  }
  get sharpOrFlatNotesNum() {
    return this.notesList.filter((x) => Math.abs(x.alter) === 1).length;
  }
  get doubleSharpOrFlatNotesNum() {
    return this.notesList.filter((x) => Math.abs(x.alter) === 2).length;
  }
  get alterList() {
    return cls_getAlterList_default(this.intervalList);
  }
  get isTonicReplaced() {
    return this.alteredNotesNum === this.notesList.length;
  }
  getNoteByIntervalNum(num, isWithinOctave = false) {
    return cls_getNoteByIntervalNum_default(this.notesList, num, isWithinOctave);
  }
  get simpleDescription() {
    return this.notesList.map((x) => x.artName + x.octave).join(",");
  }
  get equalRootNote() {
    if (this.isTonicReplaced) {
      return this.rootNote.getSamePitchNotes(false, 1)[0];
    }
    return this.rootNote;
  }
  getScaleDegreeNote(degree) {
    return cls_getDegreeNote_default(this.notesList, degree);
  }
  getScaleDegreeChord3Key(scaleDegree) {
    return cls_findOneChordInScale_default(this.notesList, scaleDegree, true);
  }
  getScaleDegreeChord7Key(scaleDegree) {
    return cls_findOneChordInScale_default(this.notesList, scaleDegree, false);
  }
  getScaleDegreeChord3(scaleDegree) {
    const scaleRadix = new ScaleRadix(scaleDegree).scaleDegree;
    return new Chord(this.notesList[scaleRadix - 1], this.getScaleDegreeChord3Key(scaleDegree));
  }
  getScaleDegreeChord7(scaleDegree) {
    const scaleRadix = new ScaleRadix(scaleDegree).scaleDegree;
    return new Chord(this.notesList[scaleRadix - 1], this.getScaleDegreeChord7Key(scaleDegree));
  }
};
_modeUID = new WeakMap();

// src/scale/presets/MajorModeGroup.ts
var MajorModeGroup_default = [
  ScaleMode_default.NaturalMajor,
  ScaleMode_default.HarmonicMajor,
  ScaleMode_default.MelodicMajorDescending,
  ScaleMode_default.Lydian,
  ScaleMode_default.Mixolydian
];

// src/scale/presets/MinorModeGroup.ts
var MinorModeGroup_default = [
  ScaleMode_default.MelodicMinorAscending,
  ScaleMode_default.HarmonicMinor,
  ScaleMode_default.NaturalMinor,
  ScaleMode_default.Dorian,
  ScaleMode_default.Phrygian
];

// src/scale/methods/getModeNameByModeKey.ts
import collect9 from "collect.js";
var getModeNameByModeKey = (modeKey) => {
  try {
    return collect9(modeMeta_default).where("uid", modeKey).first().name;
  } catch (e) {
    throw new Error("The modeKey is not valid!");
  }
};
var getModeNameByModeKey_default = getModeNameByModeKey;

// src/scale/methods/getModeTypeByModeKey.ts
import collect10 from "collect.js";
var getModeNameByModeKey2 = (modeKey) => {
  try {
    return collect10(modeMeta_default).where("uid", modeKey).first().type;
  } catch (e) {
    throw new Error("The modeKey is not valid!");
  }
};
var getModeTypeByModeKey_default = getModeNameByModeKey2;

// src/scale/methods/getIntervalListByModeKey.ts
import collect11 from "collect.js";
import { isEmpty as isEmpty6 } from "lodash";
var getIntervalListByModeKey = (modeKey) => {
  const findResult = collect11(modeMeta_default).where("uid", modeKey).first();
  if (isEmpty6(findResult)) throw new Error(`Error Mode of ${modeKey}.`);
  return findResult.intervalList;
};
var getIntervalListByModeKey_default = getIntervalListByModeKey;

// src/scale/index.ts
var scale_default = {
  Scale,
  ScaleMode: ScaleMode_default,
  MajorModeGroup: MajorModeGroup_default,
  MinorModeGroup: MinorModeGroup_default,
  getModeNameByModeKey: getModeNameByModeKey_default,
  getModeTypeByModeKey: getModeTypeByModeKey_default,
  getIntervalListByModeKey: getIntervalListByModeKey_default
};

// src/stave/index.ts
var stave_exports = {};
__export(stave_exports, {
  getAlterStepListByNum: () => getAlterStepListByNum,
  getScaleByStaveAlters: () => getScaleByStaveAlters,
  getStaveAlterByNote: () => getStaveAlterByNote
});

// src/circleOfFifths/static/fifthMeta.ts
import collect12 from "collect.js";
var fifthMeta_default = collect12(
  [
    {
      rawNoteStep: "C",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "B",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -7,
      circleID: 5
    },
    {
      rawNoteStep: "C",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "C",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 0,
      circleID: 0
    },
    {
      rawNoteStep: "C",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "D",
      actualNoteAlter: -1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 7,
      circleID: 7
    },
    {
      rawNoteStep: "D",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "D",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -5,
      circleID: 7
    },
    {
      rawNoteStep: "D",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "D",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 2,
      circleID: 2
    },
    {
      rawNoteStep: "D",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "E",
      actualNoteAlter: -1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 9,
      circleID: -1
    },
    {
      rawNoteStep: "E",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "E",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -3,
      circleID: 9
    },
    {
      rawNoteStep: "E",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "E",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 4,
      circleID: 4
    },
    {
      rawNoteStep: "E",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "F",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 11,
      circleID: -1
    },
    {
      rawNoteStep: "F",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "E",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: -8,
      circleID: -1
    },
    {
      rawNoteStep: "F",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "F",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -1,
      circleID: 11
    },
    {
      rawNoteStep: "F",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "F",
      actualNoteAlter: 1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 6,
      circleID: 6
    },
    {
      rawNoteStep: "G",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "G",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -6,
      circleID: 6
    },
    {
      rawNoteStep: "G",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "G",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 1,
      circleID: 1
    },
    {
      rawNoteStep: "G",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "A",
      actualNoteAlter: -1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 8,
      circleID: -1
    },
    {
      rawNoteStep: "A",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "A",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -4,
      circleID: 8
    },
    {
      rawNoteStep: "A",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "A",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 3,
      circleID: 3
    },
    {
      rawNoteStep: "A",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "B",
      actualNoteAlter: -1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 10,
      circleID: -1
    },
    {
      rawNoteStep: "B",
      rawNoteAlter: -1,
      mode: "major",
      actualNoteStep: "B",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -2,
      circleID: 10
    },
    {
      rawNoteStep: "B",
      rawNoteAlter: 0,
      mode: "major",
      actualNoteStep: "B",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 5,
      circleID: 5
    },
    {
      rawNoteStep: "B",
      rawNoteAlter: 1,
      mode: "major",
      actualNoteStep: "C",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 12,
      circleID: -1
    },
    {
      rawNoteStep: "C",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "B",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: -10,
      circleID: -1
    },
    {
      rawNoteStep: "C",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "C",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -3,
      circleID: 9
    },
    {
      rawNoteStep: "C",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "C",
      actualNoteAlter: 1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 4,
      circleID: 4
    },
    {
      rawNoteStep: "D",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "C",
      actualNoteAlter: 1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: true,
      rawStaveAlters: -8,
      circleID: -1
    },
    {
      rawNoteStep: "D",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "D",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -1,
      circleID: 11
    },
    {
      rawNoteStep: "D",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "D",
      actualNoteAlter: 1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 6,
      circleID: 6
    },
    {
      rawNoteStep: "E",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "E",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -6,
      circleID: 6
    },
    {
      rawNoteStep: "E",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "E",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 1,
      circleID: 1
    },
    {
      rawNoteStep: "E",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "F",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 8,
      circleID: -1
    },
    {
      rawNoteStep: "F",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "E",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: -11,
      circleID: -1
    },
    {
      rawNoteStep: "F",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "F",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -4,
      circleID: 8
    },
    {
      rawNoteStep: "F",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "F",
      actualNoteAlter: 1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 3,
      circleID: 3
    },
    {
      rawNoteStep: "G",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "F",
      actualNoteAlter: 1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: true,
      rawStaveAlters: -9,
      circleID: -1
    },
    {
      rawNoteStep: "G",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "G",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -2,
      circleID: 10
    },
    {
      rawNoteStep: "G",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "G",
      actualNoteAlter: 1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 5,
      circleID: 5
    },
    {
      rawNoteStep: "A",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "G",
      actualNoteAlter: 1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -7,
      circleID: 5
    },
    {
      rawNoteStep: "A",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "A",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 0,
      circleID: 0
    },
    {
      rawNoteStep: "A",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "B",
      actualNoteAlter: -1,
      isTonicReplaced: true,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 7,
      circleID: 7
    },
    {
      rawNoteStep: "B",
      rawNoteAlter: -1,
      mode: "minor",
      actualNoteStep: "B",
      actualNoteAlter: -1,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: -5,
      circleID: 7
    },
    {
      rawNoteStep: "B",
      rawNoteAlter: 0,
      mode: "minor",
      actualNoteStep: "B",
      actualNoteAlter: 0,
      isTonicReplaced: false,
      isTonicNormal: true,
      isDoubleAlterIncluded: false,
      rawStaveAlters: 2,
      circleID: 2
    },
    {
      rawNoteStep: "B",
      rawNoteAlter: 1,
      mode: "minor",
      actualNoteStep: "C",
      actualNoteAlter: 0,
      isTonicReplaced: true,
      isTonicNormal: false,
      isDoubleAlterIncluded: true,
      rawStaveAlters: 9,
      circleID: -1
    }
  ]
);

// src/stave/methods/getStaveAlterByNote.ts
import { isEmpty as isEmpty7 } from "lodash";
var getStaveAlterByNote = (step, alter) => {
  const findObj = fifthMeta_default.where("rawNoteStep", step).where("rawNoteAlter", alter).all();
  if (isEmpty7(findObj)) throw new Error("No alter value found for the given note!");
  return findObj;
};

// src/stave/methods/getScaleByStaveAlters.ts
var getScaleByStaveAlters = (staveAlter) => {
  if (Math.abs(staveAlter) > 7) throw new Error("staveAlter must be between -7 and 7");
  if (Math.abs(staveAlter) <= 6) return fifthMeta_default.where("circleID", ">=", 0).where("circleID", "<=", 12).where("rawStaveAlters", staveAlter).where("isTonicReplaced", false).all();
  if (Math.abs(staveAlter) === 7) return fifthMeta_default.where("rawStaveAlters", staveAlter).all();
};

// src/stave/methods/getAlterStepListByNum.ts
import { reverse } from "lodash";
var li = ["F", "C", "G", "D", "A", "E", "B"];
var liReverse = reverse([...li]);
var getAlterStepListByNum = (num) => {
  if (num === 0) return [];
  if (num > 7 || num < -7) throw new Error("num must be between -7 and 7");
  if (num > 0) {
    return li.slice(0, num);
  }
  return liReverse.slice(0, Math.abs(num));
};

// src/circleOfFifths/index.ts
var circleOfFifths_exports = {};
__export(circleOfFifths_exports, {
  CircleOfFifths: () => CircleOfFifths,
  getFifthCircleByAlter: () => getFifthCircleByAlter
});

// src/circleOfFifths/cls/CircleClass.ts
import { isInteger } from "lodash";
var CircleOfFifths = class _CircleOfFifths extends Base12Radix {
  constructor(i = 0) {
    if (!isInteger(i)) throw new CircleOfFifthsError("given number must be integer");
    super(i);
  }
  get majCircle() {
    return fifthMeta_default.where("circleID", ">=", 0).where("circleID", "<=", 12).where("mode", "major").where("circleID", this.location).all();
  }
  get minCircle() {
    return fifthMeta_default.where("circleID", ">=", 0).where("circleID", "<=", 12).where("mode", "minor").where("circleID", this.location).all();
  }
  get location() {
    return this.twoDigitArray[1];
  }
  get circleNumber() {
    return this.twoDigitArray[0];
  }
  move(num) {
    if (!isInteger(num)) throw new CircleOfFifthsError("num must be integer");
    if (num === 0) return this;
    return new _CircleOfFifths(this.base10 + num);
  }
  get current() {
    return fifthMeta_default.where("circleID", ">=", 0).where("circleID", "<=", 12).where("circleID", this.location).all();
  }
};

// src/circleOfFifths/methods/getFifthCircleByAlter.ts
var getFifthCircleByAlter = (alter) => {
  const obj = fifthMeta_default.where("staveAlters", alter).first();
  if (obj) return new CircleOfFifths(obj.circleID);
  throw new CircleOfFifthsError(`Cannot find the alter value of ${alter}.`);
};

// src/find/findChord.ts
import collect13 from "collect.js";
import { isArray as isArray2, isNumber as isNumber6, isEqual as isEqual3, intersection, isEmpty as isEmpty8 } from "lodash";
var findChord = (locationList, isStrictlyMatch, rootNoteLocation, limitType) => {
  const isLimitType = isArray2(limitType) && limitType.length > 0;
  const betterLocationList = locationList.slice().sort((x, y) => x - y);
  const isRootNoteLocationRequired = isNumber6(rootNoteLocation) && rootNoteLocation >= 0 && rootNoteLocation <= 11;
  let handle = collect13(findChordMeta_default);
  if (isRootNoteLocationRequired) {
    handle = handle.where("rootNoteLocation", rootNoteLocation);
  }
  if (isLimitType) {
    handle = handle.filter((x) => limitType.includes(x.type));
  }
  const isStrictlyMatchJudge = byDefault_default(isStrictlyMatch, false);
  if (isStrictlyMatchJudge) {
    const result2 = handle.filter((x) => isEqual3(betterLocationList, x.orderedNotesLocationList)).all();
    if (isEmpty8(result2)) return [];
    return result2;
  }
  const result = handle.filter((x) => {
    if (isEqual3(betterLocationList, x.orderedNotesLocationList)) return true;
    if (x.orderedNotesLocationList.length > betterLocationList.length) {
      if (intersection(betterLocationList, x.orderedNotesLocationList).length === betterLocationList.length) return true;
    }
  }).all();
  if (isEmpty8(result)) return [];
  return result;
};
var findChord_default = findChord;

// src/find/findChordInScale.ts
import collect14 from "collect.js";
import { isArray as isArray3, intersection as intersection2, isEmpty as isEmpty9, isString as isString3 } from "lodash";

// src/scale/static/findScale.ts
var findScale = [{
  "rootNoteLocation": 0,
  "mode": "MAJ",
  "notesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 2,
  "n3L": 4,
  "n4L": 5,
  "n5L": 7,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 0,
  "mode": "MIN",
  "notesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 2,
  "n3L": 3,
  "n4L": 5,
  "n5L": 7,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 0,
  "mode": "DOR",
  "notesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 2,
  "n3L": 3,
  "n4L": 5,
  "n5L": 7,
  "n6L": 9,
  "n7L": 10
}, {
  "rootNoteLocation": 0,
  "mode": "PHR",
  "notesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 1,
  "n3L": 3,
  "n4L": 5,
  "n5L": 7,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 0,
  "mode": "LYD",
  "notesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 2,
  "n3L": 4,
  "n4L": 6,
  "n5L": 7,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 0,
  "mode": "MLY",
  "notesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 2,
  "n3L": 4,
  "n4L": 5,
  "n5L": 7,
  "n6L": 9,
  "n7L": 10
}, {
  "rootNoteLocation": 0,
  "mode": "LOC",
  "notesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 1,
  "n3L": 3,
  "n4L": 5,
  "n5L": 6,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 0,
  "mode": "HMIN",
  "notesLocationList": [0, 2, 3, 5, 7, 8, 11],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 11],
  "n2L": 2,
  "n3L": 3,
  "n4L": 5,
  "n5L": 7,
  "n6L": 8,
  "n7L": 11
}, {
  "rootNoteLocation": 0,
  "mode": "HMAJ",
  "notesLocationList": [0, 2, 4, 5, 7, 8, 11],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 11],
  "n2L": 2,
  "n3L": 4,
  "n4L": 5,
  "n5L": 7,
  "n6L": 8,
  "n7L": 11
}, {
  "rootNoteLocation": 0,
  "mode": "MMINASC",
  "notesLocationList": [0, 2, 3, 5, 7, 9, 11],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
  "n2L": 2,
  "n3L": 3,
  "n4L": 5,
  "n5L": 7,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 0,
  "mode": "MMAJDESC",
  "notesLocationList": [0, 2, 4, 5, 7, 8, 10],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
  "n2L": 2,
  "n3L": 4,
  "n4L": 5,
  "n5L": 7,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 1,
  "mode": "MAJ",
  "notesLocationList": [1, 3, 5, 6, 8, 10, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 3,
  "n3L": 5,
  "n4L": 6,
  "n5L": 8,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 1,
  "mode": "MIN",
  "notesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 3,
  "n3L": 4,
  "n4L": 6,
  "n5L": 8,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 1,
  "mode": "DOR",
  "notesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 3,
  "n3L": 4,
  "n4L": 6,
  "n5L": 8,
  "n6L": 10,
  "n7L": 11
}, {
  "rootNoteLocation": 1,
  "mode": "PHR",
  "notesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 2,
  "n3L": 4,
  "n4L": 6,
  "n5L": 8,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 1,
  "mode": "LYD",
  "notesLocationList": [1, 3, 5, 7, 8, 10, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 3,
  "n3L": 5,
  "n4L": 7,
  "n5L": 8,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 1,
  "mode": "MLY",
  "notesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 3,
  "n3L": 5,
  "n4L": 6,
  "n5L": 8,
  "n6L": 10,
  "n7L": 11
}, {
  "rootNoteLocation": 1,
  "mode": "LOC",
  "notesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 2,
  "n3L": 4,
  "n4L": 6,
  "n5L": 7,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 1,
  "mode": "HMIN",
  "notesLocationList": [1, 3, 4, 6, 8, 9, 0],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 9],
  "n2L": 3,
  "n3L": 4,
  "n4L": 6,
  "n5L": 8,
  "n6L": 9,
  "n7L": 0
}, {
  "rootNoteLocation": 1,
  "mode": "HMAJ",
  "notesLocationList": [1, 3, 5, 6, 8, 9, 0],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 9],
  "n2L": 3,
  "n3L": 5,
  "n4L": 6,
  "n5L": 8,
  "n6L": 9,
  "n7L": 0
}, {
  "rootNoteLocation": 1,
  "mode": "MMINASC",
  "notesLocationList": [1, 3, 4, 6, 8, 10, 0],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
  "n2L": 3,
  "n3L": 4,
  "n4L": 6,
  "n5L": 8,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 1,
  "mode": "MMAJDESC",
  "notesLocationList": [1, 3, 5, 6, 8, 9, 11],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
  "n2L": 3,
  "n3L": 5,
  "n4L": 6,
  "n5L": 8,
  "n6L": 9,
  "n7L": 11
}, {
  "rootNoteLocation": 2,
  "mode": "MAJ",
  "notesLocationList": [2, 4, 6, 7, 9, 11, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 4,
  "n3L": 6,
  "n4L": 7,
  "n5L": 9,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 2,
  "mode": "MIN",
  "notesLocationList": [2, 4, 5, 7, 9, 10, 0],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 4,
  "n3L": 5,
  "n4L": 7,
  "n5L": 9,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 2,
  "mode": "DOR",
  "notesLocationList": [2, 4, 5, 7, 9, 11, 0],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 4,
  "n3L": 5,
  "n4L": 7,
  "n5L": 9,
  "n6L": 11,
  "n7L": 0
}, {
  "rootNoteLocation": 2,
  "mode": "PHR",
  "notesLocationList": [2, 3, 5, 7, 9, 10, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 3,
  "n3L": 5,
  "n4L": 7,
  "n5L": 9,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 2,
  "mode": "LYD",
  "notesLocationList": [2, 4, 6, 8, 9, 11, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 4,
  "n3L": 6,
  "n4L": 8,
  "n5L": 9,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 2,
  "mode": "MLY",
  "notesLocationList": [2, 4, 6, 7, 9, 11, 0],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 4,
  "n3L": 6,
  "n4L": 7,
  "n5L": 9,
  "n6L": 11,
  "n7L": 0
}, {
  "rootNoteLocation": 2,
  "mode": "LOC",
  "notesLocationList": [2, 3, 5, 7, 8, 10, 0],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 3,
  "n3L": 5,
  "n4L": 7,
  "n5L": 8,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 2,
  "mode": "HMIN",
  "notesLocationList": [2, 4, 5, 7, 9, 10, 1],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 10],
  "n2L": 4,
  "n3L": 5,
  "n4L": 7,
  "n5L": 9,
  "n6L": 10,
  "n7L": 1
}, {
  "rootNoteLocation": 2,
  "mode": "HMAJ",
  "notesLocationList": [2, 4, 6, 7, 9, 10, 1],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 10],
  "n2L": 4,
  "n3L": 6,
  "n4L": 7,
  "n5L": 9,
  "n6L": 10,
  "n7L": 1
}, {
  "rootNoteLocation": 2,
  "mode": "MMINASC",
  "notesLocationList": [2, 4, 5, 7, 9, 11, 1],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
  "n2L": 4,
  "n3L": 5,
  "n4L": 7,
  "n5L": 9,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 2,
  "mode": "MMAJDESC",
  "notesLocationList": [2, 4, 6, 7, 9, 10, 0],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
  "n2L": 4,
  "n3L": 6,
  "n4L": 7,
  "n5L": 9,
  "n6L": 10,
  "n7L": 0
}, {
  "rootNoteLocation": 3,
  "mode": "MAJ",
  "notesLocationList": [3, 5, 7, 8, 10, 0, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 5,
  "n3L": 7,
  "n4L": 8,
  "n5L": 10,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 3,
  "mode": "MIN",
  "notesLocationList": [3, 5, 6, 8, 10, 11, 1],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 5,
  "n3L": 6,
  "n4L": 8,
  "n5L": 10,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 3,
  "mode": "DOR",
  "notesLocationList": [3, 5, 6, 8, 10, 0, 1],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 5,
  "n3L": 6,
  "n4L": 8,
  "n5L": 10,
  "n6L": 0,
  "n7L": 1
}, {
  "rootNoteLocation": 3,
  "mode": "PHR",
  "notesLocationList": [3, 4, 6, 8, 10, 11, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 4,
  "n3L": 6,
  "n4L": 8,
  "n5L": 10,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 3,
  "mode": "LYD",
  "notesLocationList": [3, 5, 7, 9, 10, 0, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 5,
  "n3L": 7,
  "n4L": 9,
  "n5L": 10,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 3,
  "mode": "MLY",
  "notesLocationList": [3, 5, 7, 8, 10, 0, 1],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 5,
  "n3L": 7,
  "n4L": 8,
  "n5L": 10,
  "n6L": 0,
  "n7L": 1
}, {
  "rootNoteLocation": 3,
  "mode": "LOC",
  "notesLocationList": [3, 4, 6, 8, 9, 11, 1],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 4,
  "n3L": 6,
  "n4L": 8,
  "n5L": 9,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 3,
  "mode": "HMIN",
  "notesLocationList": [3, 5, 6, 8, 10, 11, 2],
  "orderedNotesLocationList": [2, 3, 5, 6, 8, 10, 11],
  "n2L": 5,
  "n3L": 6,
  "n4L": 8,
  "n5L": 10,
  "n6L": 11,
  "n7L": 2
}, {
  "rootNoteLocation": 3,
  "mode": "HMAJ",
  "notesLocationList": [3, 5, 7, 8, 10, 11, 2],
  "orderedNotesLocationList": [2, 3, 5, 7, 8, 10, 11],
  "n2L": 5,
  "n3L": 7,
  "n4L": 8,
  "n5L": 10,
  "n6L": 11,
  "n7L": 2
}, {
  "rootNoteLocation": 3,
  "mode": "MMINASC",
  "notesLocationList": [3, 5, 6, 8, 10, 0, 2],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
  "n2L": 5,
  "n3L": 6,
  "n4L": 8,
  "n5L": 10,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 3,
  "mode": "MMAJDESC",
  "notesLocationList": [3, 5, 7, 8, 10, 11, 1],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
  "n2L": 5,
  "n3L": 7,
  "n4L": 8,
  "n5L": 10,
  "n6L": 11,
  "n7L": 1
}, {
  "rootNoteLocation": 4,
  "mode": "MAJ",
  "notesLocationList": [4, 6, 8, 9, 11, 1, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 6,
  "n3L": 8,
  "n4L": 9,
  "n5L": 11,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 4,
  "mode": "MIN",
  "notesLocationList": [4, 6, 7, 9, 11, 0, 2],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 6,
  "n3L": 7,
  "n4L": 9,
  "n5L": 11,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 4,
  "mode": "DOR",
  "notesLocationList": [4, 6, 7, 9, 11, 1, 2],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 6,
  "n3L": 7,
  "n4L": 9,
  "n5L": 11,
  "n6L": 1,
  "n7L": 2
}, {
  "rootNoteLocation": 4,
  "mode": "PHR",
  "notesLocationList": [4, 5, 7, 9, 11, 0, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 5,
  "n3L": 7,
  "n4L": 9,
  "n5L": 11,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 4,
  "mode": "LYD",
  "notesLocationList": [4, 6, 8, 10, 11, 1, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 6,
  "n3L": 8,
  "n4L": 10,
  "n5L": 11,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 4,
  "mode": "MLY",
  "notesLocationList": [4, 6, 8, 9, 11, 1, 2],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 6,
  "n3L": 8,
  "n4L": 9,
  "n5L": 11,
  "n6L": 1,
  "n7L": 2
}, {
  "rootNoteLocation": 4,
  "mode": "LOC",
  "notesLocationList": [4, 5, 7, 9, 10, 0, 2],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 5,
  "n3L": 7,
  "n4L": 9,
  "n5L": 10,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 4,
  "mode": "HMIN",
  "notesLocationList": [4, 6, 7, 9, 11, 0, 3],
  "orderedNotesLocationList": [0, 3, 4, 6, 7, 9, 11],
  "n2L": 6,
  "n3L": 7,
  "n4L": 9,
  "n5L": 11,
  "n6L": 0,
  "n7L": 3
}, {
  "rootNoteLocation": 4,
  "mode": "HMAJ",
  "notesLocationList": [4, 6, 8, 9, 11, 0, 3],
  "orderedNotesLocationList": [0, 3, 4, 6, 8, 9, 11],
  "n2L": 6,
  "n3L": 8,
  "n4L": 9,
  "n5L": 11,
  "n6L": 0,
  "n7L": 3
}, {
  "rootNoteLocation": 4,
  "mode": "MMINASC",
  "notesLocationList": [4, 6, 7, 9, 11, 1, 3],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
  "n2L": 6,
  "n3L": 7,
  "n4L": 9,
  "n5L": 11,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 4,
  "mode": "MMAJDESC",
  "notesLocationList": [4, 6, 8, 9, 11, 0, 2],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
  "n2L": 6,
  "n3L": 8,
  "n4L": 9,
  "n5L": 11,
  "n6L": 0,
  "n7L": 2
}, {
  "rootNoteLocation": 5,
  "mode": "MAJ",
  "notesLocationList": [5, 7, 9, 10, 0, 2, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 7,
  "n3L": 9,
  "n4L": 10,
  "n5L": 0,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 5,
  "mode": "MIN",
  "notesLocationList": [5, 7, 8, 10, 0, 1, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 7,
  "n3L": 8,
  "n4L": 10,
  "n5L": 0,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 5,
  "mode": "DOR",
  "notesLocationList": [5, 7, 8, 10, 0, 2, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 7,
  "n3L": 8,
  "n4L": 10,
  "n5L": 0,
  "n6L": 2,
  "n7L": 3
}, {
  "rootNoteLocation": 5,
  "mode": "PHR",
  "notesLocationList": [5, 6, 8, 10, 0, 1, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 6,
  "n3L": 8,
  "n4L": 10,
  "n5L": 0,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 5,
  "mode": "LYD",
  "notesLocationList": [5, 7, 9, 11, 0, 2, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 7,
  "n3L": 9,
  "n4L": 11,
  "n5L": 0,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 5,
  "mode": "MLY",
  "notesLocationList": [5, 7, 9, 10, 0, 2, 3],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 7,
  "n3L": 9,
  "n4L": 10,
  "n5L": 0,
  "n6L": 2,
  "n7L": 3
}, {
  "rootNoteLocation": 5,
  "mode": "LOC",
  "notesLocationList": [5, 6, 8, 10, 11, 1, 3],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 6,
  "n3L": 8,
  "n4L": 10,
  "n5L": 11,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 5,
  "mode": "HMIN",
  "notesLocationList": [5, 7, 8, 10, 0, 1, 4],
  "orderedNotesLocationList": [0, 1, 4, 5, 7, 8, 10],
  "n2L": 7,
  "n3L": 8,
  "n4L": 10,
  "n5L": 0,
  "n6L": 1,
  "n7L": 4
}, {
  "rootNoteLocation": 5,
  "mode": "HMAJ",
  "notesLocationList": [5, 7, 9, 10, 0, 1, 4],
  "orderedNotesLocationList": [0, 1, 4, 5, 7, 9, 10],
  "n2L": 7,
  "n3L": 9,
  "n4L": 10,
  "n5L": 0,
  "n6L": 1,
  "n7L": 4
}, {
  "rootNoteLocation": 5,
  "mode": "MMINASC",
  "notesLocationList": [5, 7, 8, 10, 0, 2, 4],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
  "n2L": 7,
  "n3L": 8,
  "n4L": 10,
  "n5L": 0,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 5,
  "mode": "MMAJDESC",
  "notesLocationList": [5, 7, 9, 10, 0, 1, 3],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
  "n2L": 7,
  "n3L": 9,
  "n4L": 10,
  "n5L": 0,
  "n6L": 1,
  "n7L": 3
}, {
  "rootNoteLocation": 6,
  "mode": "MAJ",
  "notesLocationList": [6, 8, 10, 11, 1, 3, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 8,
  "n3L": 10,
  "n4L": 11,
  "n5L": 1,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 6,
  "mode": "MIN",
  "notesLocationList": [6, 8, 9, 11, 1, 2, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 8,
  "n3L": 9,
  "n4L": 11,
  "n5L": 1,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 6,
  "mode": "DOR",
  "notesLocationList": [6, 8, 9, 11, 1, 3, 4],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 8,
  "n3L": 9,
  "n4L": 11,
  "n5L": 1,
  "n6L": 3,
  "n7L": 4
}, {
  "rootNoteLocation": 6,
  "mode": "PHR",
  "notesLocationList": [6, 7, 9, 11, 1, 2, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 7,
  "n3L": 9,
  "n4L": 11,
  "n5L": 1,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 6,
  "mode": "LYD",
  "notesLocationList": [6, 8, 10, 0, 1, 3, 5],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 8,
  "n3L": 10,
  "n4L": 0,
  "n5L": 1,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 6,
  "mode": "MLY",
  "notesLocationList": [6, 8, 10, 11, 1, 3, 4],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 8,
  "n3L": 10,
  "n4L": 11,
  "n5L": 1,
  "n6L": 3,
  "n7L": 4
}, {
  "rootNoteLocation": 6,
  "mode": "LOC",
  "notesLocationList": [6, 7, 9, 11, 0, 2, 4],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 7,
  "n3L": 9,
  "n4L": 11,
  "n5L": 0,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 6,
  "mode": "HMIN",
  "notesLocationList": [6, 8, 9, 11, 1, 2, 5],
  "orderedNotesLocationList": [1, 2, 5, 6, 8, 9, 11],
  "n2L": 8,
  "n3L": 9,
  "n4L": 11,
  "n5L": 1,
  "n6L": 2,
  "n7L": 5
}, {
  "rootNoteLocation": 6,
  "mode": "HMAJ",
  "notesLocationList": [6, 8, 10, 11, 1, 2, 5],
  "orderedNotesLocationList": [1, 2, 5, 6, 8, 10, 11],
  "n2L": 8,
  "n3L": 10,
  "n4L": 11,
  "n5L": 1,
  "n6L": 2,
  "n7L": 5
}, {
  "rootNoteLocation": 6,
  "mode": "MMINASC",
  "notesLocationList": [6, 8, 9, 11, 1, 3, 5],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
  "n2L": 8,
  "n3L": 9,
  "n4L": 11,
  "n5L": 1,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 6,
  "mode": "MMAJDESC",
  "notesLocationList": [6, 8, 10, 11, 1, 2, 4],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
  "n2L": 8,
  "n3L": 10,
  "n4L": 11,
  "n5L": 1,
  "n6L": 2,
  "n7L": 4
}, {
  "rootNoteLocation": 7,
  "mode": "MAJ",
  "notesLocationList": [7, 9, 11, 0, 2, 4, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 0,
  "n5L": 2,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 7,
  "mode": "MIN",
  "notesLocationList": [7, 9, 10, 0, 2, 3, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 9,
  "n3L": 10,
  "n4L": 0,
  "n5L": 2,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 7,
  "mode": "DOR",
  "notesLocationList": [7, 9, 10, 0, 2, 4, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 9,
  "n3L": 10,
  "n4L": 0,
  "n5L": 2,
  "n6L": 4,
  "n7L": 5
}, {
  "rootNoteLocation": 7,
  "mode": "PHR",
  "notesLocationList": [7, 8, 10, 0, 2, 3, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 8,
  "n3L": 10,
  "n4L": 0,
  "n5L": 2,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 7,
  "mode": "LYD",
  "notesLocationList": [7, 9, 11, 1, 2, 4, 6],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 1,
  "n5L": 2,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 7,
  "mode": "MLY",
  "notesLocationList": [7, 9, 11, 0, 2, 4, 5],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 0,
  "n5L": 2,
  "n6L": 4,
  "n7L": 5
}, {
  "rootNoteLocation": 7,
  "mode": "LOC",
  "notesLocationList": [7, 8, 10, 0, 1, 3, 5],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 8,
  "n3L": 10,
  "n4L": 0,
  "n5L": 1,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 7,
  "mode": "HMIN",
  "notesLocationList": [7, 9, 10, 0, 2, 3, 6],
  "orderedNotesLocationList": [0, 2, 3, 6, 7, 9, 10],
  "n2L": 9,
  "n3L": 10,
  "n4L": 0,
  "n5L": 2,
  "n6L": 3,
  "n7L": 6
}, {
  "rootNoteLocation": 7,
  "mode": "HMAJ",
  "notesLocationList": [7, 9, 11, 0, 2, 3, 6],
  "orderedNotesLocationList": [0, 2, 3, 6, 7, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 0,
  "n5L": 2,
  "n6L": 3,
  "n7L": 6
}, {
  "rootNoteLocation": 7,
  "mode": "MMINASC",
  "notesLocationList": [7, 9, 10, 0, 2, 4, 6],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
  "n2L": 9,
  "n3L": 10,
  "n4L": 0,
  "n5L": 2,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 7,
  "mode": "MMAJDESC",
  "notesLocationList": [7, 9, 11, 0, 2, 3, 5],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 0,
  "n5L": 2,
  "n6L": 3,
  "n7L": 5
}, {
  "rootNoteLocation": 8,
  "mode": "MAJ",
  "notesLocationList": [8, 10, 0, 1, 3, 5, 7],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 1,
  "n5L": 3,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 8,
  "mode": "MIN",
  "notesLocationList": [8, 10, 11, 1, 3, 4, 6],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 10,
  "n3L": 11,
  "n4L": 1,
  "n5L": 3,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 8,
  "mode": "DOR",
  "notesLocationList": [8, 10, 11, 1, 3, 5, 6],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 10,
  "n3L": 11,
  "n4L": 1,
  "n5L": 3,
  "n6L": 5,
  "n7L": 6
}, {
  "rootNoteLocation": 8,
  "mode": "PHR",
  "notesLocationList": [8, 9, 11, 1, 3, 4, 6],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 1,
  "n5L": 3,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 8,
  "mode": "LYD",
  "notesLocationList": [8, 10, 0, 2, 3, 5, 7],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 2,
  "n5L": 3,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 8,
  "mode": "MLY",
  "notesLocationList": [8, 10, 0, 1, 3, 5, 6],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 1,
  "n5L": 3,
  "n6L": 5,
  "n7L": 6
}, {
  "rootNoteLocation": 8,
  "mode": "LOC",
  "notesLocationList": [8, 9, 11, 1, 2, 4, 6],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 9,
  "n3L": 11,
  "n4L": 1,
  "n5L": 2,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 8,
  "mode": "HMIN",
  "notesLocationList": [8, 10, 11, 1, 3, 4, 7],
  "orderedNotesLocationList": [1, 3, 4, 7, 8, 10, 11],
  "n2L": 10,
  "n3L": 11,
  "n4L": 1,
  "n5L": 3,
  "n6L": 4,
  "n7L": 7
}, {
  "rootNoteLocation": 8,
  "mode": "HMAJ",
  "notesLocationList": [8, 10, 0, 1, 3, 4, 7],
  "orderedNotesLocationList": [0, 1, 3, 4, 7, 8, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 1,
  "n5L": 3,
  "n6L": 4,
  "n7L": 7
}, {
  "rootNoteLocation": 8,
  "mode": "MMINASC",
  "notesLocationList": [8, 10, 11, 1, 3, 5, 7],
  "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
  "n2L": 10,
  "n3L": 11,
  "n4L": 1,
  "n5L": 3,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 8,
  "mode": "MMAJDESC",
  "notesLocationList": [8, 10, 0, 1, 3, 4, 6],
  "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 1,
  "n5L": 3,
  "n6L": 4,
  "n7L": 6
}, {
  "rootNoteLocation": 9,
  "mode": "MAJ",
  "notesLocationList": [9, 11, 1, 2, 4, 6, 8],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 2,
  "n5L": 4,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 9,
  "mode": "MIN",
  "notesLocationList": [9, 11, 0, 2, 4, 5, 7],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 11,
  "n3L": 0,
  "n4L": 2,
  "n5L": 4,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 9,
  "mode": "DOR",
  "notesLocationList": [9, 11, 0, 2, 4, 6, 7],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 11,
  "n3L": 0,
  "n4L": 2,
  "n5L": 4,
  "n6L": 6,
  "n7L": 7
}, {
  "rootNoteLocation": 9,
  "mode": "PHR",
  "notesLocationList": [9, 10, 0, 2, 4, 5, 7],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 2,
  "n5L": 4,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 9,
  "mode": "LYD",
  "notesLocationList": [9, 11, 1, 3, 4, 6, 8],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 3,
  "n5L": 4,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 9,
  "mode": "MLY",
  "notesLocationList": [9, 11, 1, 2, 4, 6, 7],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 2,
  "n5L": 4,
  "n6L": 6,
  "n7L": 7
}, {
  "rootNoteLocation": 9,
  "mode": "LOC",
  "notesLocationList": [9, 10, 0, 2, 3, 5, 7],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 10,
  "n3L": 0,
  "n4L": 2,
  "n5L": 3,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 9,
  "mode": "HMIN",
  "notesLocationList": [9, 11, 0, 2, 4, 5, 8],
  "orderedNotesLocationList": [0, 2, 4, 5, 8, 9, 11],
  "n2L": 11,
  "n3L": 0,
  "n4L": 2,
  "n5L": 4,
  "n6L": 5,
  "n7L": 8
}, {
  "rootNoteLocation": 9,
  "mode": "HMAJ",
  "notesLocationList": [9, 11, 1, 2, 4, 5, 8],
  "orderedNotesLocationList": [1, 2, 4, 5, 8, 9, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 2,
  "n5L": 4,
  "n6L": 5,
  "n7L": 8
}, {
  "rootNoteLocation": 9,
  "mode": "MMINASC",
  "notesLocationList": [9, 11, 0, 2, 4, 6, 8],
  "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
  "n2L": 11,
  "n3L": 0,
  "n4L": 2,
  "n5L": 4,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 9,
  "mode": "MMAJDESC",
  "notesLocationList": [9, 11, 1, 2, 4, 5, 7],
  "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 2,
  "n5L": 4,
  "n6L": 5,
  "n7L": 7
}, {
  "rootNoteLocation": 10,
  "mode": "MAJ",
  "notesLocationList": [10, 0, 2, 3, 5, 7, 9],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
  "n2L": 0,
  "n3L": 2,
  "n4L": 3,
  "n5L": 5,
  "n6L": 7,
  "n7L": 9
}, {
  "rootNoteLocation": 10,
  "mode": "MIN",
  "notesLocationList": [10, 0, 1, 3, 5, 6, 8],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
  "n2L": 0,
  "n3L": 1,
  "n4L": 3,
  "n5L": 5,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 10,
  "mode": "DOR",
  "notesLocationList": [10, 0, 1, 3, 5, 7, 8],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
  "n2L": 0,
  "n3L": 1,
  "n4L": 3,
  "n5L": 5,
  "n6L": 7,
  "n7L": 8
}, {
  "rootNoteLocation": 10,
  "mode": "PHR",
  "notesLocationList": [10, 11, 1, 3, 5, 6, 8],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 3,
  "n5L": 5,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 10,
  "mode": "LYD",
  "notesLocationList": [10, 0, 2, 4, 5, 7, 9],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
  "n2L": 0,
  "n3L": 2,
  "n4L": 4,
  "n5L": 5,
  "n6L": 7,
  "n7L": 9
}, {
  "rootNoteLocation": 10,
  "mode": "MLY",
  "notesLocationList": [10, 0, 2, 3, 5, 7, 8],
  "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
  "n2L": 0,
  "n3L": 2,
  "n4L": 3,
  "n5L": 5,
  "n6L": 7,
  "n7L": 8
}, {
  "rootNoteLocation": 10,
  "mode": "LOC",
  "notesLocationList": [10, 11, 1, 3, 4, 6, 8],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 11,
  "n3L": 1,
  "n4L": 3,
  "n5L": 4,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 10,
  "mode": "HMIN",
  "notesLocationList": [10, 0, 1, 3, 5, 6, 9],
  "orderedNotesLocationList": [0, 1, 3, 5, 6, 9, 10],
  "n2L": 0,
  "n3L": 1,
  "n4L": 3,
  "n5L": 5,
  "n6L": 6,
  "n7L": 9
}, {
  "rootNoteLocation": 10,
  "mode": "HMAJ",
  "notesLocationList": [10, 0, 2, 3, 5, 6, 9],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 9, 10],
  "n2L": 0,
  "n3L": 2,
  "n4L": 3,
  "n5L": 5,
  "n6L": 6,
  "n7L": 9
}, {
  "rootNoteLocation": 10,
  "mode": "MMINASC",
  "notesLocationList": [10, 0, 1, 3, 5, 7, 9],
  "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
  "n2L": 0,
  "n3L": 1,
  "n4L": 3,
  "n5L": 5,
  "n6L": 7,
  "n7L": 9
}, {
  "rootNoteLocation": 10,
  "mode": "MMAJDESC",
  "notesLocationList": [10, 0, 2, 3, 5, 6, 8],
  "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
  "n2L": 0,
  "n3L": 2,
  "n4L": 3,
  "n5L": 5,
  "n6L": 6,
  "n7L": 8
}, {
  "rootNoteLocation": 11,
  "mode": "MAJ",
  "notesLocationList": [11, 1, 3, 4, 6, 8, 10],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
  "n2L": 1,
  "n3L": 3,
  "n4L": 4,
  "n5L": 6,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 11,
  "mode": "MIN",
  "notesLocationList": [11, 1, 2, 4, 6, 7, 9],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
  "n2L": 1,
  "n3L": 2,
  "n4L": 4,
  "n5L": 6,
  "n6L": 7,
  "n7L": 9
}, {
  "rootNoteLocation": 11,
  "mode": "DOR",
  "notesLocationList": [11, 1, 2, 4, 6, 8, 9],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
  "n2L": 1,
  "n3L": 2,
  "n4L": 4,
  "n5L": 6,
  "n6L": 8,
  "n7L": 9
}, {
  "rootNoteLocation": 11,
  "mode": "PHR",
  "notesLocationList": [11, 0, 2, 4, 6, 7, 9],
  "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
  "n2L": 0,
  "n3L": 2,
  "n4L": 4,
  "n5L": 6,
  "n6L": 7,
  "n7L": 9
}, {
  "rootNoteLocation": 11,
  "mode": "LYD",
  "notesLocationList": [11, 1, 3, 5, 6, 8, 10],
  "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
  "n2L": 1,
  "n3L": 3,
  "n4L": 5,
  "n5L": 6,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 11,
  "mode": "MLY",
  "notesLocationList": [11, 1, 3, 4, 6, 8, 9],
  "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
  "n2L": 1,
  "n3L": 3,
  "n4L": 4,
  "n5L": 6,
  "n6L": 8,
  "n7L": 9
}, {
  "rootNoteLocation": 11,
  "mode": "LOC",
  "notesLocationList": [11, 0, 2, 4, 5, 7, 9],
  "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
  "n2L": 0,
  "n3L": 2,
  "n4L": 4,
  "n5L": 5,
  "n6L": 7,
  "n7L": 9
}, {
  "rootNoteLocation": 11,
  "mode": "HMIN",
  "notesLocationList": [11, 1, 2, 4, 6, 7, 10],
  "orderedNotesLocationList": [1, 2, 4, 6, 7, 10, 11],
  "n2L": 1,
  "n3L": 2,
  "n4L": 4,
  "n5L": 6,
  "n6L": 7,
  "n7L": 10
}, {
  "rootNoteLocation": 11,
  "mode": "HMAJ",
  "notesLocationList": [11, 1, 3, 4, 6, 7, 10],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 10, 11],
  "n2L": 1,
  "n3L": 3,
  "n4L": 4,
  "n5L": 6,
  "n6L": 7,
  "n7L": 10
}, {
  "rootNoteLocation": 11,
  "mode": "MMINASC",
  "notesLocationList": [11, 1, 2, 4, 6, 8, 10],
  "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
  "n2L": 1,
  "n3L": 2,
  "n4L": 4,
  "n5L": 6,
  "n6L": 8,
  "n7L": 10
}, {
  "rootNoteLocation": 11,
  "mode": "MMAJDESC",
  "notesLocationList": [11, 1, 3, 4, 6, 7, 9],
  "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
  "n2L": 1,
  "n3L": 3,
  "n4L": 4,
  "n5L": 6,
  "n6L": 7,
  "n7L": 9
}];
var findScale_default = findScale;

// src/find/findChordInScale.ts
var findChordInScale = (locationListOfChord, limitMode) => {
  let findScaleHandle = collect14(findScale_default).filter((x) => {
    return intersection2(x.notesLocationList, locationListOfChord).length === locationListOfChord.length;
  });
  if (isString3(limitMode)) {
    findScaleHandle = findScaleHandle.filter((x) => {
      return x.mode === limitMode;
    });
  } else if (isArray3(limitMode)) {
    findScaleHandle = findScaleHandle.filter((x) => {
      return limitMode.includes(x.mode);
    });
  }
  const findScaleObj = findScaleHandle.all();
  if (isEmpty9(findScaleObj)) return [];
  return findScaleObj;
};
var findChordInScale_default = findChordInScale;

// src/chord/methods/getChordSymbolByKey.ts
import collect15 from "collect.js";
var getChordSymbolByKey = (k) => {
  return collect15(chordMeta_default).where("chordKey", k).first().scoreDisplay;
};
var getChordSymbolByKey_default = getChordSymbolByKey;

// src/chord/methods/getChordCnNameByKey.ts
import collect16 from "collect.js";
var getChordCnNameByKey = (k) => {
  return collect16(chordMeta_default).where("chordKey", k).first().cnName;
};
var getChordCnNameByKey_default = getChordCnNameByKey;

// src/chord/methods/getChordTransformByLocationList.ts
import { intersection as intersection3, isNumber as isNumber8, keys as keys9 } from "lodash";
var getChordTransformByLocationList = (originChordInfo, chordNotesLocationList) => {
  const adjustObj = {
    omit: [],
    min: [],
    maj: [],
    p: [],
    dim: [],
    aug: []
  };
  const standardChordNotesLocationList = keys9(originChordInfo).map((x) => originChordInfo[x]).filter((x) => x !== -1);
  const intersectionList = intersection3(standardChordNotesLocationList, chordNotesLocationList);
  const standardAfterSubtract = standardChordNotesLocationList.filter((item) => !intersectionList.includes(item));
  const givenLocationAfterSubtract = chordNotesLocationList.filter((item) => !intersectionList.includes(item));
  if (isNumber8(originChordInfo.n3L) && originChordInfo.n3L >= 0) {
    if (standardAfterSubtract.includes(originChordInfo.n3L)) {
      adjustObj.omit.push(3);
    }
  }
  if (isNumber8(originChordInfo.n5L) && originChordInfo.n5L >= 0) {
    if (standardAfterSubtract.includes(originChordInfo.n5L)) {
      adjustObj.omit.push(5);
    }
  }
  if (isNumber8(originChordInfo.n7L) && originChordInfo.n7L >= 0) {
    if (standardAfterSubtract.includes(originChordInfo.n7L)) {
      adjustObj.omit.push(7);
    }
  }
  if (isNumber8(originChordInfo.n9L) && originChordInfo.n9L >= 0) {
    if (standardAfterSubtract.includes(originChordInfo.n9L)) {
      adjustObj.omit.push(9);
    }
  }
  if (isNumber8(originChordInfo.n11L) && originChordInfo.n11L >= 0) {
    if (standardAfterSubtract.includes(originChordInfo.n11L)) {
      adjustObj.omit.push(11);
    }
  }
  if (isNumber8(originChordInfo.n13L) && originChordInfo.n13L >= 0) {
    if (standardAfterSubtract.includes(originChordInfo.n13L)) {
      adjustObj.omit.push(13);
    }
  }
  if (givenLocationAfterSubtract.length === 0) return adjustObj;
  for (let i of givenLocationAfterSubtract) {
    const numberGapWithRoot = getUpwardLocationGap(originChordInfo.rootNoteLocation, i);
    if (numberGapWithRoot === 1) {
      adjustObj.min.push(2);
    } else if (numberGapWithRoot === 2) {
      adjustObj.maj.push(2);
    } else if (numberGapWithRoot === 3) {
      adjustObj.min.push(3);
    } else if (numberGapWithRoot === 4) {
      adjustObj.maj.push(3);
    } else if (numberGapWithRoot === 5) {
      adjustObj.p.push(4);
    } else if (numberGapWithRoot === 6) {
      adjustObj.aug.push(4);
    } else if (numberGapWithRoot === 7) {
      adjustObj.p.push(5);
    } else if (numberGapWithRoot === 8) {
      adjustObj.min.push(6);
    } else if (numberGapWithRoot === 9) {
      adjustObj.maj.push(6);
    } else if (numberGapWithRoot === 10) {
      adjustObj.min.push(7);
    } else if (numberGapWithRoot === 11) {
      adjustObj.maj.push(7);
    }
  }
  return adjustObj;
};
var getChordTransformByLocationList_default = getChordTransformByLocationList;

// src/find/findNotesInChord.ts
import collect17 from "collect.js";
import { isEmpty as isEmpty10 } from "lodash";
var findNotesInChord = (notesList) => {
  let findHandle = collect17(findChordMeta_default);
  for (const x of notesList) {
    if ([2, 9].includes(x.as)) {
      findHandle = findHandle.where("n9L", x.location);
    } else if ([3, 10].includes(x.as)) {
      findHandle = findHandle.where("n3L", x.location);
    } else if ([4, 11].includes(x.as)) {
      findHandle = findHandle.where("n11L", x.location);
    } else if ([5, 12].includes(x.as)) {
      findHandle = findHandle.where("n5L", x.location);
    } else if ([6, 13].includes(x.as)) {
      findHandle = findHandle.where("n13L", x.location);
    } else if ([6, 13].includes(x.as)) {
      findHandle = findHandle.where("n13L", x.location);
    } else if ([7, 14].includes(x.as)) {
      findHandle = findHandle.where("n7L", x.location);
    } else if ([8, 1].includes(x.as)) {
      findHandle = findHandle.where("rootNoteLocation", x.location);
    }
  }
  const findObj = findHandle.all();
  if (isEmpty10(findObj)) return [];
  return findObj;
};
var findNotesInChord_default = findNotesInChord;

// src/chord/index.ts
var chord_default = {
  Chord,
  chordMeta: chordMeta_default,
  findChord: findChord_default,
  findChordInScale: findChordInScale_default,
  getChordSymbolByKey: getChordSymbolByKey_default,
  getChordCnNameByKey: getChordCnNameByKey_default,
  findNotesInChord: findNotesInChord_default,
  getChordTransformByLocationList: getChordTransformByLocationList_default
};

// src/find/findNotesInScale.ts
import collect18 from "collect.js";
import { isEmpty as isEmpty11 } from "lodash";
var findNotesInScale = (notesList) => {
  let findHandle = collect18(findScale_default);
  for (const x of notesList) {
    if ([0, 1, 8].includes(x.as)) {
      findHandle = findHandle.where("rootNoteLocation", x.location);
    } else if ([2, 9].includes(x.as)) {
      findHandle = findHandle.where("n2L", x.location);
    } else if ([3, 10].includes(x.as)) {
      findHandle = findHandle.where("n3L", x.location);
    } else if ([4, 11].includes(x.as)) {
      findHandle = findHandle.where("n4L", x.location);
    } else if ([5, 12].includes(x.as)) {
      findHandle = findHandle.where("n5L", x.location);
    } else if ([6, 13].includes(x.as)) {
      findHandle = findHandle.where("n6L", x.location);
    } else if ([7, 14].includes(x.as)) {
      findHandle = findHandle.where("n7L", x.location);
    }
  }
  const findObj = findHandle.all();
  if (isEmpty11(findObj)) return [];
  return findObj;
};
var findNotesInScale_default = findNotesInScale;

// src/find/findComplexChordByMidi.ts
import { intersection as intersection4, isArray as isArray4, isNull as isNull6, isUndefined as isUndefined9, orderBy, sortBy, uniq } from "lodash";
import collect19 from "collect.js";
var findComplexChordByMidi = (midiPitchList) => {
  const locationList = sortBy(uniq(midiPitchList.map((x) => new Base12Radix(x).lastDigit)));
  const findResult = collect19(findChordMeta_default).where("orderedNotesLocationList", "!==", locationList).filter((x) => {
    if (!locationList.includes(x.rootNoteLocation)) return false;
    if (x.chordKey.includes("7")) {
      if (!locationList.includes(x.n7L)) return false;
    }
    if (x.chordKey.includes("13") || x.chordKey.includes("add6")) {
      if (!locationList.includes(x.n13L)) return false;
    }
    if (x.chordKey.includes("#5") || x.chordKey.includes("b5")) {
      if (!locationList.includes(x.n5L)) return false;
    }
    if (x.chordKey.includes("sus2") || x.chordKey.includes("9")) {
      if (!locationList.includes(x.n9L)) return false;
    }
    if (x.chordKey.includes("sus4") || x.chordKey.includes("11")) {
      if (!locationList.includes(x.n11L)) return false;
    }
    if (x.chordKey.includes("7")) {
      if (!(locationList.includes(x.n7L) && locationList.includes(x.n3L))) return false;
    }
    if (x.chordKey.includes("maj3") || x.chordKey.includes("aug3") || x.chordKey.includes("min3") || x.chordKey.includes("dim3")) {
      if (!locationList.includes(x.n3L)) return false;
    }
    if (x.chordKey.includes("dom9") || x.chordKey.includes("dom11") || x.chordKey.includes("dom13")) {
      if (!(locationList.includes(x.n7L) && locationList.includes(x.n3L))) return false;
    }
    if (x.chordKey.includes("augmaj")) {
      if (!(locationList.includes(x.n3L) && locationList.includes(x.n5L) && locationList.includes(x.n7L))) return false;
    }
    if (x.chordKey.includes("minmaj")) {
      if (!(locationList.includes(x.n3L) && locationList.includes(x.n7L))) return false;
    }
    return intersection4(x.orderedNotesLocationList, locationList).length > 2;
  });
  if (isUndefined9(findResult) || isNull6(findResult) || isArray4(findResult) && findResult.length === 0) {
    return [];
  }
  const originMapList = findResult.all().map((x) => {
    const likely = jaccard(x.orderedNotesLocationList, locationList);
    return {
      ...x,
      likely: Number(likely.toFixed(4))
    };
  });
  return orderBy(originMapList, "likely", "desc");
};
var findComplexChordByMidi_default = findComplexChordByMidi;
var jaccard = (a, b) => {
  const intersectionLength = intersection4(a, b).length;
  return intersectionLength / (a.length + b.length - intersectionLength);
};

// src/find/index.ts
var find_default = {
  findChord: findChord_default,
  findNotesInChord: findNotesInChord_default,
  findNotesInScale: findNotesInScale_default,
  findComplexChordByMidi: findComplexChordByMidi_default
};
export {
  radix_exports as Radix,
  chord_default as chord,
  circleOfFifths_exports as circleOfFifths,
  factory_exports as factory,
  find_default as find,
  interval_exports as interval,
  note_exports as note,
  scale_default as scale,
  stave_exports as stave
};
