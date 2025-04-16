<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="menu-title" data-key="t-menu">Apps</li>
          <template v-for="item in menus" :key="item.id">
            <li v-if="!item.name" class="menu-title mt-2" data-key="t-menu">
              {{ item.title }}
            </li>
            <NavItem v-else :item="item"></NavItem>
          </template>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
</template>

<script setup>
import NavItem from '@/components/Layout/Partials/NavItem.vue';
import menus from '@/router/menus';
</script>
