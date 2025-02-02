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
exports.ContributionsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ContributionsService = class ContributionsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getContributions(username) {
        const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api.github.com/graphql', { query, variables: { username } }, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        }));
        const contributions = data.data.user.contributionsCollection.contributionCalendar.weeks
            .flatMap(week => week.contributionDays)
            .map(day => ({
            date: day.date,
            count: day.contributionCount,
        }));
        return contributions;
    }
};
exports.ContributionsService = ContributionsService;
exports.ContributionsService = ContributionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ContributionsService);
//# sourceMappingURL=contributions.service.js.map