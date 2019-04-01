import { GithubApiService } from './api/GithubApiService';
import * as _ from 'lodash';
import { User } from './api/User';
import { Repo } from './api/Repo';
import * as fs from 'fs';
import { MessageError } from './api/MessageError';
let svc: GithubApiService = new GithubApiService();
console.log(process.argv[2]);
// if (process.argv.length < 3) {
//   console.log('必须传入用户名');
// } else {
svc
  .getUserInfo('huxuanming')
  .then((user: User) => {
    console.log(user);
    return svc.getRepos(user.login);
  })
  .then((repos: Repo[]) => {
    let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.size]);
    fs.writeFile('repos.json', JSON.stringify(sortedRepos, null, 4), err => {
      if (err) throw '写入失败';
      console.log('success');
    });
  })
  .catch((err: MessageError) => {
    console.log(err.message);
  });
// }
// svc.getRepos('zeit').then((repos: Repo[]) => {
//   let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forks_count * -1]);
//   console.log(sortedRepos);
//   fs.writeFile('repos.json', JSON.stringify(sortedRepos, null, 4), function(err) {
//     if (err) throw '写入失败';
//     console.log('success');
//   });
// });
// svc.getRepos('zeit', (repos: Repo[]) => {
//   let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forks_count * -1]);
//   user.repos = sortedRepos;
//   console.log(user);
// });
