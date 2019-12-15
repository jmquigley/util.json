import {decycle, retrocycle} from "./src/cycle.min.js";

export interface JSON {
	decycle(object: any, replacer?: any): any;
	retrocycle($: any): any;
}

(JSON as any).decycle = decycle;
(JSON as any).retrocycle = retrocycle;

export {decycle, retrocycle};
