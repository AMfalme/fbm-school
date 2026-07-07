# Ministry Media Management System

## Overview

This feature allows the admin to upload multiple images with slugs/subtitles and descriptions for each ministry. The system provides a complete media library management interface for each ministry.

## Database Schema

### Collection: `ministry-media`

Each document in the `ministry-media` collection has the following structure:

```typescript
{
  ministrySlug: string,      // Links to the ministry (e.g., "christian-faith-academy")
  photoUrl: string,          // Cloudinary URL of the uploaded media
  title: string,             // Title of the media (required)
  subtitle?: string,         // Optional subtitle
  description: string,       // Description of the media
  mediaType: "image" | "video",  // Type of media
  displayOrder: number,      // Order for display (lower numbers appear first)
  createdAt: Timestamp,      // Auto-generated
  updatedAt: Timestamp,      // Auto-generated
  deleted?: boolean,         // Soft delete flag
  deletedAt?: Timestamp      // Soft delete timestamp
}
```

## Features Implemented

### 1. Ministry Media Manager Component
- **File**: `app/admin/ministries/library-management.tsx`
- Modal interface for managing ministry images
- Upload multiple images with metadata
- Add title, subtitle, and description for each image
- Drag-and-drop reordering (uses Up/Down buttons)
- Delete media with soft delete
- Media type support (image/video)
- Organized in folders by ministry slug in Cloudinary

### 2. Admin Ministries Page
- **File**: `app/admin/ministries/page.tsx`
- Added "Media" button to each ministry card
- Opens the MinistryMediaManager modal for that specific ministry
- All media is filtered by ministry slug

### 3. Ministry Gallery Component
- **File**: `app/components/MinistryGallery.tsx`
- Added `ministrySlug` prop support
- Fetches media from `ministry-media` collection when ministrySlug is provided
- Falls back to legacy `media` collection for backward compatibility
- Displays subtitle if available

## How to Use

### For Administrators

1. **Navigate to Admin Ministries**:
   - Go to `/admin/ministries`
   - You must have admin role in Firestore

2. **Access Media Library**:
   - Click the green "Media" button on any ministry card
   - This opens the Ministry Media Manager modal

3. **Upload New Media**:
   - Fill in the Title (required)
   - Add an optional Subtitle
   - Add a Description
   - Select Media Type (Image or Video)
   - Choose a file to upload
   - Click "Add Media"

4. **Manage Existing Media**:
   - View all uploaded media in the right panel
   - Use "↑ Up" and "↓ Down" to reorder
   - Click "Delete" to remove media (soft delete)

5. **Close Manager**:
   - Click the X button or "Close" button

### For Ministry Pages

Each ministry page can now use the updated `MinistryGallery` component:

```tsx
import MinistryGallery from "../../components/MinistryGallery";

// In your component:
<MinistryGallery
  categories={["classroom"]}  // Legacy - kept for fallback
  title="Gallery Title"
  subtitle="Optional subtitle"
  ministrySlug="your-ministry-slug"  // NEW - fetches from ministry-media collection
/>
```

## Ministry Slugs

Slugs are automatically generated from ministry names but can be manually edited. Examples:
- Christian Faith Academy → `christian-faith-academy`
- Bible College → `bible-college`
- Church Planting → `church-planting`

## File Storage

Uploaded files are stored in Cloudinary with the following folder structure:
```
ministries/
  ├── christian-faith-academy/
  │   ├── image1.jpg
  │   ├── image2.jpg
  │   └── ...
  ├── bible-college/
  │   └── ...
  └── ...
```

## Updating Existing Ministries

To update a ministry page to use the new media system:

1. Find the ministry page file in `app/ministries/[slug]/page.tsx`
2. Locate the MinistryGallery component
3. Add the `ministrySlug` prop matching the ministry slug in the database

Example (already done for Christian Faith Academy):
```tsx
<MinistryGallery
 chatbot
  categories={["classroom"]}
  title="Christian Faith Academy Gallery"
  subtitle="See our students excellence in academics, character development, and biblical upbringing."
  ministrySlug="christian-faith-academy"
/>
```

## Creating New Ministries with Media

1. Create the ministry in `/admin/ministries` with a name, slug (URL), and description
2. Open the ministry page file (create if doesn't exist)
3. Add the MinistryGallery component with the ministry slug
4. Go back to admin and click "Media" to upload images
5. Images will automatically appear on the ministry page

## Firestore Indexes

No additional indexes required for basic functionality. However, for better performance with large media libraries, you may want to create a composite index on:
- Collection: `ministry-media`
- Fields: `ministrySlug` (Ascending), `displayOrder` (Ascending)

## Security Rules

Ensure your Firestore security rules allow admins to read/write to the `ministry-media` collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ... existing rules ...
    
    match /ministry-media/{mediaId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Testing

1. Create a test ministry in admin
2. Click the "Media" button
3. Upload 3-5 images with different titles, subtitles, and descriptions
4. Reorder them using the Up/Down buttons
5. Visit the ministry page and verify the gallery displays correctly
6. Test the subtitle display in the gallery
7. Delete a media item and verify it's removed from both admin view and frontend

## Troubleshooting

**Media not showing on ministry page?**
- Check browser console for errors
- Verify the ministrySlug matches exactly
- Check that media exists in Firestore `ministry-media` collection with matching slug
- Ensure `deleted` field is not true

**Upload failing?**
- Verify Cloudinary credentials in `.env`
- Check that `/api/cloudinary-upload` endpoint is working
- Check browser console for upload errors

**Wrong media showing?**
- Clear browser cache
- Verify the ministrySlug prop matches the ministry slug in admin
- Check that the legacy `media` collection isn't overriding (if ministrySlug is provided, it should fetch from ministry-media first)

## Future Enhancements

Potential improvements for future versions:
- Drag-and-drop file upload with preview
- Bulk upload multiple files at once
- Image cropping/editing before upload
- Video transcoding for better compatibility
- Advanced filtering and search in media library
- Image alt-text and SEO metadata
- Bulk reordering with drag-and-drop
- Image compression optimization settings