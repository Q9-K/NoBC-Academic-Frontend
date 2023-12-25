import {defineStore} from "pinia";

export const useSearchContentStore = defineStore('searchContent', {
  state() {
    return {
      content: ''
    }
  },
  actions: {
    setContent(content) {
      this.content = content
    }
  },
  getters: {
    getContent: state => state.content
  }
})
