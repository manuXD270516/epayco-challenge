import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private readonly BASE_URL = process.env.DB_SERVICE_URL || 'http://wallet-db:3000';

  constructor(private readonly http: HttpService) {}

  async forwardPost(path: string, data: any) {
    const response$ = this.http.post(`${this.BASE_URL}${path}`, data);
    const { data: response } = await firstValueFrom(response$);
    return response;
  }
}
