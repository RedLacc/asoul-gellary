import  {request}  from './request'
import type { LoginReq, LoginResp, RecordsResp } from '@/types/api'

export const loginAPI = (l: LoginReq) => {
  return request<LoginResp>({
    method: 'POST',
    url: '/login',
    data: l,
  })
}

export const getRecords = (offset: number) => {
  return request<RecordsResp>({
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
    url: '/records/check',
    params: {
      record_id: recordId,
      result: result,
    },
  })
}

