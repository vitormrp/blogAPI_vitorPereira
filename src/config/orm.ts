import * as path from 'path';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "blogDB",
    "logging": true,
    entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
    migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
}

module.exports = options;