<script setup lang="ts">
import ImageTransformer from '~/components/apps/imageTransformer/ImageTransformer.vue'
import Text2Image from '~/components/apps/text2Image/Text2Image.vue'

const { t } = useI18n()

const activeTabComponent = shallowRef<any>()

const tabList = [
  {
    label: t('app.form.imageTransformer.title'),
    tabName: 'transformer',
    value: toRaw(ImageTransformer),
  },
  {
    label: 'Text2Image',
    tabName: 'text2Image',
    value: toRaw(Text2Image),
  },
] as const

const tabsValue = ref<typeof tabList[number]['tabName']>('transformer')

const tab = useRouteQuery('tab')

watch(tabsValue, (val) => {
  tab.value = val
  activeTabComponent.value = tabList.find(tab => tab.tabName === val)?.value
}, {
  immediate: true,
})

useHead(() => ({
  title: t('app.title'),
}))
</script>

<template>
  <div class="h-full sm:w-full md:w-[750px] mx-auto flex flex-col">
    <Tabs v-model="tabsValue" default-value="Transformer">
      <TabsList>
        <TabsTrigger v-for="t2 in tabList" :key="t2.tabName" :value="t2.tabName">
          {{ t2.label }}
        </TabsTrigger>
      </TabsList>
      <keep-alive>
        <component :is="activeTabComponent" />
      </keep-alive>
    </Tabs>
  </div>
</template>

<style scoped></style>
