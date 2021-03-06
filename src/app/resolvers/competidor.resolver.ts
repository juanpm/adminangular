import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { CompetidorequipoService } from '../services/competidorequipo/competidorequipo.service';
import { mergeMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CompetidorResolver implements Resolve<any> {
  constructor(private router : Router, 
    private competidorequipoService : CompetidorequipoService){
  }
  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) : Observable<any> {
      let id = parseInt(route.paramMap.get("id"));

      return this.competidorequipoService
        .show(id)
        .pipe(take(1), 
          mergeMap(crisis => {
            if ( crisis["status"] ) {
              return of(crisis["object"]);
            } else {
              this.router.navigate(["/"]);
            }
          }));
    }
}