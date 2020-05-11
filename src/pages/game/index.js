import Taro, { Component , Fragment} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
import Snake from './components/TheSnake'

export default class Index extends Component {

    state = {
        height: 0,
        lines: 20,
        direction: 'right'
    }

    componentDidMount(){
        this.getContainerHeight()
    }
    getContainerHeight(){
        const query = Taro.createSelectorQuery()
        query.select('.snake-container .container').boundingClientRect()
        query.exec((res)=>{
            console.log(res)
            const boundingClientRect = res[0]
            this.setState({
                height: boundingClientRect.width
            })   
        })
    }
    onTouchStart(e) {
        console.log('onTouchStart',e)
        const {changedTouches} = e
        const {clientX,clientY} = changedTouches[0]
        this.setState({
            startClientX:clientX,
            startClientY:clientY
        })
    }
    onTouchEnd(e) {
        console.log('onTouchEnd',e)
        const {changedTouches} = e
        const {clientX,clientY} = changedTouches[0]
        const {startClientX,startClientY} = this.state
        const disClientX = clientX - startClientX
        const disClientY = clientY - startClientY
        if (disClientX > 0 && disClientX > Math.abs(disClientY)){
            console.log('right')
            if (this.state.direction === 'left') return
            this.setState({
                direction: 'right'
            })
        } else if (disClientX < 0 && Math.abs(disClientX) > Math.abs(disClientY)){
            console.log('left')
            if (this.state.direction === 'right') return
            this.setState({
                direction: 'left'
            })
        } else if (disClientY > 0 && disClientY > Math.abs(disClientX)){
            console.log('down')
            if (this.state.direction === 'up') return
            this.setState({
                direction: 'down'
            })
        } else if (disClientY < 0 && Math.abs(disClientY) > Math.abs(disClientX)){
            console.log('up')
            if (this.state.direction === 'down') return
            this.setState({
                direction: 'up'
            })
        }
    }
    reStart(){
        console.log('this.snake',this.snake)
        this.snake.reStart()
        this.setState({
            direction: 'right'
        })
    }
    start(){
        this.snake.start()
    }
    pause(){
        this.snake.pause()
    }
    config = {
        navigationBarTitleText: '贪吃蛇'
      }
    render () {
        const {height,lines, direction} = this.state
            return (
                <View>                
                    <View className='snake-container'>
                        <View className='container' onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                        {
                            (height && lines)?(
                                new Array(lines+1).fill(1).map((item,index)=>{
                                    return (
                                        <Fragment key={index}>
                                            <View  className='line heng' style={{top:`${index*height/lines}px`}} />
                                            <View  className='line shu' style={{left:index===lines?`${index*height/lines-1}px`:`${index*height/lines}px`}} />
                                        </Fragment>
                                    )
                                })
                            ):null
                        }
                        <Snake ref={(ref)=>{this.snake = ref}} S={height/lines} max={lines} direction={direction} onReStart={this.reStart} />
                        </View>
                    </View>
                    <Button onClick={this.start} style={{marginTop:'10px'}}>开始</Button>
                    <Button onClick={this.pause} style={{marginTop:'10px'}}>暂停</Button>
                    <Button onClick={this.reStart} style={{marginTop:'10px'}}>重新开始</Button>
                </View>
            )
        
    }
}