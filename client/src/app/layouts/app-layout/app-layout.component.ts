import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/user/user-store.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  constructor(
    private userStore: UserStoreService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  userLogin: boolean;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnInit(): void {
    this.userLogin = this.userStore.isLogin();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout() {
    this.userStore.deleteUserData();
    this.userLogin = false;

    this.router.navigate(['home']);
  }

}
