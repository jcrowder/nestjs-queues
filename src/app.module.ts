import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowExportModule } from './workflow-export/workflow-export.module';
import { BullModule } from '@nestjs/bullmq';
@Module({
  imports: [BullModule.forRoot({ 
    connection: {
      host: 'localhost',
      port: 6379,
    },
  }), WorkflowExportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
