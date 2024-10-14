import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Rental } from 'src/rental/entities/rental.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;
  
  @Column()
  @IsOptional()
  @IsString()
  img_url: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  location: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsNumber()
  numberOfRooms: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ManyToOne(() => User, (user) => user.houses)
  owner: User;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];
}
