import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/Layout/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Auth/Login.vue"),
      },
    ],
  },
  {
    path: "/app",
    component: () => import("@/components/Layout/DefaultLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/Index.vue"),
      },
      // user path
      {
        path: "user",
        name: "UserIndex",
        component: () => import("@/views/User/Index.vue"),
      },
      {
        path: "user/create",
        name: "UserCreate",
        component: () => import("@/views/User/Create.vue"),
      },
      {
        path: "user/:id/edit",
        name: "UserEdit",
        component: () => import("@/views/User/Edit.vue"),
        props: true,
      },
      // role path
      {
        path: "role",
        name: "RoleIndex",
        component: () => import("@/views/Role/Index.vue"),
      },
      {
        path: "role/create",
        name: "RoleCreate",
        component: () => import("@/views/Role/Create.vue"),
      },
      {
        path: "role/:id/edit",
        name: "RoleEdit",
        component: () => import("@/views/Role/Edit.vue"),
        props: true,
      },
      {
        path: "role/:id/assign",
        name: "RoleAssign",
        component: () => import("@/views/Role/Assign.vue"),
        props: true,
      },
      // permission path
      {
        path: "permission",
        name: "PermissionIndex",
        component: () => import("@/views/Permission/Index.vue"),
      },
      {
        path: "permission/create",
        name: "PermissionCreate",
        component: () => import("@/views/Permission/Create.vue"),
      },
      {
        path: "permission/:id/edit",
        name: "PermissionEdit",
        component: () => import("@/views/Permission/Edit.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
