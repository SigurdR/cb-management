import {Response} from "@angular/http";

export function ExtractData(res: Response): any {
	let body = res.json();
	return body  && body.data ? body.data: {};
}

export function ExtractBody(res: Response): any {
	let body = res.json();
	if (body) {
		return body.data || body;
	 } else {
		return {};
	 }
}

export function HandleError(error: any): Promise<any>{
	console.log(error);
	return Promise.reject(error);
}