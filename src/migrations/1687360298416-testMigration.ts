import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1687360298416 implements MigrationInterface {
    name = 'TestMigration1687360298416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" RENAME COLUMN "password" TO "Password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" RENAME COLUMN "Password" TO "password"`);
    }

}
