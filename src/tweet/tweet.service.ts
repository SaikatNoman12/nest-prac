import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetService {
  tweets: { name: string; userId: number; date: string }[] = [
    {
      name: 'Abdullah Joss',
      userId: 1,
      date: '20-12-2025',
    },
    {
      name: 'Happy Birthday',
      userId: 1,
      date: '20-12-2025',
    },
    {
      name: 'Json Lang',
      userId: 2,
      date: '20-12-2025',
    },
  ];

  findAll() {
    return this.tweets;
  }
}
