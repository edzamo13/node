"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const products_service_1 = require("./../../products/services/products.service");
const pg_1 = require("pg");
let UsersService = class UsersService {
    constructor(productsService, configService, clientePG) {
        this.productsService = productsService;
        this.configService = configService;
        this.clientePG = clientePG;
        this.counterId = 1;
        this.users = [
            {
                id: 1,
                email: 'correo@mail.com',
                password: '12345',
                role: 'admin',
            },
        ];
    }
    findAll() {
        const apiKey = this.configService.get('API_KEY');
        const dbName = this.configService.get('DATABASE_NAME');
        console.log(apiKey, dbName);
        return this.users;
    }
    findOne(id) {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return user;
    }
    create(data) {
        this.counterId = this.counterId + 1;
        const newUser = Object.assign({ id: this.counterId }, data);
        this.users.push(newUser);
        return newUser;
    }
    update(id, changes) {
        const user = this.findOne(id);
        const index = this.users.findIndex((item) => item.id === id);
        this.users[index] = Object.assign(Object.assign({}, user), changes);
        return this.users[index];
    }
    remove(id) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        this.users.splice(index, 1);
        return true;
    }
    getOrderByUser(id) {
        const user = this.findOne(id);
        return {
            date: new Date(),
            user,
            products: this.productsService.findAll(),
        };
    }
    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientePG.query('select * from tasks', (err, res) => {
                if (err) {
                    reject('--' + err);
                }
                resolve(res.rows);
            });
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(2, common_1.Inject('PG')),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        config_1.ConfigService,
        pg_1.Client])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map