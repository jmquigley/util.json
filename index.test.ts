"use strict";

require("./index.umd.min.js");
import {decycle, retrocycle} from "./index.umd.min.js";

function buildTestObject() {
	const i = {a: "x", ref: null};
	const j = {b: "y", ref: null};
	const k = {c: "z", ref: null};
	i.ref = j;
	j.ref = k;
	k.ref = i;

	return i;
}

function confirmTestOutput(obj: any) {
	expect(obj).toBeDefined();
	expect(obj).toHaveProperty("a");
	expect(obj["ref"]).toHaveProperty("b");
	expect(obj["ref"]["ref"]).toHaveProperty("c");
	expect(obj["ref"]["ref"]["ref"]).toHaveProperty("a");
}

test("Use the monkey patched decycle/retrocycle functions on an object", () => {
	let obj = buildTestObject();
	expect(obj).toBeDefined();

	let s: string = JSON.stringify(JSON.decycle(obj));
	expect(s).toBeDefined();
	expect(s).toBe(
		'{"a":"x","ref":{"b":"y","ref":{"c":"z","ref":{"$ref":"$"}}}}'
	);

	obj = JSON.retrocycle(JSON.parse(s));
	confirmTestOutput(obj);
});

test("Use the decycle/retrocycle functions directly", () => {
	let obj = buildTestObject();
	expect(obj).toBeDefined();

	let s: string = JSON.stringify(decycle(obj));
	expect(s).toBeDefined();
	expect(s).toBe(
		'{"a":"x","ref":{"b":"y","ref":{"c":"z","ref":{"$ref":"$"}}}}'
	);

	obj = retrocycle(JSON.parse(s));
	confirmTestOutput(obj);
});
