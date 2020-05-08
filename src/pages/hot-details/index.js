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
    state={
        content:''
    }
    componentWillMount() { }

    componentDidMount() {
        this.getDetails()
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    config = {
        navigationBarTitleText: '详情'
    }
    getDetails(){
        const {id} = this.$router.params
        
        netGetDetails(id)
        .then((res)=>{
            // console.log(res)
            // let content = towxml(res,'html')
            // console.log(content)
            // this.setState({content})
            // console.log(res)
            const articleR = res
            const start = articleR.indexOf('<div class="content">')
            console.log(start)
            const end = articleR.indexOf('<div class="view-more">')
            console.log(end)
            const article = articleR.slice(start,end)
            // const article = '<div style="color: red">我是HTML代码</div><h2>标题2</h2><img src="http://192.168.122.142:80/public/1904/26/public-1904-26-c15d9fb7-0ad5-40a9-b845-6d085d6c0f30.jpg">'
            WxParse.wxParse('article', 'html', article, this.$scope, 5);
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
        <View className='home'>
            {/* <ToWxml nodes={this.state.content} /> */}
            <import src='../../wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
        </View>
        )
    }
}
    