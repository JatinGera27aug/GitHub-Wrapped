import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LanguagesService {
  constructor(private readonly httpService: HttpService) {}

  async getLanguages(username: string) {
    const { data: repos } = await firstValueFrom(
      this.httpService.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }),
    );

    const languageStats = {};
    
    await Promise.all(
      repos.map(async (repo) => {
        const { data: languages } = await firstValueFrom(
          this.httpService.get(repo.languages_url, {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
          }),
        );

        Object.entries(languages).forEach(([lang, bytes]: [string, number]) => {
          languageStats[lang] = (languageStats[lang] || 0) + bytes;
        });
      }),
    );

    return Object.entries(languageStats)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }
}