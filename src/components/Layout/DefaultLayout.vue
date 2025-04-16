<template>
    <div id="layout-wrapper">
        <header id="page-topbar">
            <div class="navbar-header">
                <div class="d-flex">
                    <!-- LOGO -->
                    <Logo />
                    <button type="button" @click="toggleMenu" class="btn btn-sm px-3 font-size-16 header-item"
                        id="vertical-menu-btn">
                        <i class="fa fa-fw fa-bars"></i>
                    </button>

                    <!-- App Search-->
                    <form class="app-search d-none d-lg-block">
                        <div class="position-relative">
                            <input type="text" class="form-control" placeholder="Search...">
                            <button class="btn btn-primary" type="button"><i
                                    class="bx bx-search-alt align-middle"></i></button>
                        </div>
                    </form>
                </div>
                <DropdownProfile />
            </div>
        </header>

        <!-- ========== Left Sidebar Start ========== -->
        <Sidebar />
        <!-- Left Sidebar End -->
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                    <!-- start page title -->
                    <router-view />
                    <!-- end page title -->
                </div> <!-- container-fluid -->
            </div>
            <!-- End Page-content -->
            <Footer />
        </div>
        <!-- end main content-->
    </div>
    <!-- END layout-wrapper -->
</template>

<script setup>
import feather from 'feather-icons';
import { onMounted, ref } from 'vue';
import Logo from './Partials/Logo.vue';
import Footer from './Partials/Footer.vue';
import Sidebar from './Partials/Sidebar.vue';
import DropdownProfile from './Partials/DropdownProfile.vue';

onMounted(() => {
    feather.replace();
})

const isCollapse = ref(false);
function toggleMenu() {
    isCollapse.value = !isCollapse.value;
    document.body.classList.toggle('sidebar-enable');
    if (window.matchMedia("(min-width: 1024px)").matches) {
        document.body.setAttribute('data-sidebar-size', isCollapse.value ? 'sm' : 'lg');
    }
}

</script>
