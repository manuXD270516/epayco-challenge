import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;
}
