import { Controller, Get } from '@nestjs/common';
import { Public } from './guards/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('health')
  getHello(): object {
    const uptime = process.uptime();
    const { heapTotal, heapUsed } = process.memoryUsage();
    return {
      uptime: `${uptime} sec`,
      heapTotal: `${heapTotal} bytes`,
      heapUsed: `${heapUsed} bytes`,
    };
  }
}
