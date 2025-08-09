<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { FormField } from '~/components/ui/form'

const { formSchema, loading } = defineProps<FormConfigProps>()
const emit = defineEmits(['submit'])

const { isFieldDirty, handleSubmit, values, setFieldValue } = useForm({
  initialValues: formSchema.reduce((acc, cur) => {
    acc[cur.name] = cur.defaultValue
    return acc
  }, {} as Record<string, any>),
})

const { t } = useI18n()
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <div>
    <form class="space-y-6" @submit="onSubmit">
      <div v-for="schema in formSchema" :key="schema.name">
        <FormField
          v-if="schema.ifFn ? schema.ifFn(values) : true" v-slot="{ componentField }" :rules="schema.rules"
          :name="schema.name" :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>
              {{ schema.label }} <span
                v-if="schema.rules?.includes('required')"
                class="mb-1 -ml-1 text-red-500 text-xl"
              >*</span>
            </FormLabel>
            <!-- 输入框 -->
            <FormControl v-if="schema.type === 'input'">
              <Input autocomplete="off" type="text" v-bind="componentField" :placeholder="schema.placeholder" />
            </FormControl>
            <!-- 选择器 -->
            <Select v-else-if="schema.type === 'select'" :default-value="schema.defaultValue" v-bind="componentField">
              <FormControl>
                <SelectTrigger class="min-w-[180px] cursor-pointer">
                  <SelectValue :placeholder="schema.placeholder" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in schema.options" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <!-- 图片上传 -->
            <image-upload v-else-if="schema.type === 'image-upload'" v-bind="componentField" />
            <!-- 文本框 -->
            <FormControl v-else-if="schema.type === 'textarea'">
              <Textarea :placeholder="schema.placeholder" class="resize-none" v-bind="componentField" />
            </FormControl>
            <!-- 数字输入 -->
            <FormControl v-else-if="schema.type === 'number-field'" class="max-w-[180px]">
              <NumberField
                :default-value="schema.defaultValue"
                :max="schema.max"
                :min="schema.min"
                @update:model-value="(v) => {
                  if (v) {
                    setFieldValue(componentField.name, v)
                  }
                }"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement class="cursor-pointer" />
                  <NumberFieldInput />
                  <NumberFieldIncrement class="cursor-pointer" />
                </NumberFieldContent>
              </NumberField>
            </FormControl>
            <!-- 尺寸 -->
            <sizes-input v-else-if="schema.type === 'sizes'" v-bind="componentField" />
            <FormDescription v-if="schema.description">
              {{ schema.description }}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="text-right">
        <Button type="submit" :disabled="loading" class="min-w-[80px]">
          <Loader2 v-show="loading" class="animate-spin" />
          {{ t('app.form.send') }}
        </Button>
      </div>
    </form>
  </div>
</template>
