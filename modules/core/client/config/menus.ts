import { ArticlesMenu } from './../../../articles/client/config/menu';
import { GalleryMenu }  from '../../../gallery/client/config/menu';
import { CoreMenu }     from './menu';
import { AppMenu }      from './../../../app/client/config/menu';
import { RsvpMenu }     from './../../../rsvp/client/config/menu';
let menus: Array<any> = [];

export const Menu = menus.concat(RsvpMenu, GalleryMenu, CoreMenu, AppMenu);
