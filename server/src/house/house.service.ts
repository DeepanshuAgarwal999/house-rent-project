import {
  BadRequestException,
  Delete,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    let house = this.houseRepository.create(createHouseDto);
    house = await this.houseRepository.save(house);
    if (!house) {
      throw new InternalServerErrorException(
        'Unable to register house for rent!',
      );
    }
    return house;
  }

  async findAll() {
    const houses = await this.houseRepository.find();
    if (!houses || houses.length === 0)
      throw new NotFoundException('No house available for rent');

    return houses;
  }

  async findOne(id: number) {
    const house = await this.houseRepository.findOne({ where: { id: +id } });
    if (!house)
      throw new NotFoundException(`No house found with this id : ${id}`);
    return house;
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    const house = await this.houseRepository.findOne({ where: { id: id } });
    if (!house)
      throw new NotFoundException(`No house found with this id : ${id}`);

    const updatedHouse = await this.houseRepository.update(id, updateHouseDto);

    return updatedHouse;
  }

  async remove(id: number) {
    const house = await this.houseRepository.findOne({ where: { id: id } });
    if (!house)
      throw new NotFoundException(`No house found with this id : ${id}`);
    const deleteHouse = await this.houseRepository.delete(id);
    if (deleteHouse.affected === 0) {
      throw new InternalServerErrorException('Unable to delete house');
    }
    return `House with id : ${id} is successfully deleted`;
  }
}
