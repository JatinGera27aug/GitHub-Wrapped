"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModule = void 0;
const common_1 = require("@nestjs/common");
const github_controller_1 = require("./github.controller");
const github_service_1 = require("./github.service");
const contributions_service_1 = require("./services/contributions.service");
const languages_service_1 = require("./services/languages.service");
const repositories_service_1 = require("./services/repositories.service");
const activities_service_1 = require("./services/activities.service");
const axios_1 = require("@nestjs/axios");
let GithubModule = class GithubModule {
};
exports.GithubModule = GithubModule;
exports.GithubModule = GithubModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [github_controller_1.GithubController],
        providers: [
            github_service_1.GithubService,
            contributions_service_1.ContributionsService,
            languages_service_1.LanguagesService,
            repositories_service_1.RepositoriesService,
            activities_service_1.ActivitiesService,
        ],
    })
], GithubModule);
//# sourceMappingURL=github.module.js.map