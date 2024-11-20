import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class WorkflowExportService {
  private readonly logger = new Logger(WorkflowExportService.name);

  constructor(@InjectQueue('export-queue') private readonly queue: Queue) {}

  async simulateLongRunningJob(data: any) {
    // Add a job to the queue
    const job = await this.queue.add('export-job', data);
    this.logger.log(`Added job to queue: ${JSON.stringify(data)} jobId: ${job.id}`);
    return job;
  }

  async getJob(jobId: string) {
    const job = await this.queue.getJob(jobId);
    this.logger.log(`Job details: ${JSON.stringify(job)}`);
    return job;
  }

  async getJobState(jobId: string) {
    const jobState = await this.queue.getJobState(jobId);
    this.logger.log(`Job state: ${jobState}`);
    return jobState;
  }
 
}
