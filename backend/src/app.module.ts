import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 3600, // Cache for 1 hour
    }),
    GithubModule,
  ],
})
export class AppModule {}