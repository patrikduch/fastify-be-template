import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntityDataSeed1703157753083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserting data into the user_entity table
    await queryRunner.query(`
    INSERT INTO user_entity (id, username) VALUES
        (1, 'Name1');

    INSERT INTO user_entity (id, username) VALUES
        (2, 'Name2');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Removing the inserted data from the table
    await queryRunner.query(`DELETE FROM user_entity WHERE id IN (1, 2);`);
  }
}
