export const BASE_URL = 'https://api.github.com/repos/'
export const getUrl = (user, repo, path) => {
    return BASE_URL + user + '/' + repo + '/contents/' + path
}
