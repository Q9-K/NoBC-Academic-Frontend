/**
 * 检测是否是中文的函数
 * @param string
 */
export const checkIsChinese = (string) => {
  const pattern = new RegExp("[\u4E00-\u9FA5]+")
  return pattern.test(string)
}
