<template>
  <div class="h-screen flex flex-col px-4">
    <div class="h-[40px]">
      <x-header />
    </div>
    <main class="flex-1 mt-4">
      <!-- golbal notification -->
      <Sonner />
      <!-- global command -->
      <x-command />
      <router-view />
    </main>
    <div class="h-[40px]">
      <x-footer />
    </div>
  </div>
</template>
