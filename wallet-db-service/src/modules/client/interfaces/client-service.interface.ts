// src/modules/client/interfaces/client-service.interface.ts
import { CreateClientDto } from '../dto/create-client.dto';

export interface IClientService {
  create(dto: CreateClientDto): Promise<{ code: string; message: string }>;
}
