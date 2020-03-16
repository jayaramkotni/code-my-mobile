import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// import 'rxjs/add/observable/fromPromise';
// // Statics
// import 'rxjs/add/observable/throw';
// // Operators
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';


// import * as lodash from 'lodash';

@Injectable()
export class HttpClientService {

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	constructor(private http: HttpClient) { }
	/**
	 * Function to parse response from HTTP request.
	 * If parsed response has key 'data', then that value is returned.
	 * Expected format of response is JSON,
	 * if it is not then the actual response is returned.
	 */
	private handleResponse(response: any): any {
		let res: any;
		try {
			let dataKey: string = 'data';
			res = response.json(); // store intial JSON response in res.
			if (dataKey in res) { // check if response body has dataKey.
				res = res[dataKey]; // assign dataKey value to res.
			}
		} catch (exception) {
			res = response;
		} finally {
			return res;
		}
	}

	private handleObservableError(error: any): Observable<any> {
		let err: any;
		try {
			err = error.json();
		} catch (exception) {
			err = error;
		} finally {
			return Observable.throw(err);
		}
	}

	getByObservable(url: string): Observable<any> {
		return this.http.get(url, this.httpOptions)
			.pipe(map(this.handleResponse), catchError(this.handleObservableError));

	}
}
