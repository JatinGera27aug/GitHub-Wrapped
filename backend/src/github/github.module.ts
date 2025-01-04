import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { ContributionsService } from './services/contributions.service';
import { LanguagesService } from './services/languages.service';
import { RepositoriesService } from './services/repositories.service';
import { ActivitiesService } from './services/activities.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [
    GithubService,
    ContributionsService,
    LanguagesService,
    RepositoriesService,
    ActivitiesService,
  ],
})
export class GithubModule {}