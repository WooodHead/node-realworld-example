import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({ nullable: false })
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  content: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'int', nullable: false })
  authorId: number;

  @Field({ nullable: false })
  @ManyToOne(type => User, { eager: true })
  @JoinColumn()
  author: User;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field()
  @Column({ nullable: true, default: 'example field' })
  newFieldForMigrationTest?: string;
}
