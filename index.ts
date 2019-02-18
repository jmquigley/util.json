"use strict";

require("./src/cycle.min.js");

export interface JSON {
	decycle(object: any, replacer: any): any;
	retrocycle($: any): any;
}
