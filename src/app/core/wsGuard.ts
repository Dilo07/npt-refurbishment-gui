import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '@npt/npt-template';
import { WorkstationService } from '../service/workstation.service';


@Injectable({
  providedIn: 'root'
})
export class WorkStationGuard implements CanActivate {
  private guard = true;
  constructor(
    private router: Router,
    private workStationService: WorkstationService,
    private sessionService: SessionService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const fingerId = localStorage.getItem('fingerId');
    const guId = localStorage.getItem('guId');
    if (guId) {
      this.guard = true;
    } else {
      this.workStationService.getWorkstation(fingerId).subscribe(
        data => {
          if (data) {
            this.guard = true;
            this.sessionService.setSessionLocal('guId', data.id);
          } else {
            this.router.navigate(['workstation-notfound']);
            this.guard = false;
          }
        },
        () => {
          this.router.navigate(['workstation-notfound']);
          this.guard = false;
        }
      );
    }
    return this.guard;
  }
}
