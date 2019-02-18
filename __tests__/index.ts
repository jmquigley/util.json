"use strict";

require("../index");

test("Test printing a cyclical object", () => {
	const i = {a: "x", ref: null};
	const j = {b: "y", ref: null};
	const k = {c: "z", ref: null};
	i.ref = j;
	j.ref = k;
	k.ref = i;

	let s: string = JSON.stringify(JSON.decycle(i));
	expect(s).toBeDefined();
	expect(s).toBe(
		'{"a":"x","ref":{"b":"y","ref":{"c":"z","ref":{"$ref":"$"}}}}'
	);

	let obj = JSON.retrocycle(JSON.parse(s));

	expect(obj).toBeDefined();
	expect(obj).toHaveProperty("a");
	expect(obj["ref"]).toHaveProperty("b");
	expect(obj["ref"]["ref"]).toHaveProperty("c");
	expect(obj["ref"]["ref"]["ref"]).toHaveProperty("a");
});
