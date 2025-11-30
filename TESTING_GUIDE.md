# Testing Guide for Firebase-Integrated Pet Care Adoption System

## 🧪 Complete Testing Workflow

Follow these steps to verify all Firebase functionality is working correctly.

---

## Prerequisites

1. **Start the Development Server**:
   ```bash
   cd PetCare
   npm run dev
   ```

2. **Open Browser**: Navigate to `http://localhost:5173`

3. **Have Two Browser Windows Ready**:
   - Window 1: For testing as a **Shelter Owner**
   - Window 2: For testing as an **Adopter**
   - (Use incognito/private mode for second window)

---

## Test 1: Authentication & User Registration

### Step 1: Register as Shelter Owner
1. Click "Login" in navbar
2. Click "Sign in with Google"
3. Select Google account
4. On user type selection page, choose **"Shelter"** card
5. ✅ **Verify**: Redirected to home page
6. ✅ **Verify**: Navbar shows your name
7. ✅ **Verify**: Can see "Add Pet" link in navbar

### Step 2: Register as Adopter (in second window)
1. Click "Login" in navbar
2. Click "Sign in with Google"
3. Select different Google account
4. On user type selection page, choose **"Adopter"** card
5. ✅ **Verify**: Redirected to home page
6. ✅ **Verify**: Navbar shows different options than shelter

---

## Test 2: Pet Management (Shelter Window)

### Add a Pet
1. Click "Add Pet" in navbar
2. Fill out the form:
   - Name: "Buddy"
   - Type: Dog
   - Breed: "Golden Retriever"
   - Age: 2
   - Gender: Male
   - Size: Large
   - City: "New York"
   - Description: "Friendly and energetic"
   - Upload 1-2 images
   - Check "Vaccinated"
3. Click "Add Pet"
4. ✅ **Verify**: Success message appears
5. ✅ **Verify**: Redirected to profile

### View Pet in Browse Pets
1. Click "Browse Pets" in navbar
2. ✅ **Verify**: Your pet "Buddy" appears in the grid
3. ✅ **Verify**: Pet image is displayed
4. Click on pet card
5. ✅ **Verify**: Pet detail page loads with all info

---

## Test 3: Adoption Request (Adopter Window)

### Request Adoption
1. Click "Browse Pets"
2. Find the pet added by shelter owner
3. Click on the pet card
4. Click "Request Adoption" button
5. Fill out the modal:
   - Message: "I would love to adopt this pet!"
6. Click "Submit Request"
7. ✅ **Verify**: Success message appears
8. ✅ **Verify**: Modal closes

### Check Notification Bell
1. Look at navbar notification bell (🔔)
2. ✅ **Verify**: Red badge with "1" appears
3. Click the bell
4. ✅ **Verify**: Dropdown shows your adoption request with status "pending"

---

## Test 4: Adoption Request Management (Shelter Window)

### View Incoming Request
1. Look at navbar notification bell
2. ✅ **Verify**: Badge shows "1" (incoming request)
3. Click bell to see request details
4. Click "Profile" in navbar
5. Scroll to "Adoption Requests" section
6. ✅ **Verify**: Request from adopter is listed
7. ✅ **Verify**: Shows adopter's name and message

### Approve the Request
1. Click "✓ Approve" button
2. ✅ **Verify**: Status changes to "Approved"
3. ✅ **Verify**: Button disappears (no longer pending)

### Check in Adopter Window
1. Switch to adopter window
2. Click notification bell
3. ✅ **Verify**: Status shows "Approved" with green badge
4. Go to Profile page
5. ✅ **Verify**: Request shows as approved

---

## Test 5: Stories Page

### Submit a Success Story (Adopter Window)
1. Click "Stories" in navbar
2. Click "Share Your Story" button
3. Fill out the form:
   - Pet Name: "Buddy"
   - Pet Type: Dog
   - Adoption Date: Select today's date
   - Title: "Buddy brought so much joy!"
   - Story: "Adopting Buddy was the best decision..."
4. Click "Submit Story"
5. ✅ **Verify**: Success alert appears
6. ✅ **Verify**: Story appears in the grid

### Interact with Stories
1. Find your story in the grid
2. Click the ❤️ (heart) button
3. ✅ **Verify**: Like count increases by 1
4. Click "Share" button
5. ✅ **Verify**: Alert says "Story link copied"
6. ✅ **Verify**: Share count increases by 1

### Filter Stories
1. Click "Dogs" filter tab
2. ✅ **Verify**: Only dog stories are displayed
3. Click "All Pets" to see all stories again

---

## Test 6: Shelters Page

### Register a Shelter (Shelter Window)
1. Click "Shelters" in navbar
2. Click "Register Your Shelter" button
3. Fill out the form:
   - Shelter Name: "Happy Paws Rescue"
   - City/Location: "New York"
   - Phone: "+1 234 567 8900"
   - Full Address: "123 Main St, New York, NY"
   - Email: "contact@happypaws.com"
   - Operating Hours: "Mon-Sat: 10 AM - 6 PM"
   - Description: "We rescue and rehome pets..."
4. Click "Register Shelter"
5. ✅ **Verify**: Success alert appears
6. ✅ **Verify**: Your shelter appears in the list

### Verify Pet Counts
1. Find your shelter in the list
2. ✅ **Verify**: Available Pets section shows:
   - Dogs: 1 (the pet you added)
   - Cats: 0
   - Birds: 0
   - Others: 0

### Test Directions
1. Click "Get Directions" button
2. ✅ **Verify**: Opens Google Maps in new tab
3. ✅ **Verify**: Address is pre-filled in search

### Test View Pets
1. Click "View Pets" button
2. ✅ **Verify**: Navigates to Browse Pets page
3. ✅ **Verify**: Shows only pets from that shelter

---

## Test 7: Resources Page

### Browse Articles
1. Click "Resources" in navbar
2. ✅ **Verify**: Articles load from database
3. Click "Health & Wellness" category
4. ✅ **Verify**: Only health articles are displayed
5. ✅ **Verify**: Article count updates

### Search Articles
1. Type "training" in search bar
2. Click Search
3. ✅ **Verify**: Only training-related articles show

### Subscribe to Newsletter
1. Scroll to newsletter section at bottom
2. Enter email: "test@example.com"
3. Click "Subscribe"
4. ✅ **Verify**: Success message appears
5. Try subscribing with same email again
6. ✅ **Verify**: Shows "already subscribed" message

---

## Test 8: Profile Page Complete Workflow

### Shelter Profile
1. Go to Profile page
2. ✅ **Verify**: Shows your pet listings
3. ✅ **Verify**: Shows adoption requests with approve/reject buttons
4. ✅ **Verify**: Statistics show correct numbers

### Edit Profile
1. Scroll to "Account Details" section
2. Change phone number
3. Click "Save Changes"
4. ✅ **Verify**: Success message appears
5. Refresh page
6. ✅ **Verify**: Changes are persisted

### Logout
1. Click "Logout" button in sidebar
2. ✅ **Verify**: Redirected to home page
3. ✅ **Verify**: Navbar shows "Login" instead of user name

---

## Test 9: Role-Based Access Control

### Try Accessing Restricted Pages
1. Log out (if logged in)
2. Try to visit `/add-pet` directly
3. ✅ **Verify**: Shown access denied or redirected

### Adopter Restrictions
1. Log in as adopter
2. Try to visit `/add-pet`
3. ✅ **Verify**: Shows "Access Denied" message
4. ✅ **Verify**: Can't see "Add Pet" in navbar

### Shelter Restrictions
1. Log in as shelter owner
2. Go to browse pets
3. Click on a pet
4. ✅ **Verify**: No "Request Adoption" button (can't request own pets)

---

## Test 10: Data Persistence

### Check Database
1. Perform some actions (add pet, submit story, etc.)
2. Close browser completely
3. Open browser again and navigate to site
4. Log in
5. ✅ **Verify**: All data is still there
6. ✅ **Verify**: Pets, stories, requests persist

### Check Images
1. Add pet with image
2. Log out and log back in
3. Go to browse pets
4. ✅ **Verify**: Pet images load correctly
5. ✅ **Verify**: Images are accessible from Firebase Storage

---

## 🐛 Common Issues & Solutions

### Issue: "No pets found"
- **Solution**: Make sure you're logged in as shelter and have added at least one pet

### Issue: Notification bell not updating
- **Solution**: Refresh the page or check that requests exist in database

### Issue: Images not uploading
- **Solution**: Check Firebase Storage rules, ensure file size < 5MB

### Issue: "Permission denied" errors
- **Solution**: Check Firestore security rules allow read/write for authenticated users

### Issue: Newsletter subscription fails
- **Solution**: Verify email format is correct and Firestore is accessible

---

## 📊 Expected Database Structure After Testing

```
Firestore Collections:

users/
  └── {userId}/
      ├── email: "user@example.com"
      ├── firstName: "John"
      ├── lastName: "Doe"
      ├── userType: "shelter"
      └── createdAt: Timestamp

pets/
  └── {petId}/
      ├── name: "Buddy"
      ├── type: "Dog"
      ├── ownerId: {userId}
      ├── images: ["https://..."]
      └── status: "available"

adoptionRequests/
  └── {requestId}/
      ├── petId: {petId}
      ├── adopterId: {userId}
      ├── ownerId: {userId}
      ├── status: "approved"
      └── message: "I would love..."

stories/
  └── {storyId}/
      ├── petName: "Buddy"
      ├── authorId: {userId}
      ├── likes: 1
      └── shares: 1

shelters/
  └── {shelterId}/
      ├── name: "Happy Paws"
      ├── ownerId: {userId}
      └── location: "New York"

articles/
  └── {articleId}/
      ├── title: "Pet Care Guide"
      ├── category: "health"
      └── featured: true

newsletter/
  └── {subscriptionId}/
      ├── email: "test@example.com"
      └── subscribedAt: Timestamp
```

---

## ✅ Testing Completion Checklist

- [ ] Two users registered (shelter + adopter)
- [ ] Pet added by shelter owner
- [ ] Pet visible in browse page
- [ ] Adoption request submitted
- [ ] Notification bell shows count
- [ ] Request approved by shelter
- [ ] Story submitted and visible
- [ ] Story liked and shared
- [ ] Shelter registered
- [ ] Pet counts displayed correctly
- [ ] Articles loaded by category
- [ ] Newsletter subscription works
- [ ] Profile editing works
- [ ] Data persists after logout
- [ ] Images upload and display
- [ ] Role-based access enforced
- [ ] All modals open/close properly
- [ ] Loading states appear
- [ ] Error messages display

---

## 🎯 Performance Benchmarks

Expected load times on good internet:
- Page load: < 2 seconds
- Firebase query: < 1 second
- Image upload: 2-5 seconds (depends on size)
- Real-time updates: Instant

---

## 🆘 Need Help?

If any test fails:
1. Check browser console for errors (F12)
2. Check Firebase console for data
3. Verify security rules in Firestore
4. Ensure Firebase config is correct in `.env`
5. Check that authentication is properly configured

---

## 🎊 Success!

If all tests pass, congratulations! Your Pet Care Adoption System is fully functional with:
- ✅ Complete Firebase integration
- ✅ Real-time data synchronization
- ✅ User authentication
- ✅ Role-based access control
- ✅ Image uploads
- ✅ Notifications
- ✅ CRUD operations for all entities

Your application is production-ready! 🚀
