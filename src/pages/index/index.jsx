import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { netGetLatest } from '@/api/index'
import ListItem from './components/ListItem'


export default class Index extends Component {
  state={
    stories:[]
  }

  componentWillMount () { }

  componentDidMount () { 
    this.getData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  getData(){
    netGetLatest()
    .then((res)=>{
      console.log(res)
      const {stories,top_stories} = res
      this.setState({
        stories:stories.concat(top_stories)
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  toDetails(){
    console.log('去详情')
  }
  config = {
    navigationBarTitleText: '热点'
  }
  render () {
    if (!this.state.stories.length){
      return null
    }
    return (
      <ScrollView>
        {
          this.state.stories.map(story=>{
            return (
              <ListItem 
                key={story.id}
                title={story.title}
                img={story.images?story.images[0]: story.image}
                hint={story.hint}
                detailsId={story.id}
              />
            )
          })
        }
      </ScrollView>
    )
  }
}
