# Sangvita Admin Panel - Setup Guide

## Environment Variables Setup

### 1. Cloudinary Setup (for image uploads)

**Steps:**

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Sign up for a free account if you don't have one
3. In the Dashboard, you'll see your **Cloud Name** - copy this
4. Go to Settings → Upload → Add upload preset
5. Create an **Unsigned** upload preset (allows client-side uploads)
6. Copy the preset name

**Add to `.env.local`:**

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. MongoDB Atlas Setup (optional - currently using localStorage)

**Future setup for database:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a Cluster (Free tier available)
4. Get connection string from Connect → Drivers
5. Replace `<username>`, `<password>`, and `<database>` in the connection string

**Add to `.env.local`:**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sangvita
MONGODB_DB_NAME=sangvita
```

## Product Schema Changes

### Old Schema (removed):

- `rating`: number
- `reviews`: number
- `image`: string (single emoji)

### New Schema:

- `description`: string (product details)
- `images`: string[] (array of Cloudinary image URLs)

## How to Use the Admin Panel

### Login

- **Email:** admin@sangvita.com
- **Password:** Admin@1234

### Add Product

1. Go to Admin → Products → Add Product
2. Fill in: Name, Category, Price, MRP, Description, Tag
3. Click "Product Images" to upload multiple images
4. Images upload to Cloudinary automatically
5. Click "Save Product"

### Edit Product

1. Go to Admin → Products
2. Click "Edit" on a product
3. All fields are pre-filled with existing data
4. Add/remove images as needed
5. Click "Update Product"

### Manage Marquee

1. Go to Admin → Marquee
2. Click "Add Marquee" to add announcements
3. A prompt will ask for the text
4. Edit or Delete existing marquee items

## Notes

- Data is currently stored in browser localStorage (persists across sessions)
- For production, integrate MongoDB Atlas following the setup steps above
- Images are stored on Cloudinary (no server storage needed)
- Admin credentials are currently hardcoded (use environment variables for production)
