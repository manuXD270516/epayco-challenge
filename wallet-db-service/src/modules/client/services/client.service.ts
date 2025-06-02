// src/modules/client/services/client.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateClientDto) {
    const exists = await this.clientRepo.findOne({
      where: { document: dto.document },
    });

    if (exists) {
      return { code: 'ERROR', message: 'Cliente ya existe' };
    }

    const client = this.clientRepo.create(dto);
    await this.clientRepo.save(client);
    return { code: 'SUCCESS', message: 'Cliente registrado correctamente' };
  }
}
