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
    let guard: boolean;
    if (guId) { // se il guId è presente non chiama l'api
      guard = true;
    } else {
      if (fingerId) { // se è presente solo il finger chiama l'api
        try {
          const workstation = await this.workStationService.getWorkstation(fingerId).toPromise();
          if (workstation) {
            guard = true;
            this.sessionService.setSessionLocal('guId', workstation.id);
          }
        } catch (error) { // se l'api fallisce invalida la guardia
          guard = false;
          this.router.navigate(['workstation-notfound']);
        }
      }
      else { // se non è presente il fingerId non chiama l'api e invalida la guardia
        guard = false;
        this.router.navigate(['workstation-notfound']);
      }
    }
    return guard;
  }

}
