import {ElMessage} from "element-plus";

/**
 * 通用的处理接口返回Response的函数
 * @param response 接口返回的response
 * @param whetherShowSuccess 是否弹出提示标识操作成功
 * @param handleData 处理数据的函数，注意，其参数直接就是data.data
 */
export const handleResponse = (response, whetherShowSuccess, handleData) => {
  console.log(response)
  const {status, data, statusText} = response
  if (status !== 200) {
    ElMessage({
      message: statusText,
      type: "error"
    })
  }
  else {
    if (data.code !== 200) {
      ElMessage({
        message: data.msg,
        type: "warning"
      })
    }
    else {
      if (whetherShowSuccess) {
        ElMessage({
          message: "OK!",
          type: "success"
        })
      }
      handleData(data.data)
    }
  }
}
