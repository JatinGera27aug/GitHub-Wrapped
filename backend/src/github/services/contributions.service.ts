import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ContributionsService {
  constructor(private readonly httpService: HttpService) {}

  async getContributions(username: string) {
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

    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://api.github.com/graphql',
        { query, variables: { username } },
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      ),
    );

    const contributions = data.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap(week => week.contributionDays)
      .map(day => ({
        date: day.date,
        count: day.contributionCount,
      }));

    return contributions;
  }
}