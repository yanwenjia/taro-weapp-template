import request from '../utils/request'

// 知乎日报-获取最新消息
export function netGetLatest(data){
    return request({
        url:'http://news-at.zhihu.com/api/4/news/latest',
        data
    })
}
// 获取详情
export function netGetDetails(id){
   return request({
        url:`https://daily.zhihu.com/story/${id}`
    })
}