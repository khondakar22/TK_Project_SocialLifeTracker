import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';


import { TabsPage } from '../pages/tabs/tabs';
import { UsertabsPage } from '../pages/usertabs/usertabs';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen'
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { SignupAndSigninPage } from '../pages/signup-and-signin/signup-and-signin';
import { FeaturesPage } from '../pages/features/features';
import { LocationProvider } from '../providers/location/location';
import { FacebookProvider } from '../providers/facebook/facebook';
import { Facebook } from '@ionic-native/facebook';
import { PlaceServiceProvider } from '../providers/place-service/place-service';
import { ImageUploadProvider } from '../providers/image-upload/image-upload';
import { SetActivitiesProvider } from '../providers/set-activities/set-activities';
import { ActivityRecordsProvider } from '../providers/activity-records/activity-records';
import { TimelineProvider } from '../providers/timeline/timeline';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    SignupAndSigninPage,
    UsertabsPage,
    FeaturesPage,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    SignupAndSigninPage,
    UsertabsPage,
    FeaturesPage,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserSettingsProvider,
    LocationProvider,
    FacebookProvider,
    Facebook,
    File,
    Camera,
    FileTransfer,
    PlaceServiceProvider,
    ImageUploadProvider,
    SetActivitiesProvider,
    ActivityRecordsProvider,
    TimelineProvider
  ]
})
export class AppModule {}
