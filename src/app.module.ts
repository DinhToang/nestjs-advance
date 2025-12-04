import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { AudioModule } from './audio/audio.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis:{
        host: 'localhost',
        port: 6379
      }
    }),
    AudioModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
