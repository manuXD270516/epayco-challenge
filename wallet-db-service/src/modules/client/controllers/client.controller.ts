import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientService } from '../services/client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }
}
