import request from '../utils/request'

const weatherKey = '4ff1d5fbe95949c7af2515ccb09135aa'
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

function weather(type, data){
    return request({
        url:`https://free-api.heweather.net/s6/weather/${type}`,
        data: {...data, key:weatherKey}
    })
}
// 获取实况天气
export function netGetWeatherNow(data){
    return weather('now', data)
 }
 // 获取3-10天天气预报
export function netGetWeather3T10(data){
    return weather('forecast', data)
 }