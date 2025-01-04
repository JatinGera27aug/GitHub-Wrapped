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
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const contributions_service_1 = require("./services/contributions.service");
const languages_service_1 = require("./services/languages.service");
const repositories_service_1 = require("./services/repositories.service");
const activities_service_1 = require("./services/activities.service");
let GithubService = class GithubService {
    constructor(contributionsService, languagesService, repositoriesService, activitiesService) {
        this.contributionsService = contributionsService;
        this.languagesService = languagesService;
        this.repositoriesService = repositoriesService;
        this.activitiesService = activitiesService;
    }
    async getUserStats(username) {
        const [contributions, languages, repositories, activities] = await Promise.all([
            this.contributionsService.getContributions(username),
            this.languagesService.getLanguages(username),
            this.repositoriesService.getTopRepositories(username),
            this.activitiesService.getActivities(username),
        ]);
        return {
            contributions,
            languages,
            topRepositories: repositories,
            activities,
        };
    }
};
exports.GithubService = GithubService;
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contributions_service_1.ContributionsService,
        languages_service_1.LanguagesService,
        repositories_service_1.RepositoriesService,
        activities_service_1.ActivitiesService])
], GithubService);
//# sourceMappingURL=github.service.js.map