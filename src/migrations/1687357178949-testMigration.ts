import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1687357178949 implements MigrationInterface {
    name = 'TestMigration1687357178949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" RENAME COLUMN "Admin_status" TO "admin_status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" RENAME COLUMN "admin_status" TO "Admin_status"`);
    }

}
