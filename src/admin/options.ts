import { AdminJSOptions } from 'adminjs';
import bcrypt from 'bcrypt';

import {componentLoader, components} from './component-loader.js';
import cloudinary from '../config/cloudinary.js';

import { Gallery } from '../models/Gallery.js';
import { Menu } from '../models/Menu.js';
import { Popup } from '../models/Popup.js';
import { User } from '../models/User.js';

const customGalleryDeleteAfter = async (res: any, req: any, context: any) => {
    const { record } = context;
    try {
       await cloudinary.uploader.destroy(record.params.cloudinaryPublicId);
    } catch (error) {
        console.error("Failed to delete image from Cloudinary: ", error);
    }
    return res;
}

const customPopupDeleteAfter = async (res: any, req: any, context: any) => {
    const { record } = context;
    try {
       await cloudinary.uploader.destroy(record.params.cloudinaryPublicId);
    } catch (error) {
        console.error("Failed to delete image from Cloudinary: ", error);
    }
    return res;
}

const customBulkDeleteAfter = async (res: any, req: any, context: any) => {
    const { records } = context;
    const publicIds = records.map((record: any) => record.params.cloudinaryPublicId);
    try {
       await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
        console.error("Failed to delete images from Cloudinary: ", error);
    }
    return res;
}
const galleryResource = {
  resource: Gallery, 
  options: { name: 'Gallery',  
    listProperties: ['title', '_id', 'description', 'imageUrl'],
    showProperties: ['title', '_id', 'description', 'imageUrl', 'cloudinaryPublicId'],
    actions:  {
      new: {
        component: components.CustomGalleryUploadComponent,
        isVisible: true,
      },
      delete: {
        after: [customGalleryDeleteAfter]
      },
      bulkDelete: {
        after: [customBulkDeleteAfter]
      }
    },
    properties: {
      imageUrl: {
        type: 'string',
        components: {
          show: components.CustomShow,
          list: components.RandomPicture,
          edit: components.CustomImageUploadComponent
        },
        
      },
      cloudinaryPublicId: {
        isVisible: false,
      }
    }
  }
}

const hashPassword = async (request: any, context: any) => {
  const { payload } = request;
  if (payload.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    payload.password = hashedPassword;
  }
  return request;
}

const popupResource = {
  resource: Popup, 
  options: { name: 'Popup',
    listProperties: ['title', '_id', 'imageUrl', 'linkUrl', 'isActive'],
    editProperties: ['title', '_id', 'imageUrl', 'linkUrl', 'isActive'],
    actions: {
      new: {
        component: components.CustomPopupUploadComponent,
        isVisible: true,
      },
      delete: {
        after: [customPopupDeleteAfter]
      },
      bulkDelete: {
        after: [customBulkDeleteAfter]
      }
    },
    properties: {
      imageUrl: {
        type: 'string',
        components: {
          show: components.CustomShow,
          list: components.RandomPicture,
          edit: components.CustomImageUploadComponent
        }
    }
  }
}
}

const userResource = {
  resource: User,
  options: { name: 'User',
    navigation: {name: 'Admin Management', icon: 'User'},
    listProperties: ['name', 'email', 'updatedAt'],
    editProperties: ['name','email', 'password'],
    actions: {
        new: {
          before: [hashPassword]
        }
    },
    properties: {
      password: {
        type: 'string',
        isVisible: { list: false, filter: false, show: false, edit: true },
        components: {
          edit: components.CustomPasswordComponent,
        }
      },
    },
  }
}

const options: AdminJSOptions = {
  dashboard: {
    component: components.Dashboard,
  },
  componentLoader,
  rootPath: '/admin',
  branding: {
    companyName: 'Newasuli',
    favicon: '/assets/logo.png',
    logo: '/assets/logo.png',
    withMadeWithLove: false,
  },
  assets: {
    styles: ['/style.css'],
  },
  resources: [
    galleryResource,
    // menuResource,
    popupResource,
    userResource
  ],
  databases: [],
};

export default options;
