import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkflowExportService } from './workflow-export/workflow-export.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly workflowExportService: WorkflowExportService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('export')
  exportWorkflow() {
    return this.workflowExportService.simulateLongRunningJob({ id: '123' });
  }

  @Get('job/:jobId')
  getJob(@Param('jobId') jobId: string) {
    return this.workflowExportService.getJob(jobId);
  }

  @Get('job/:jobId/state')
  getJobState(@Param('jobId') jobId: string) {
    return this.workflowExportService.getJobState(jobId);
  }
}
