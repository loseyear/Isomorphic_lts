import axios from 'axios-extra'

axios.defaults.maxConcurrent = 5
// axios.defaults.withCredentials = true

let CancelToken = axios.CancelToken
let source = CancelToken.source()

export const cancel = () => {
  source.cancel()
  CancelToken = axios.CancelToken
  source = CancelToken.source()
}

export default async function R({
  url,
  data = {},
  method = 'GET',
}) {
  return axios({
    url,
    data,
    method,
    cancelToken: source.token,
  })
    .then((response) => response?.data || {})
    .catch(({ response }) => response?.data || {})
}
