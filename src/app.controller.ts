import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

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
