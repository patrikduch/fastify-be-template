import { MigrationInterface, QueryRunner } from "typeorm";

export class UsernameField1703145183755 implements MigrationInterface {
  name = "UsernameField1703145183755";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "username" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "username"`);
  }
}
