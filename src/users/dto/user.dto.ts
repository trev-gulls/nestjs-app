import { IsEmail, Length, Matches } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @Matches(/^\w+$/, {
    message: () => 'username may only contain word characters',
  })
  @Length(3, 10, {
    message: () => 'username must be between 3 and 10 characters',
  })
  name: string;
}
