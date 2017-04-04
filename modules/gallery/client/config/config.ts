import { OpaqueToken } from '@angular/core';

export interface PictureConfig {
  uploads : { 
    picture: {
      url: string,
      maxSize: number,
      allowedTypes: Array<string>
    }
  }
}

export const PICTURE_DI_CONFIG: PictureConfig = {
  uploads: {
    picture: {
      url: '/api/gallery',
      // 20 MB should be large enough
      maxSize: 1024 * 1024 * 20, // Bytes
      // generally accepted browser renderable image formats
      allowedTypes: ['image/png', 'image/gif', 'image/jpeg']
    }
  }
};
