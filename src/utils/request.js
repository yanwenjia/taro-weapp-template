import Taro from '@tarojs/taro'

function request (options){
    return new Promise((resolve, reject)=>{
        Taro.request({
            ...options,
            success (res) {
                resolve(res.data)
            },
            fail(err){
                reject(err)
            }
          })
    })
     
}
  export default request
