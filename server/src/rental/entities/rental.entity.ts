import { IsNotEmpty, IsNumber } from 'class-validator';
import { House } from 'src/house/entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rentals)
  user: User;

  @ManyToOne(() => House, (house) => house.rentals, { onDelete: 'CASCADE' })
  house: House;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
