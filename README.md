# **Image Optimizer and Uploader**

## **Project Description**
Image Optimizer and Uploader is a TypeScript-based utility that fetches an image from a given URL, compresses it, converts it into the WebP format, and uploads it to Supabase Storage. The project also updates a Supabase database with the new image URL, providing an end-to-end solution for managing optimized images.

This tool is particularly useful for web applications that require efficient image storage and delivery, ensuring faster load times and reduced bandwidth consumption.

---

## **Features**
- Fetches images from a given URL.
- Compresses images using the `sharp` library.
- Converts images to WebP format with adjustable quality.
- Resizes images for consistency.
- Uploads optimized images to Supabase Storage.
- Updates the database with the new image URL.

---

## **Prerequisites**
- Node.js installed on your system.
- A Supabase project with the required storage bucket and database table.
- Supabase client setup in the `@/utils/supabase/server` module.
- Access to the `sharp` library for image processing.

---

## **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
