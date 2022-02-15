import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '@npt/npt-template';
import { WorkstationService } from '../service/workstation.service';


@Injectable({
  providedIn: 'root'
})
export class WorkStationGuard implements CanActivate {
  constructor(
    private router: Router,
    private workStationService: WorkstationService,
    private sessionService: SessionService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const fingerId = localStorage.getItem('fingerId');
    const guId = localStorage.getItem('guId');
    let guard = false;
    if (guId) {
      guard = true;
    } else if (fingerId) {
      this.workStationService.getWorkstation(fingerId).subscribe(
        data => {
          if (data) {
            guard = true;
            this.sessionService.setSessionLocal('guId', data.id);
          } else {
            guard = false;
          }
        },
        () => {
          guard = false;
        }
      );
    }
    if (!guard) {
      this.router.navigate(['workstation-notfound']);
    }
    return guard;
  }
}
