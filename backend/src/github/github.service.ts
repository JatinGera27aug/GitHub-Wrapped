import { Injectable } from '@nestjs/common';
import { ContributionsService } from './services/contributions.service';
import { LanguagesService } from './services/languages.service';
import { RepositoriesService } from './services/repositories.service';
import { ActivitiesService } from './services/activities.service';

@Injectable()
export class GithubService {
  constructor(
    private readonly contributionsService: ContributionsService,
    private readonly languagesService: LanguagesService,
    private readonly repositoriesService: RepositoriesService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async getUserStats(username: string) {
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
}