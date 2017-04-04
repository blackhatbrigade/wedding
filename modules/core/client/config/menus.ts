import { ArticlesMenu } from './../../../articles/client/config/menu';
import { GalleryMenu }  from '../../../gallery/client/config/menu';
import { CoreMenu }     from './menu';

let menus: Array<any> = [];

export const Menu = menus.concat(ArticlesMenu, GalleryMenu, CoreMenu);
