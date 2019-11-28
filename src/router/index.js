import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/codeManage/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const adminRoutes = [
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/index'),
        meta: { title: 'Admin', icon: 'form' }
      }
    ]
  },
  {
    path: '/codeManage',
    component: Layout,
    redirect: '/codeManage/list',
    name: 'Example',
    meta: {
      title: '防伪码',
      icon: 'example'
    },
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/codeManage/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/codeManage/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/codeManage/index'),
        name: 'ArticleList',
        meta: { title: '查询/生成防伪码' }
      },
      {
        path: 'addCode',
        component: () => import('@/views/codeManage/addCode'),
        name: 'AddCode',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/codeManage/list' },
        hidden: true
      },
      {
        path: 'codePrefix',
        component: () => import('@/views/codeManage/codePrefix'),
        name: 'CodePrefix',
        meta: { title: '防伪码前缀' },
      }
    ]
  },
  {
    path:"/setting",
    component:Layout,
    name:"Setting",
    meta:{title:"系统设置",icon:"nested"},
    redirect:"/setting/database",
    children:[
      {
        path:"/setting/database",
        component:()=>import("@/views/setting/database/index"),
        name: 'database',
        meta:{title:"数据库配置"}
      },
      {
        path: 'database/edit/:id(\\d+)',
        component: () => import('@/views/setting/database/edit'),
        name: 'EditDatabase',
        meta: { title: '编辑数据库', noCache: true, activeMenu: '/setting/database' },
        hidden: true
      },
      {
        path: 'database/add',
        component: () => import('@/views/setting/database/add'),
        name: 'AddDatabase',
        meta: { title: '添加数据库', noCache: true, activeMenu: '/setting/database' },
        hidden: true
      },
      {
        path:"/setting/workorder",
        component:()=>import("@/views/setting/workorder/index"),
        name: 'workorder',
        meta:{title:"工单管理"}
      },
      {
        path: 'workorder/detail/:id(\\d+)',
        component: () => import('@/views/setting/workorder/detail'),
        name: 'DetailWorkOrder',
        meta: { title: '工单详情', noCache: true, activeMenu: '/setting/workorder' },
        hidden: true
      },
      {
        path:"/setting/message",
        component:()=>import("@/views/setting/message/index"),
        name: 'message',
        meta:{title:"系统消息"}
      },
      {
        path: 'message/detail/:id(\\d+)',
        component: () => import('@/views/setting/message/detail'),
        name: 'DetailMessage',
        meta: { title: '系统详情', noCache: true, activeMenu: '/setting/message' },
        hidden: true
      },
      {
        path: 'message/add',
        component: () => import('@/views/setting/message/addMessage'),
        name: 'AddMessage',
        meta: { title: '添加系统消息', noCache: true, activeMenu: '/setting/message' },
        hidden: true
      },
      {
        path:"/setting/password",
        component:()=>import("@/views/setting/password/index"),
        name: 'password',
        meta:{title:"密码修改"}
      },
    ]
  },
  {
    path:"/enterpriseManage",
    component:Layout,
    children: [
      {
        path: '/enterpriseManage',
        name: 'EnterpriseManage',
        component: () => import('@/views/enterpriseManage/index'),
        meta: { title: '企业管理', icon: 'form' }
      },
      {
        path: '/enterpriseManage/config/:id(\\d+)',
        component: () => import('@/views/enterpriseManage/config'),
        name: 'enterpriseManage',
        meta: { title: '企业详情/配置', noCache: true, activeMenu: '/enterpriseManage' },
        hidden: true
      }
    ]
  },
]

export const userRoutes = [
  {
    path: '/test2',
    component: Layout,
    children: [
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/test2/index'),
        meta: { title: 'Edite', icon: 'form' }
      }
    ]
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
