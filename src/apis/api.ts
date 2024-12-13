import  {request}  from './request'

export const loginAPI = (l: LoginReq) => {
  return request<LoginResp>({
    method: 'POST',
    url: '/login',
    data: l,
  })
}

export const getRecords = (offset: string) => {
  return request<RecordsPage>({
    method: 'get',
    url: '/records',
    params: {
      offset: offset,
    },
  })
}

export const checkRecord = (recordId: number, result: number) => {
  return request({
    method: 'get',
    url: '/check',
    params: {
      record_id: recordId,
      result: result,
    },
  })
}

export interface LoginReq {
  username: string
  password: string
}

export interface LoginResp {
  avatar: string
  token: string
  userName: string
}

export interface APIResponse<T = never> {
  code: number
  message: string
  data: T
}

export interface RecordsPage {
  has_more: boolean
  items: RecordItem[]
}

export interface RecordItem {
  dynamic_URL: string
  id: number
  post_at: string
  URL: string
}
