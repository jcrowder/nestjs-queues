import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('export-queue', { concurrency: 3 })
export class WorkflowExportProcessor extends WorkerHost {
    private readonly logger = new Logger(WorkflowExportProcessor.name);

    async process(job: Job<any, any, string>): Promise<any> {
        let progress = 0;
        for (let i = 1; i <= 100; i++) {
            progress += 1;
            this.logger.log(`Processing job ${job.id} - ${progress}%`);
            await job.updateProgress(progress);
            await this.sleep(80);
        }
        return {};
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}