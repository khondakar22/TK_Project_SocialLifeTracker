import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRecordsPage } from './activity-records';

@NgModule({
  declarations: [
    ActivityRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityRecordsPage),
  ],
})
export class ActivityRecordsPageModule {}
