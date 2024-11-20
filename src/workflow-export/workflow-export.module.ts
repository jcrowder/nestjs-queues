// src/workflow-export/workflow-export.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowExportService } from './workflow-export.service';
import { WorkflowExportProcessor } from './workflow-export.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'export-queue',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
      settings: {
        
      }
    }),
  ],
  providers: [WorkflowExportService, WorkflowExportProcessor],
  exports: [WorkflowExportService],
})
export class WorkflowExportModule {}