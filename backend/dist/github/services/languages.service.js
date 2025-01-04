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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let LanguagesService = class LanguagesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getLanguages(username) {
        const { data: repos } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        }));
        const languageStats = {};
        await Promise.all(repos.map(async (repo) => {
            const { data: languages } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(repo.languages_url, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                },
            }));
            Object.entries(languages).forEach(([lang, bytes]) => {
                languageStats[lang] = (languageStats[lang] || 0) + bytes;
            });
        }));
        return Object.entries(languageStats)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }
};
exports.LanguagesService = LanguagesService;
exports.LanguagesService = LanguagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LanguagesService);
//# sourceMappingURL=languages.service.js.map