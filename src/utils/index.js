import Vue from 'vue'
const vm = new Vue()
// 登录时调用 存储登录时间
export const loginTime = () => {
  const newDate = new Date()
  localStorage.setItem('loginTime', newDate.getTime())
}
// 判断登录时间是否需要重新获取token
export const compareTime = () => {
  var nowD = new Date() // 当前时间
  const endD = parseInt(localStorage.getItem('loginTime')) // 有效开始时间
  const time = nowD.getTime() - endD
  if (time > 540000) { // 540000
    if (time < 720000) return 1 // 有效 720000
    else if (time > 720000) return 2 // 无效 720000
  } else return 3 // 不处理
}

// 导出Excel、zip压缩文件
export const exportExcel = (res, name, loadtype) => {
  let blob = null
  if (loadtype !== '' && loadtype === 'zip') { // zip
    blob = new Blob([res], { type: 'application/zip' })
    const objectURL = URL.createObjectURL(blob)
    const downEle = document.createElement('a')
    downEle.href = objectURL
    downEle.setAttribute('download', `${name}.zip`)
    document.body.appendChild(downEle)
    downEle.click()
  } else { // Excel
    blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    const objectURL = URL.createObjectURL(blob)
    const downEle = document.createElement('a')
    downEle.href = objectURL
    downEle.setAttribute('download', `${name}.xlsx`)
    document.body.appendChild(downEle)
    downEle.click()
  }
}
export const popUp = () => {
  vm.$alert('导出申请已提交，请到"数据下载"菜单中下载数据', '提示', {
    confirmButtonText: '确定',
    callback: action => {}
  })
}
