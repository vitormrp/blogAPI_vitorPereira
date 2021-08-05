import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAuthors1627662354516 implements MigrationInterface {

    private table = new Table({
        name: 'authors',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar',
                isNullable: false,
                length: '255',
            },
            {
                name: 'birthday',
                type: 'timestamptz',
                isNullable: false,
            },
            {
                name: 'nickname',
                type: 'varchar',
                length: '255',
                isNullable: false,
                isUnique: true,
            },
            {
                name: 'creationDate',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            }
        ],
    })
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
