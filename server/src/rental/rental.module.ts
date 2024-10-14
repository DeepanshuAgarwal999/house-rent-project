import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { User } from 'src/user/entities/user.entity';
import { House } from 'src/house/entities/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental,User,House])],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
