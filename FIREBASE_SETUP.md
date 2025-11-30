# Firebase Configuration Steps

## Issue: Pet Addition and Shelter Registration Failing

### Fixed in Code:
1. ✅ Changed `user.uid` to `user.id` in Shelters.jsx
2. ✅ Changed `user.uid` to `user.id` in Profile.jsx
3. ✅ Fixed `getPetsByOwner` to use `getAllPets` with filters
4. ✅ Added better error logging in AddPet.jsx
5. ✅ Added 20 fabricated stories with seed button
6. ✅ **Made image upload optional - uses URL input instead of Firebase Storage**

### Image Upload Solution (No Storage Cost!)
Instead of uploading files to Firebase Storage (paid), you can now:
- **Use direct image URLs** from free services like:
  - imgur.com (free image hosting)
  - Google Drive (make image public, use direct link)
  - Any publicly accessible image URL

### Required Firebase Dashboard Settings:

#### 1. Firestore Database Rules
Go to: Firebase Console → Firestore Database → Rules

Replace with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Pets collection
    match /pets/{petId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.ownerId || request.auth.uid == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.uid);
    }
    
    // Adoption Requests
    match /adoptionRequests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    
    // Shelters
    match /shelters/{shelterId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
    
    // Stories
    match /stories/{storyId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    
    // Articles
    match /articles/{articleId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Newsletter
    match /newsletter/{emailId} {
      allow read: if false;
      allow create: if true;
    }
  }
}
```

#### 2. Storage Rules (Optional - Not Required)
Firebase Storage is NOT used in this project anymore. Image URLs are used instead.

If you want to enable file uploads later, go to: Firebase Console → Storage → Rules

Replace with:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Pet images
    match /pets/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow all authenticated users to upload
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### 3. Authentication Settings
Go to: Firebase Console → Authentication → Sign-in method

Enable:
- ✅ Google (already enabled)
- ✅ Add your domain to Authorized domains if testing locally

#### 4. Test After Setting Rules

1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh the page (Ctrl+Shift+R)
3. Try logging in with Google
4. Try adding a pet (with or without image)
5. Check browser console for any errors

### Common Issues:

**Issue: "Permission denied"**
- Solution: Check Firestore and Storage rules above

**Issue: "Failed to add pet"**
- Check browser console for exact error
- Verify you're logged in
- Verify your user has userType set (should be 'shelter' to add pets)

**Issue: Image upload fails**
- **Solution: Use Image URL option instead of file upload**
- Get free image URLs from:
  - imgur.com - Upload image, right-click → "Copy image address"
  - Google Photos/Drive - Share publicly, use direct link
  - Any public image hosting service

**Issue: Can't register shelter**
- User must be logged in
- User must have userType = 'shelter'
- Check Firestore rules allow writing to shelters collection

### Debug Steps:

1. Open Browser Console (F12)
2. Try to add a pet
3. Look for red error messages
4. Share the exact error message for more help

### Story Seeding:

Click "Add Sample Stories" button on Stories page to populate with 20 pre-made stories!
