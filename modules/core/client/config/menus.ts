import { GalleryMenu }  from '../../../gallery/client/config/menu';
import { CoreMenu }     from './menu';
import { AppMenu }      from './../../../app/client/config/menu';
import { RegistryMenu } from './../../../registry/client/config/menu';
import { RsvpMenu }     from './../../../rsvp/client/config/menu';

let menus: Array<any> = [];

export const Menu = menus.concat(RegistryMenu, RsvpMenu, GalleryMenu, CoreMenu, AppMenu);
