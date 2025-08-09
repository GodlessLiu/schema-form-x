<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { FormField } from '~/components/ui/form'

const { formSchema, loading } = defineProps<FormConfigProps>()
const emit = defineEmits(['submit'])

const { isFieldDirty, handleSubmit, values } = useForm({})

const { t } = useI18n()
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <div>
    <form class="space-y-6" @submit="onSubmit">
      <div v-for="schema in formSchema" :key="schema.name">
        <FormField v-if="schema.ifFn ? schema.ifFn(values) : true" v-slot="{ componentField }" rules="required" :name="schema.name" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>{{ schema.label }}</FormLabel>
            <!-- 输入框 -->
            <FormControl v-if="schema.type === 'input'">
              <Input autocomplete="off" type="text" v-bind="componentField" :placeholder="schema.placeholder" />
            </FormControl>
            <!-- 选择器 -->
            <Select v-else-if="schema.type === 'select'" v-bind="componentField">
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
