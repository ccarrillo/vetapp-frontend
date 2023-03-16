import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    moduleName: '',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: []
  },
  {
    path: 'dashboard/main',
    title: 'MENUITEMS.HOME.TEXT',
    moduleName: 'dashboard',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  //INICIO IMPLEMENTACION VETERINARIA
  {
    path: '',
    title: 'MENUITEMS.MAIN-VET.TEXT',
    moduleName: '',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: []
  },
  {
    path: '',
    title: 'MENUITEMS.VET-MANAGEMENT.TEXT',
    moduleName: 'managment',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'managment/enterprise',
        title: 'MENUITEMS.VET-MANAGEMENT.LIST.ENTERPRISE',
        moduleName: 'managment',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'managment/employee',
        title: 'MENUITEMS.VET-MANAGEMENT.LIST.EMPLOYEE',
        moduleName: 'managment',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'managment/user',
        title: 'MENUITEMS.VET-MANAGEMENT.LIST.USER',
        moduleName: 'managment',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.VET-GROUP.TEXT',
    moduleName: 'group',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'group/animal',
        title: 'MENUITEMS.VET-GROUP.LIST.ANIMALGROUP',
        moduleName: 'group',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'group/event',
        title: 'MENUITEMS.VET-GROUP.LIST.EVENTGROUP',
        moduleName: 'group',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'group/inventory',
        title: 'MENUITEMS.VET-GROUP.LIST.SEMENINVENTORYGROUP',
        moduleName: 'group',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
     
      {
        path: 'group/protocol',
        title: 'MENUITEMS.VET-GROUP.LIST.PROTOCOLGROUP',
        moduleName: 'group',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.VET-ANIMALS.TEXT',
    moduleName: 'animal',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'animal/general',
        title: 'MENUITEMS.VET-ANIMALS.LIST.GENERAL',
        moduleName: 'animal',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'animal/maintenance',
        title: 'MENUITEMS.VET-ANIMALS.LIST.MAINTENANCE',
        moduleName: 'animal',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'animal/parametro',
        title: 'MENUITEMS.VET-ANIMALS.LIST.PARAMETER',
        moduleName: 'animal',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'animal/parametrovalue',
        title: 'MENUITEMS.VET-ANIMALS.LIST.PARAMETERVALUE',
        moduleName: 'animal',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'animal/report',
        title: 'MENUITEMS.VET-ANIMALS.LIST.REPORT',
        moduleName: 'animal',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.VET-REPRODUCTION.TEXT',
    moduleName: 'reproduction',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
     
      {
        path: 'reproduction/inventario',
        title: 'MENUITEMS.VET-REPRODUCTION.LIST.INVENTORY-SEMEN',
        moduleName: 'reproduction',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.VET-HEALTH.TEXT',
    moduleName: 'health',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'health/events',
        title: 'MENUITEMS.VET-HEALTH.LIST.EVENTS',
        moduleName: 'health',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'health/protocol',
        title: 'MENUITEMS.VET-HEALTH.LIST.PROTOCOL',
        moduleName: 'health',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
     
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.VET-PRODUCTION.TEXT',
    moduleName: 'production',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'production/report',
        title: 'MENUITEMS.VET-PRODUCTION.LIST.REPORTS',
        moduleName: 'production',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      
      {
        path: 'production/heavy-milk',
        title: 'MENUITEMS.VET-PRODUCTION.LIST.HEAVY-MILK',
        moduleName: 'production',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      
      {
        path: 'production/daily-check',
        title: 'MENUITEMS.VET-PRODUCTION.LIST.DAILY-CHECK',
        moduleName: 'production',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.VET-ALIMENTATION.TEXT',
    moduleName: 'feeding',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'feeding/feeding',
        title: 'MENUITEMS.VET-ALIMENTATION.LIST.ALIMENTATION',
        moduleName: 'feeding',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'feeding/cost',
        title: 'MENUITEMS.VET-ALIMENTATION.LIST.COST',
        moduleName: 'feeding',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'feeding/formula',
        title: 'MENUITEMS.VET-ALIMENTATION.LIST.FORMULAS',
        moduleName: 'feeding',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'feeding/graphics',
        title: 'MENUITEMS.VET-ALIMENTATION.LIST.GRAPHICS',
        moduleName: 'feeding',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  }
  
  //FIN IMPLEMENTACION VETERINARIA
  /*{
    path: '',
    title: 'Authentication',
    moduleName: 'authentication',
    icon: 'user-check',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/authentication/signin',
        title: 'Sign In',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/authentication/signup',
        title: 'Sign Up',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/authentication/forgot-password',
        title: 'Forgot Password',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/authentication/locked',
        title: 'Locked',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/authentication/page404',
        title: '404 - Not Found',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/authentication/page500',
        title: '500 - Server Error',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Extra Pages',
    moduleName: 'extra-pages',
    icon: 'anchor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/extra-pages/blank',
        title: 'Blank Page',
        moduleName: 'extra-pages',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Multi level',
    moduleName: 'multilevel',
    icon: 'chevrons-down',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/multilevel/first1',
        title: 'First',
        moduleName: 'multilevel',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/',
        title: 'Second',
        moduleName: 'secondlevel',
        icon: '',
        class: 'ml-sub-menu',
        groupTitle: false,
        submenu: [
          {
            path: '/multilevel/secondlevel/second1',
            title: 'Second 1',
            moduleName: 'secondlevel',
            icon: '',
            class: 'ml-sub-sub-menu',
            groupTitle: false,
            submenu: []
          },
          {
            path: '/multilevel/secondlevel/second2',
            title: 'Second 2',
            moduleName: 'secondlevel',
            icon: '',
            class: 'ml-sub-sub-menu',
            groupTitle: false,
            submenu: []
          }
        ]
      },
      {
        path: '/multilevel/first3',
        title: 'Third',
        moduleName: 'multilevel',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  }*/
];
