import Taro, { Component } from '@tarojs/taro'
import { View, Image} from '@tarojs/components'
import { netGetWeatherNow, netGetWeather3T10 } from '@/api/index'
import DayItem from './components/DayItem'
import './index.scss'

export default class Index extends Component {
  componentWillMount () { }

  componentDidMount () {
    this.getWeather()
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '天气'
  }
  getWeather(){
    Taro.getLocation({
      success:(locationMsg)=> {
        // latitude 纬度
        // longitude 经度
        const {latitude,longitude} = locationMsg
        netGetWeatherNow({location:`${longitude},${latitude}`})
          .then((weather)=>{
            const weatherMsg = weather.HeWeather6[0]
            this.setState({weatherMsg})
          }).catch((err)=>{
            console.log(err)
          })
          netGetWeather3T10({location:`${longitude},${latitude}`})
          .then((weather)=>{
            const dailyForecast = weather.HeWeather6[0].daily_forecast
            this.setState({dailyForecast})
          }).catch((err)=>{
            console.log(err)
          })
        }
     })
  }
  render () {
    if (!this.state.weatherMsg || !this.state.dailyForecast){
      return null
    }
    const {weatherMsg:{basic:{parent_city},now,update},dailyForecast} = this.state
   //  const address = `${cnty}-${admin_area}-${parent_city}-${location}` 
    const address = `${parent_city}` 
    return (
      <View className='page-container'>
        <View className='weather-now'>
          <View className='item'>
             <View>{address}</View>
             <View>更新于:{update.loc}</View>
          </View>
          <View className='item'>
             <View className='tmp'>{now.tmp}°</View>
             <View className='cond_txt'>{now.cond_txt}</View>
             <Image className='icon' src={`http://jiayanwen.gitee.io/weathericon/${now.cond_code}.png`} />
          </View>
          <View className='item'>
             <View>{now.wind_dir}{now.wind_sc}级</View>
             <View>相对湿度{now.hum}%</View>
          </View>
        </View>
        {
           dailyForecast.map((item)=>{
              return (
               <DayItem key={item.date} weatherData={item} />
              )
           })
        }
      </View>
    )
  }
}
