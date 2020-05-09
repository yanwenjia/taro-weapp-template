import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      "pages/life/index",
      "pages/hot-details/index"
    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于获取当前城市信息" // 高速公路行驶持续后台定位
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "list": [{
        "pagePath": "pages/index/index",
        "text": "热点",
        "iconPath": "./img/tabs/hot1.png",
        "selectedIconPath": "./img/tabs/hot2.png"
      },
      {
        "pagePath": "pages/life/index",
        "text": "天气",
        "iconPath": "./img/tabs/w1.png",
        "selectedIconPath": "./img/tabs/w2.png"
      }]
    }
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
