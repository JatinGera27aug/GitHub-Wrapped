import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ActivitiesService {
  constructor(private readonly httpService: HttpService) {}

  async getActivities(username: string) {
    const { data: events } = await firstValueFrom(
      this.httpService.get(
        `https://api.github.com/users/${username}/events?per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      ),
    );

    return events
      .map((event) => {
        switch (event.type) {
          case 'PushEvent':
            return {
              type: 'commit',
              date: event.created_at,
              description: `Pushed ${event.payload.commits?.length || 0} commits`,
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
}