import { ArticlesMenu } from './../../../articles/client/config/menu';
import { GalleryMenu }  from '../../../gallery/client/config/menu';
import { CoreMenu }     from './menu';
import { AppMenu }      from './../../../app/client/config/menu';

let menus: Array<any> = [];

export const Menu = menus.concat(ArticlesMenu, GalleryMenu, CoreMenu, AppMenu);
