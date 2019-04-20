
export const CRAWLER_STATUS = {
  RUNNING: 'running',
  PENDING: 'pending',
  SUCCEED: 'succeed',
  FAILED: 'failed',
  INITIAL: 'initial',
  FREQUENTLY: 'frequently'
}

export const CRAWLER_STATUS_CODE = {
  [CRAWLER_STATUS.INITIAL]: 0,
  [CRAWLER_STATUS.SUCCEED]: 1,
  [CRAWLER_STATUS.PENDING]: 2,
  [CRAWLER_STATUS.RUNNING]: 3,
  [CRAWLER_STATUS.FAILED]: 4,
  [CRAWLER_STATUS.FREQUENTLY]: 5
}

export const CRAWLER_STATUS_TEXT = Object.keys(CRAWLER_STATUS_CODE)
  .reduce((dict, key) => {
    const code = CRAWLER_STATUS_CODE[key]
    dict[code] = key
    return dict
  }, {})

export const COLLECTIONS = {
  COMMITS: 'githubcommits',
  USERS: 'githubusers',
  REPOS: 'githubrepos',
  ORGS: 'githuborgs',
  USER_INFOS: 'githubusersinfos',
  REPOS_README: 'githubreposreadmes'
}
