import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    render () {
        const {weatherData} = this.props
        return (
            <View className='weather-day'>
                <View className='item'>
                    <View className='date'>日期:{weatherData.date}</View>
                </View>
                <View className='item'>
                    <View >日出:{weatherData.sr}</View>
                    <View >日落:{weatherData.ss}</View>
                </View>
                <View className='item'>
                    <View >最低温:{weatherData.tmp_min}°</View>
                    <View >最高温:{weatherData.tmp_max}°</View>
                </View>
                <View className='item'>
                    <View >白天:{weatherData.cond_txt_d}</View>
                    <View >夜间:{weatherData.cond_txt_n}</View>
                </View>
                <View className='item'>
                    <View>{weatherData.wind_dir}{weatherData.wind_sc}级</View>
                    <View>降水概率:{weatherData.pop}%</View>
                </View>
            </View>
        )
    }
}