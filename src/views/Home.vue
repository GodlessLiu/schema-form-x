<script setup lang="ts">
import ImageTransformer from './imageTransformer/ImageTransformer.vue'
import Text2Image from './text2Image/Text2Image.vue'

const { t } = useI18n()

const activeTabComponent = shallowRef<any>()

const tabList = [
  {
    label: 'app.form.imageTransformer.title',
    tabName: 'transformer',
    value: toRaw(ImageTransformer),
  },
  {
    label: 'app.form.text2Image.title',
    tabName: 'text2Image',
    value: toRaw(Text2Image),
  },
] as const
const tab = useRouteQuery('tab') as Ref<typeof tabList[number]['tabName']>

const tabsValue = ref<typeof tabList[number]['tabName']>(tab.value || 'transformer')

useTitle(() => `${t('app.title')} - ${t(tabList.find(t => t.tabName === tab.value)?.label || 'app.form.imageTransformer.title')}`)

watch(tabsValue, (val) => {
  tab.value = val
  activeTabComponent.value = tabList.find(tab => tab.tabName === val)?.value
}, {
  immediate: true,
})
</script>

<template>
  <div class="h-full sm:w-full md:w-[750px] mx-auto flex flex-col">
    <Tabs v-model="tabsValue" default-value="Transformer">
      <TabsList>
        <TabsTrigger v-for="t2 in tabList" :key="t2.tabName" :value="t2.tabName">
          {{ t(t2.label) }}
        </TabsTrigger>
      </TabsList>
      <keep-alive>
        <component :is="activeTabComponent" class="mb-10" />
      </keep-alive>
    </Tabs>
  </div>
</template>

<style scoped></style>
