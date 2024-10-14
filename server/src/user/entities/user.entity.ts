import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/constants';
import { House } from 'src/house/entities/house.entity';
import { Rental } from 'src/rental/entities/rental.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  @PrimaryColumn()
  @IsString()
  email: string;

  @OneToMany(() => House, (house) => house.owner)
  houses: House[];

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsOptional()
  @IsString()
  lastName: string;

  @Column()
  @IsNotEmpty()
  // @Exclude()
  @IsString()
  password: string;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
