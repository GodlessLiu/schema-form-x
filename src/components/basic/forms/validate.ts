import { all } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})
