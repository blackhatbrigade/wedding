import { GalleryMenu }  from '../../../gallery/client/config/menu';
import { CoreMenu }     from './menu';
import { AppMenu }      from './../../../app/client/config/menu';
import { RegistryMenu } from './../../../registry/client/config/menu';

let menus: Array<any> = [];

export const Menu = menus.concat(RegistryMenu, GalleryMenu, CoreMenu, AppMenu);
