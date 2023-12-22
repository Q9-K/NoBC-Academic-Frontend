import {defineStore} from "pinia";


/**
 * 傻逼JS，下次我一定用TS
 * 这个store是操作“上半部分”的搜索框的选项的
 */
export const useUpperSearchBarStore = defineStore('upperSearchBar', {
  state: () => {
    return {
      options: []
    }
  },
  actions: {
    /**
     * 加进来一个新的选项
     */
    addIntoOptions(id, title) {
      this.options.push({
        value: id,
        label: title
      })
    },



    /**
     * 清空已有的全部选项
     */
    cleanOptions() {
      this.options = []
    },
  },
  getters: {
    getOptions: state => state.options
  }
})
