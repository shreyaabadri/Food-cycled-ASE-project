import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { UserData } from '../providers/user-data';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ContactusPage } from '../pages/contactus/contactus';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { LocationsPage } from '../pages/locations/locations';
import { VolunPage } from '../pages/volun/volun';
import { VolunLoginPage } from '../pages/volun-login/volun-login';
import { VolunRegisterPage } from '../pages/volun-register/volun-register';
import { UserMainPage } from '../pages/user-main/user-main';
import { VolunMainPage } from '../pages/volun-main/volun-main';
import { SplashPage } from '../pages/splash/splash';
import { FinalPage } from '../pages/final/final';

export interface PageInterface {
  title: string;
  component: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = VolunMainPage;

  login_pages: Array<{title: string, component: any}>;
  logout_pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
   psplashScreen: SplashScreen, public userData: UserData, public storage: Storage,
    modalCtrl: ModalController, public menu: MenuController, public events: Events) {
    
   // this.enableMenu(true);
    // used for an example of ngFor and navigation
    this.login_pages = [
      { title: 'About Us', component: AboutusPage },
      { title: 'Food', component: UserMainPage },
      { title: 'Stall Locations', component: LocationsPage },
      { title: 'Volunteer', component: VolunMainPage },
      { title: 'Contact Us', component: ContactusPage },
      { title: 'Logout', component: LoginPage }
    ];
    this.logout_pages = [
      { title: 'About Us', component: AboutusPage },
      { title: 'Log In', component: LoginPage },
      { title: 'Food', component: UserMainPage },
      { title: 'Register', component: RegisterPage }, 
      { title: 'Stall Locations', component: LocationsPage },
      { title: 'Volunteer', component: VolunMainPage },
      { title: 'Contact Us', component: ContactusPage },
    ];

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
    });

    // this.userData.hasLoggedIn().then((hasLoggedIn) => {
    //   this.enableMenu(hasLoggedIn === true);
    // });
    this.userData.hasLoggedIn2().then((hasLoggedIn) => {
        this.enableMenu(hasLoggedIn === true);
      });
    this.listenToLoginEvents();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.nav.goToRoot(HomePage);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.nav.goToRoot(HomePage);
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Logout') 
    {
      this.userData.logout();
    } else {
      this.nav.setRoot(page.component);
      this.userData
      }
    // this.enableMenu(true);
  };

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}