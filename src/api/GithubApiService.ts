import * as request from 'request';
import { User } from './User';
import { Repo } from './Repo';
import { MessageError } from './MessageError';
const options = {
  headers: {
    'User-Agent': 'request'
  },
  json: true
};
export class GithubApiService {
  //promise写法
  getUserInfo(userName: string) {
    return new Promise<User>((res, rej) => {
      request.get('https://api.github.com/users/' + userName, options, (error: any, response: any, body: any) => {
        if (error) return rej(new MessageError(error.message, 0));
        let user: User = new User(body);
        // cb(user);
        res(user);
      });
    });
  }
  getRepos(userName: string) {
    return new Promise<Repo[]>((res, rej) => {
      request.get(
        'https://api.github.com/users/' + userName + '/repos',
        options,
        (error: any, response: any, body: any) => {
          if (error) return new MessageError(error.message, 0);
          let repos: Repo[] = body.map((repo: any) => new Repo(repo));
          res(repos);
        }
      );
    });
  }
  //回调函数的写法
  // getUserInfo(userName: string, cb: (user: User) => any) {
  //   request.get('https://api.github.com/users/' + userName, options, (error: any, response: any, body: any) => {
  //     let user = new User(body);
  //     cb(user);
  //   });
  // }
  // getRepos(userName: string, cb: (repos: Repo[]) => any) {
  //   request.get(
  //     'https://api.github.com/users/' + userName + '/repos',
  //     options,
  //     (error: any, response: any, body: any) => {
  //       let repos: Repo[] = body.map((repo: any) => new Repo(repo));
  //       cb(repos);
  //     }
  //   );
  // }
}
