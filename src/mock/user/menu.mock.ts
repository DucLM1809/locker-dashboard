import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'products',
    label: 'Products',
    icon: 'dashboard',
    path: '/products',
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
