<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField } from '~/components/ui/form'
import { array2Object } from '~/lib/utils'

const { formSchema } = defineProps<FormConfigProps>()
const emit = defineEmits(['submit'])

// Recompute the validation schema when the incoming schema (and its translations) change
const zodFormSchema = computed(() => toTypedSchema(z.object(array2Object(formSchema))))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: zodFormSchema,
})

const { t } = useI18n()

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <div>
    <form class="space-y-6" @submit="onSubmit">
      <FormField v-for="schema in formSchema" v-slot="{ componentField }" :key="schema.name" :name="schema.name" :validate-on-blur="!isFieldDirty">
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
      <div class="text-right">
        <Button type="submit">
          {{ t('app.form.send') }}
        </Button>
      </div>
    </form>
  </div>
</template>
