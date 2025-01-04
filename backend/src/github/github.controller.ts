import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { GithubService } from './github.service';

@Controller('github')
@UseInterceptors(CacheInterceptor)
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get(':username')
  async getGithubStats(@Param('username') username: string) {
    return this.githubService.getUserStats(username);
  }
}