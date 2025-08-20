/**
 * Image utility functions for task management
 */

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Validates if a file is a valid image
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please select a valid image file (JPEG, PNG, WebP, or GIF)'
    };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'Image size should be less than 5MB'
    };
  }
  
  return { isValid: true };
}

/**
 * Converts a File to a data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        resolve(e.target.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Resizes an image to fit within specified dimensions while maintaining aspect ratio
 */
export function resizeImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress image
      ctx.drawImage(img, 0, 0, width, height);
      
      const dataURL = canvas.toDataURL('image/jpeg', quality);
      resolve(dataURL);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    // Convert file to object URL for image loading
    const objectURL = URL.createObjectURL(file);
    
    const originalOnLoad = img.onload;
    img.onload = () => {
      URL.revokeObjectURL(objectURL);
      if (originalOnLoad) originalOnLoad.call(img, new Event('load'));
    };
    
    img.src = objectURL;
  });
}

/**
 * Extracts basic image metadata
 */
export function getImageMetadata(file: File): Promise<{
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        type: file.type,
        size: file.size,
        name: file.name
      });
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    const objectURL = URL.createObjectURL(file);
    
    const originalOnLoad = img.onload;
    img.onload = () => {
      URL.revokeObjectURL(objectURL);
      if (originalOnLoad) originalOnLoad.call(img, new Event('load'));
    };
    
    img.src = objectURL;
  });
}

/**
 * Creates a thumbnail from an image file
 */
export function createThumbnail(
  file: File,
  size: number = 150
): Promise<string> {
  return resizeImage(file, size, size, 0.9);
}