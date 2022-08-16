import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Некорректный email' })
  email: string;

  @Length(6, undefined, { message: 'Минимальное количество символов 6' })
  password?: string;
}
