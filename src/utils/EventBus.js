import Vue from 'vue'
export const EventBus = new Vue(
  {
    data: {
      openItemModal: null,
      openAnotationModal: null
    }
  }
)
