export interface APIResponse<T = never> {
  code: number
  message: string
  data: T
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

export interface RecordsResp {
  has_more: boolean
  offset : number
  items: RecordItem[]
}

export interface RecordItem {
  dynamic_URL: string
  id: number
  post_at: string
  URL: string
}
