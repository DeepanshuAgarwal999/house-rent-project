import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { User } from 'src/user/entities/user.entity';
import { House } from 'src/house/entities/house.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { userId, houseId, startDate, endDate, totalPrice } = createRentalDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const house = await this.houseRepository.findOne({
      where: { id: houseId },
    });
    if (!house) {
      throw new NotFoundException(`House with ID ${houseId} not found`);
    }

    const existingRentals = await this.rentalRepository.find({
      where: {
        startDate: new Date(format(startDate, 'yyyy-MM-dd HH:mm:ss')),
        endDate: new Date(format(endDate, 'yyyy-MM-dd HH:mm:ss')),
        house: { id: houseId },
      },
    });

    if (existingRentals.length > 0) {
      throw new ConflictException(
        'House is already booked for the given dates',
      );
    }

    const rental = this.rentalRepository.create({
      user,
      house,
      startDate,
      endDate,
      totalPrice,
    });

    return this.rentalRepository.save(rental);
  }

  async findAll() {
    const rentalHouses = await this.rentalRepository.find();
    if (!rentalHouses || rentalHouses.length === 0) {
      throw new NotFoundException(`No house sold yet`);
    }
    return rentalHouses;
  }

  async findOne(id: number) {
    const rentalHouse = await this.rentalRepository.findOne({
      where: { id: id },
      relations: ['user', 'house'],
    });
    if (!rentalHouse) {
      throw new NotFoundException(`No rental contact found for this house`);
    }

    return {
      rental: rentalHouse,
      user: rentalHouse.user,
      house: rentalHouse.house,
    };
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
