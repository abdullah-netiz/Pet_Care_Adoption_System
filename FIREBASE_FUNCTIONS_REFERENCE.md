# Firebase Service Functions Reference

Quick reference guide for all available Firebase functions in your Pet Care Adoption System.

---

## 📂 Import

```javascript
import {
  createPet,
  getAllPets,
  getPetById,
  getPetsByOwner,
  updatePet,
  deletePet,
  createAdoptionRequest,
  getAdoptionRequests,
  updateAdoptionRequest,
  createStory,
  getAllStories,
  updateStoryEngagement,
  createShelter,
  getAllShelters,
  createArticle,
  getAllArticles,
  subscribeNewsletter,
  updateUserProfile
} from '../services/firebaseService';
```

---

## 🐾 Pet Functions

### `createPet(petData)`
Create a new pet listing.

**Parameters**:
```javascript
{
  name: string,
  type: string,          // "Dog", "Cat", "Bird", etc.
  breed: string,
  age: number,
  gender: string,        // "Male" or "Female"
  size: string,          // "Small", "Medium", "Large"
  city: string,
  description: string,
  medicalHistory: string,
  vaccinated: boolean,
  spayedNeutered: boolean,
  images: array,         // Array of Firebase Storage URLs
  ownerId: string,
  ownerName: string,
  ownerEmail: string,
  status: string         // "available", "pending", "adopted"
}
```

**Returns**: `Promise<string>` (petId)

**Example**:
```javascript
const petId = await createPet({
  name: "Buddy",
  type: "Dog",
  breed: "Golden Retriever",
  age: 2,
  gender: "Male",
  size: "Large",
  city: "New York",
  description: "Friendly and energetic",
  medicalHistory: "Up to date on all shots",
  vaccinated: true,
  spayedNeutered: true,
  images: ["https://storage.firebase.com/..."],
  ownerId: user.uid,
  ownerName: user.firstName + " " + user.lastName,
  ownerEmail: user.email,
  status: "available"
});
```

---

### `getAllPets()`
Get all available pets.

**Returns**: `Promise<Array>` of pet objects

**Example**:
```javascript
const pets = await getAllPets();
console.log(pets); // [{ id: "abc123", name: "Buddy", ... }]
```

---

### `getPetById(petId)`
Get a specific pet by ID.

**Parameters**: `petId` (string)

**Returns**: `Promise<Object>` pet object

**Example**:
```javascript
const pet = await getPetById("abc123");
console.log(pet.name); // "Buddy"
```

---

### `getPetsByOwner(ownerId)`
Get all pets belonging to a specific owner.

**Parameters**: `ownerId` (string) - User ID

**Returns**: `Promise<Array>` of pet objects

**Example**:
```javascript
const myPets = await getPetsByOwner(user.uid);
console.log(`You have ${myPets.length} pets listed`);
```

---

### `updatePet(petId, updates)`
Update a pet's information.

**Parameters**:
- `petId` (string)
- `updates` (object) - Fields to update

**Returns**: `Promise<void>`

**Example**:
```javascript
await updatePet("abc123", {
  age: 3,
  description: "Updated description",
  status: "adopted"
});
```

---

### `deletePet(petId)`
Delete a pet listing.

**Parameters**: `petId` (string)

**Returns**: `Promise<void>`

**Example**:
```javascript
await deletePet("abc123");
```

---

## 💌 Adoption Request Functions

### `createAdoptionRequest(requestData)`
Create a new adoption request.

**Parameters**:
```javascript
{
  petId: string,
  petName: string,
  adopterId: string,
  adopterName: string,
  adopterEmail: string,
  ownerId: string,
  ownerName: string,
  message: string,
  status: string         // "pending", "approved", "rejected"
}
```

**Returns**: `Promise<string>` (requestId)

**Example**:
```javascript
await createAdoptionRequest({
  petId: "abc123",
  petName: "Buddy",
  adopterId: user.uid,
  adopterName: `${user.firstName} ${user.lastName}`,
  adopterEmail: user.email,
  ownerId: pet.ownerId,
  ownerName: pet.ownerName,
  message: "I would love to adopt this pet!",
  status: "pending"
});
```

---

### `getAdoptionRequests(userId, userType)`
Get adoption requests for a user.

**Parameters**:
- `userId` (string)
- `userType` (string) - "adopter" or "shelter"

**Returns**: `Promise<Array>` of request objects

**Behavior**:
- If `userType === "shelter"`: Returns requests where user is owner (incoming)
- If `userType === "adopter"`: Returns requests where user is adopter (outgoing)

**Example**:
```javascript
// For shelter owners (incoming requests)
const incomingRequests = await getAdoptionRequests(user.uid, "shelter");

// For adopters (outgoing requests)
const myRequests = await getAdoptionRequests(user.uid, "adopter");
```

---

### `updateAdoptionRequest(requestId, newStatus)`
Update the status of an adoption request.

**Parameters**:
- `requestId` (string)
- `newStatus` (string) - "approved" or "rejected"

**Returns**: `Promise<void>`

**Example**:
```javascript
// Approve request
await updateAdoptionRequest("req123", "approved");

// Reject request
await updateAdoptionRequest("req123", "rejected");
```

---

## 📖 Story Functions

### `createStory(storyData)`
Submit a new adoption success story.

**Parameters**:
```javascript
{
  petName: string,
  petType: string,
  adoptionDate: string,  // Date string or ISO format
  title: string,
  story: string,
  authorName: string,
  authorId: string,
  authorEmail: string
}
```

**Returns**: `Promise<string>` (storyId)

**Example**:
```javascript
await createStory({
  petName: "Buddy",
  petType: "Dog",
  adoptionDate: "2024-01-15",
  title: "Buddy brought so much joy!",
  story: "Adopting Buddy was the best decision we ever made...",
  authorName: `${user.firstName} ${user.lastName}`,
  authorId: user.uid,
  authorEmail: user.email
});
```

---

### `getAllStories()`
Get all adoption success stories.

**Returns**: `Promise<Array>` of story objects

**Example**:
```javascript
const stories = await getAllStories();
stories.forEach(story => {
  console.log(`${story.petName}: ${story.likes} likes`);
});
```

---

### `updateStoryEngagement(storyId, engagementType)`
Track story engagement (likes, comments, shares).

**Parameters**:
- `storyId` (string)
- `engagementType` (string) - "like", "comment", or "share"

**Returns**: `Promise<void>`

**Behavior**: Increments the counter for specified engagement type

**Example**:
```javascript
// Like a story
await updateStoryEngagement("story123", "like");

// Share a story
await updateStoryEngagement("story123", "share");

// Comment on a story
await updateStoryEngagement("story123", "comment");
```

---

## 🏥 Shelter Functions

### `createShelter(shelterData)`
Register a new shelter.

**Parameters**:
```javascript
{
  name: string,
  location: string,      // City name
  address: string,       // Full address for directions
  phone: string,
  email: string,
  hours: string,         // Operating hours
  description: string,   // Optional
  ownerId: string,
  ownerName: string,
  ownerEmail: string
}
```

**Returns**: `Promise<string>` (shelterId)

**Example**:
```javascript
await createShelter({
  name: "Happy Paws Rescue",
  location: "New York",
  address: "123 Main St, New York, NY 10001",
  phone: "+1 234 567 8900",
  email: "contact@happypaws.com",
  hours: "Mon-Sat: 10 AM - 6 PM",
  description: "We rescue and rehome pets in need",
  ownerId: user.uid,
  ownerName: `${user.firstName} ${user.lastName}`,
  ownerEmail: user.email
});
```

---

### `getAllShelters()`
Get all registered shelters.

**Returns**: `Promise<Array>` of shelter objects

**Example**:
```javascript
const shelters = await getAllShelters();
console.log(`Found ${shelters.length} shelters`);
```

---

## 📚 Article Functions

### `createArticle(articleData)`
Create a new pet care article.

**Parameters**:
```javascript
{
  title: string,
  description: string,
  category: string,      // "health", "nutrition", "training", etc.
  author: string,
  readTime: string,      // e.g., "5 min read"
  content: string,       // Full article content (optional)
  featured: boolean      // Whether to show in featured section
}
```

**Returns**: `Promise<string>` (articleId)

**Example**:
```javascript
await createArticle({
  title: "Complete Guide to Pet Vaccinations",
  description: "Everything you need to know about vaccines",
  category: "health",
  author: "Dr. Sarah Johnson, DVM",
  readTime: "8 min read",
  content: "Vaccinations are crucial for...",
  featured: true
});
```

---

### `getAllArticles(category)`
Get articles, optionally filtered by category.

**Parameters**: `category` (string, optional) - "health", "nutrition", "training", etc.

**Returns**: `Promise<Array>` of article objects

**Example**:
```javascript
// Get all articles
const allArticles = await getAllArticles();

// Get only health articles
const healthArticles = await getAllArticles("health");
```

---

## 📬 Newsletter Functions

### `subscribeNewsletter(email)`
Subscribe an email to the newsletter.

**Parameters**: `email` (string)

**Returns**: `Promise<void>`

**Error Handling**: Throws error if email already subscribed

**Example**:
```javascript
try {
  await subscribeNewsletter("user@example.com");
  console.log("Subscribed successfully!");
} catch (error) {
  if (error.message.includes("already subscribed")) {
    console.log("Email already subscribed");
  }
}
```

---

## 👤 User Functions

### `updateUserProfile(userId, updates)`
Update user profile information.

**Parameters**:
- `userId` (string)
- `updates` (object) - Fields to update

**Returns**: `Promise<void>`

**Example**:
```javascript
await updateUserProfile(user.uid, {
  firstName: "John",
  lastName: "Doe",
  phone: "+1 234 567 8900"
});
```

---

## 🔥 Firebase Storage Helper

### Upload Image to Firebase Storage
```javascript
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImage = async (file, userId) => {
  const timestamp = Date.now();
  const filename = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `pets/${userId}/${filename}`);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
};
```

---

## 🎯 Common Patterns

### Pattern 1: Load Data on Component Mount
```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllPets();
      setPets(data);
    } catch (error) {
      console.error("Error loading pets:", error);
    } finally {
      setLoading(false);
    }
  };
  
  loadData();
}, []);
```

---

### Pattern 2: Submit Form Data
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    setSubmitting(true);
    await createPet(formData);
    alert("Pet added successfully!");
    navigate("/profile");
  } catch (error) {
    console.error("Error adding pet:", error);
    alert("Failed to add pet");
  } finally {
    setSubmitting(false);
  }
};
```

---

### Pattern 3: Real-time Updates
```javascript
// After creating/updating, reload data
await createAdoptionRequest(data);
const updatedRequests = await getAdoptionRequests(user.uid, user.userType);
setRequests(updatedRequests);
```

---

## 🛡️ Error Handling Best Practices

```javascript
try {
  await someFirebaseFunction();
} catch (error) {
  // Log for debugging
  console.error("Detailed error:", error);
  
  // Show user-friendly message
  if (error.code === 'permission-denied') {
    alert("You don't have permission for this action");
  } else if (error.code === 'not-found') {
    alert("Item not found");
  } else {
    alert("An error occurred. Please try again.");
  }
}
```

---

## 📊 Timestamp Handling

```javascript
// Convert Firestore timestamp to JavaScript Date
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
```

---

## 🔐 Security Notes

1. **Authentication Required**: All write operations require user to be logged in
2. **Owner Validation**: Users can only update/delete their own resources
3. **Input Validation**: Always validate data before sending to Firebase
4. **Image Size Limits**: Recommend max 5MB per image
5. **Rate Limiting**: Consider implementing rate limits for submissions

---

## 📈 Performance Tips

1. **Pagination**: For large datasets, implement pagination
   ```javascript
   const loadMorePets = async (lastVisible) => {
     // Use Firestore startAfter() for pagination
   };
   ```

2. **Caching**: Store frequently accessed data in state
   ```javascript
   const [cachedArticles, setCachedArticles] = useState(null);
   if (cachedArticles) return cachedArticles;
   ```

3. **Lazy Loading**: Load images only when visible
   ```javascript
   <img loading="lazy" src={pet.images[0]} />
   ```

4. **Batch Operations**: For multiple updates, use batch writes
   ```javascript
   const batch = writeBatch(db);
   // Add multiple operations
   await batch.commit();
   ```

---

## 🆘 Troubleshooting

### Issue: "Permission Denied"
**Solution**: Check Firestore security rules, ensure user is authenticated

### Issue: "Document Not Found"
**Solution**: Verify document ID exists, check query filters

### Issue: "Storage Upload Failed"
**Solution**: Check file size, verify Storage rules, ensure proper file type

### Issue: "Duplicate Subscription"
**Solution**: This is intentional - check email before subscribing

---

This reference covers all Firebase functions available in your Pet Care Adoption System. Keep this handy while developing! 🚀
