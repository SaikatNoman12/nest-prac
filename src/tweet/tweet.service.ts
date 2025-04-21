import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UserService) {}

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

  findAll(userId: number) {
    return this.tweets
      .filter((tweet) => tweet.userId === userId)
      .map((tweet) => {
        const user = this.userService.getSingleUser(userId);
        return { ...tweet, userName: user?.name };
      });
  }
}
