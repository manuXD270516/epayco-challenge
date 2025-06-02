import { Controller, Post, Body } from '@nestjs/common';
import { ProxyService } from '../services/proxy.service';
import { CreateClientDto } from '../common/dtos';

@Controller('clients')
export class ClientController {
  constructor(private readonly proxy: ProxyService) {}

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.proxy.forwardPost('/clients', dto);
  }
}
