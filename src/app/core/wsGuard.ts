import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { WorkstationService } from '../service/workstation.service';


@Injectable({
  providedIn: 'root'
})
export class WorkStationGuard implements CanActivate {
  private guard = true;
  constructor(
    private router: Router,
    private workStationService: WorkstationService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const guid = localStorage.getItem('guid');
    this.workStationService.getWorkstation(guid).subscribe(
      data => {
        if (data) {
          this.guard = true;
        }else {
          this.router.navigate(['workstation-notfound']);
          this.guard = false;
        }
      }
    );
    return this.guard;
  }
}
