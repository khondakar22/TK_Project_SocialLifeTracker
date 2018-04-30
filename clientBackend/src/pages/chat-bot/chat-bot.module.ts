import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatBotPage } from './chat-bot';

@NgModule({
  declarations: [
    ChatBotPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatBotPage),
  ],
})
export class ChatBotPageModule {}
