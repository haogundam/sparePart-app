import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  console.log('Auth interceptor called');
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  });
  return next(authReq);
};
