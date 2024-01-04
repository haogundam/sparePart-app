import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        console.log(req);
        console.log('Noop interceptor called');

        if (req.url.includes('login') || req.url.includes('register')) {
            console.log('login called');
            console.log(req);
            return next.handle(req);

        }
       
        const authReq = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        });
        console.log(authReq);
        return next.handle(authReq);


    }
}