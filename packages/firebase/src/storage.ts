import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "./config";

const storage = getStorage(app);

export interface UploadProgressCallback {
  (progress: number): void;
}

/**
 * Uploads a product image to Firebase Storage and returns the public download URL.
 * @param file - The image File object to upload
 * @param productId - Used to namespace the file path: products/{productId}/{filename}
 * @param onProgress - Optional progress callback (0–100)
 */
export async function uploadProductImage(
  file: File,
  productId: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const storageRef = ref(storage, `products/${productId}/${Date.now()}.${ext}`);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(Math.round(progress));
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/**
 * Deletes a product image from Firebase Storage by its download URL.
 */
export async function deleteProductImage(url: string): Promise<void> {
  const imageRef = ref(storage, url);
  await deleteObject(imageRef);
}

export { storage };
