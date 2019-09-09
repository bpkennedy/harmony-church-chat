import { Notify } from 'quasar'

export const genericError = (message) => {
  Notify.create({
    color: 'negative',
    icon: 'report_problem',
    message,
    position: 'top',
    multiLine: true,
    actions: null,
    buttonColor: 'white',
  })
}
