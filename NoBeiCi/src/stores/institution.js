import {defineStore} from "pinia";
export const useInstitution = defineStore('institution', {
    state: () => ({
        institutionId: '',
    }),
    actions: {
      changeId(id) {
        this.institutionId  = id;
      },
    },
    getters: {
      getId: (state) => state.institutionId,
    },
    persist: true,
})