import Taro, { Component, Fragment} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    constructor(props){
        super()
        this.state = {
            snakes:[[0,0]],
            food:[ Math.floor(Math.random()*props.max) ,Math.floor(Math.random()*props.max) ]
        }
    }
    move(){
        const {direction} = this.props
        const {snakes} = this.state
        const handleBody = JSON.parse(JSON.stringify(snakes))
        const handleHead = JSON.parse(JSON.stringify(snakes))
        const body = handleBody.length>1?handleBody.slice(0,-1):[]
        const head = handleHead[0]
        if (direction === 'right'){
            head[0] += 1
        }
        if (direction === 'left'){
            head[0] -= 1
        }
        if (direction === 'down'){
            head[1] += 1
        }
        if (direction === 'up'){
            head[1] -= 1
        }
        this.setState({
            snakes:[head,...body]
        },()=>{
            const last = this.state.snakes[this.state.snakes.length-1]
            // const first = this.state.snakes[0]
            if (last[0] === this.state.food[0] && last[1] === this.state.food[1]){
                this.eat()
            }
            this.checkFailed()
        })
    }
    eat(){
        const {snakes, food} = this.state
        snakes.push(food)
        this.setState({
            snakes,
            food:[ Math.floor(Math.random()*this.props.max) ,Math.floor(Math.random()*this.props.max) ]
        }, ()=>{
            console.log(this.state.food)
        })
    }
    checkFailed(){
        const head = this.state.snakes[0]
        const {max} = this.props
        if (head[0] < 0 || head[0]>=max || head[1] <0 || head[1] >= max ){
            Taro.showToast({
                title: '失败'
            })
            console.log('this.state.snakes',this.state.snakes)
            clearInterval(this.interval)
        }
    }
    reStart(){
        clearInterval(this.interval)
        this.setState({
            snakes:[[0,0]],
            food:[ Math.floor(Math.random()*this.props.max) ,Math.floor(Math.random()*this.props.max) ]
        },()=>{
            this.interval = setInterval(()=>{
                this.move()
            },500)
        })
    }
    start(){
        this.interval = setInterval(()=>{
            this.move()
        },400)
    }
    pause(){
        clearInterval(this.interval)
    }
    render () {
        const {snakes, food} = this.state
        const {S} = this.props
        const size = `${S}px`
        return (
            <Fragment>
                { 
                    snakes.map((p,index)=>{
                         return (
                         <View 
                           key={index} 
                           className='snake'
                           style={{
                               width:size,height:size,
                               left:`${S*p[0]}px`, top:`${S*p[1]}px`,
                               backgroundColor:index===0?'red':'yellow'
                            }}
                         />
                         )
                    })
                }
                <View className='food' style={{width:size,height:size,left:`${S*food[0]}px`, top:`${S*food[1]}px`}} />
            </Fragment>
            
        )
    }
}