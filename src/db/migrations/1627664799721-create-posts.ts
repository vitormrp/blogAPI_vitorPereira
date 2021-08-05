import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createPosts1627664799721 implements MigrationInterface {
    private table = new Table({
        name: 'posts',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'author_id',
                type: 'integer',
                isNullable: false,
            },
            {
                name: 'title',
                type: 'varchar',
                isNullable: false,
                length: '255',
            },
            {
                name: 'body',
                type: 'varchar',
                isNullable: false,
                length: '255',
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
        ],
    });

    private foreignKey = new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'authors',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
        await queryRunner.createForeignKey('posts', this.foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
