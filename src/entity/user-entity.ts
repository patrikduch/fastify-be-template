import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "user_entity",
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
