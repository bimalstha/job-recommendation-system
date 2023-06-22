import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1687360056863 implements MigrationInterface {
    name = 'TestMigration1687360056863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" RENAME COLUMN "Application_status" TO "application_status"`);
        await queryRunner.query(`ALTER TYPE "public"."application_application_status_enum" RENAME TO "application_application_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."application_application_status_enum" RENAME TO "application_application_status_enum"`);
        await queryRunner.query(`ALTER TABLE "application" RENAME COLUMN "application_status" TO "Application_status"`);
    }

}
