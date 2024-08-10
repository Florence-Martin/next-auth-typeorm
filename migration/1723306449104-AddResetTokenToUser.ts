import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetTokenToUser1723306449104 implements MigrationInterface {
    name = 'AddResetTokenToUser1723306449104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetToken" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetTokenExpiry" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetTokenExpiry"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetToken"`);
    }

}
