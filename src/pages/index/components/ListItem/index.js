import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    toDetails(){
        Taro.navigateTo({url: `/pages/hot-details/index?id=${this.props.detailsId}&title=${this.props.title}`})
    }
    render() {
        return (
            <View className='hot-item' onClick={this.toDetails}>
                <Image
                  className='img'
                  src={this.props.img}
                />
                <View className='text'>
                    <Text className='title'>{this.props.title}</Text>
                    <Text className='hint'>{this.props.hint}</Text>
                </View>
            </View>

        )
    }
}
    