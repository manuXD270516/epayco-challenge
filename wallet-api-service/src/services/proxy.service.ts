import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ProxyService {
  private readonly BASE_URL: string;

  constructor(private readonly http: HttpService) {
    const isDocker = process.env.APP_ENV === 'docker';
    this.BASE_URL = isDocker
      ? process.env.DB_SERVICE_URL_DOCKER!
      : process.env.DB_SERVICE_URL_LOCAL!;
  }

  async forwardPost(path: string, data: any) {
    const response$ = this.http.post(`${this.BASE_URL}${path}`, data);
    const { data: response } = await firstValueFrom(response$);
    return response;
  }
}
