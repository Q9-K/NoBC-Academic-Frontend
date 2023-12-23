import {defineStore} from "pinia";


/**
 * 傻逼JS，下次我一定用TS
 * 这个store是操作“上半部分”的搜索框的选项的
 */
export const getThesisId = defineStore('getThesisId', {
  state: () => {
    return {
      ThesisId: String
    }
  },
  actions: {
    /**
     * 设置论文id
     */
    setThesisId(id){
        this.ThesisId=id;
    }
  },
  getters: {
    getOptions: state => state.ThesisId
  }
})
