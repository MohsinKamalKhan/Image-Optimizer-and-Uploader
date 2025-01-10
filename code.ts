import { createClient } from "@/utils/supabase/server";
import fetch from "node-fetch";
import sharp from "sharp";

const supabase = createClient();

const uploadImageToStorage = async (
  imgUrl: string,
  profId: number,
  bucket: string
): Promise<string | null> => {
  const fileName = `${profId}.webp`;
  const res = await fetch(imgUrl);

  if (!res.ok) {
    console.error(`Failed to fetch image from URL: ${imgUrl}`);
    return null;
  }

  const buffer = await res.buffer();

  const compressedBuffer = await sharp(buffer)
    .resize({ width: 500 })
    .webp({ quality: 75 })
    .toBuffer();

  // Upload the new image to Supabase storage
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, compressedBuffer, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
};

export const updateProfessorImage = async (profId: number, imgUrl: string): Promise<void> => {
    const newImageUrl = await uploadImageToStorage(imgUrl, profId, "prof_images");

    if (newImageUrl) {
      const { data, error } = await supabase
        .from("professors")
        .update({ img_src: newImageUrl })
        .eq("prof_id", profId);

      if (error) {
        console.error("Error updating professor image:", error.message);
      } else {
        console.log(`Professor ${profId}'s image updated successfully!`);
      }
    } else {
      console.error("Failed to upload image to Supabase storage.");
    }
};
