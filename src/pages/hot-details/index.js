import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { netGetDetails } from '@/api/index'
// import Parse from './components/parse.js'
import WxParse from '../../wxParse/wxParse'
import "../../wxParse/wxParse.wxss";
import "./index.scss"
// import ToWxml from '../../towxml/towxml'

// const towxml = require('../../towxml/index.js')

export default class Index extends Component {
    componentWillMount() { }

    componentDidMount() {
        Taro.setNavigationBarTitle({
            title: this.$router.params.title
          })
        this.getDetails()
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    getDetails(){
        const {id} = this.$router.params
        netGetDetails(id)
        .then((res)=>{
            const articleR = res
            const start = articleR.indexOf('<div class="content">')
            const end = articleR.indexOf('<div class="view-more">')
            const article = articleR.slice(start,end)
            WxParse.wxParse('article', 'html', article, this.$scope, 5);
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
        <View className='details-container'>
            <import src='../../wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
        </View>
        )
    }
}
    