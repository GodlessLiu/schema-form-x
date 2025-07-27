<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Sheet>
    <SheetTrigger class="leading-[40px]">
      <span class="icon-[uil--setting] cursor-pointer" />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{{ t('app.settings.title') }}</SheetTitle>
        <SheetDescription>
          {{ t('app.settings.description') }}
        </SheetDescription>
      </SheetHeader>
      <div class="px-4">
        <x-performance />
      </div>
    </SheetContent>
  </Sheet>
</template>
