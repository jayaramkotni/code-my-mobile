import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { HttpClientService } from './http-client.service';
import { BehaviorSubject } from 'rxjs';
import { APIUrlConstants } from '../../../api-url-constants';

@Injectable()
export class ProjectContextService {
    userContext$: BehaviorSubject<any>;
    userDataSource$: BehaviorSubject<Array<any>>;

    constructor(private httpClientService: HttpClientService) { };

    initProjectContext(callback: () => void): void {
        this.userContext$ = new BehaviorSubject({});
        this.userDataSource$ = new BehaviorSubject([]);

        this.getUserDataSource((users) => {
            let { data }: any = users;
            if (data && Array.isArray(data.rows)) {
                this.userDataSource$.next(data.rows);
            }
            callback();
        });

    }

    getUserDataSource(callback) {
        const userContextUrl = APIUrlConstants.getAllUsersApI;

        this.httpClientService.getByObservable(userContextUrl).subscribe(
            users => {
                callback(users);
            },
            error => {
                callback([])
            }
        );
    }
}
