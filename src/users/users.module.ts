import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';

const logger = {
  provide: 'logger',
  useValue: new Logger('Users module'),
};

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PassportModule],
  providers: [UsersService, UserResolver, logger],
})
export class UsersModule {}
