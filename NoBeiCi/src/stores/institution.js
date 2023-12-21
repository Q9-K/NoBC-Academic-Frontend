import {defineStore} from "pinia";
export const useInstitution = defineStore('institution', {
    state: () => {
      return {
        institutionId: '',
      }
    },
    actions: {
      changeId(id) {
        this.id  = id;
      },

    },
    getters: {
      getId: state => state.institutionId
    }
})