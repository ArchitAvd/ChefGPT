import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('api/health')
export class HealthController {
  constructor() {}

  @Get()
  healthCheck(@Res() res: Response) {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' });
  }
}
