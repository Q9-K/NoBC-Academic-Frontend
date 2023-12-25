import {defineStore} from "pinia";

const LOGIN = 4235
const REGISTER = 5344
const SELECT_FIELD = 8792
const FINISH = 6961

export {LOGIN, REGISTER, SELECT_FIELD, FINISH}

export const useStateOfPriorDialog = defineStore('stateOfPriorDialog', {
  state: () => {
    return {
      isDialogVisible: true,
      currentView: LOGIN,
      currentStep: 0
    }
  },
  actions: {
    setView(newView) {
      this.currentView = newView;
    },
    setStep(newStep) {
      this.currentStep = newStep
    },
    closeDialog() {
      this.isDialogVisible = false
    },
    openDialog() {
      this.isDialogVisible = true
    }
  },
  getters: {
    getCurrentView: state => state.currentView,
    getCurrentStep: state => state.currentStep,
    getVisible: state => state.isDialogVisible
  }
})
