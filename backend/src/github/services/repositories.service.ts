import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RepositoriesService {
  constructor(private readonly httpService: HttpService) {}

  async getTopRepositories(username: string) {
    const { data: repos } = await firstValueFrom(
      this.httpService.get(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      ),
    );

    return repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language,
    }));
  }
}