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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ActivitiesService = class ActivitiesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getActivities(username) {
        const { data: events } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://api.github.com/users/${username}/events?per_page=10`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        }));
        return events
            .map((event) => {
            var _a;
            switch (event.type) {
                case 'PushEvent':
                    return {
                        type: 'commit',
                        date: event.created_at,
                        description: `Pushed ${((_a = event.payload.commits) === null || _a === void 0 ? void 0 : _a.length) || 0} commits`,
                        repository: event.repo.name,
                    };
                case 'PullRequestEvent':
                    return {
                        type: 'pr',
                        date: event.created_at,
                        description: `${event.payload.action} a pull request`,
                        repository: event.repo.name,
                    };
                case 'WatchEvent':
                    return {
                        type: 'star',
                        date: event.created_at,
                        description: 'Starred a repository',
                        repository: event.repo.name,
                    };
                default:
                    return null;
            }
        })
            .filter(Boolean);
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map