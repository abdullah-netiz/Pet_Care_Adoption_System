import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  limit,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../firebase';

// Users Collection
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Pets Collection
export const createPet = async (petData) => {
  try {
    const petsRef = collection(db, 'pets');
    const docRef = await addDoc(petsRef, {
      ...petData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'available'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

export const getPet = async (petId) => {
  try {
    const petRef = doc(db, 'pets', petId);
    const petSnap = await getDoc(petRef);
    
    if (petSnap.exists()) {
      return { id: petSnap.id, ...petSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting pet:', error);
    throw error;
  }
};

export const getAllPets = async (filters = {}) => {
  try {
    let petsQuery = collection(db, 'pets');
    
    // Apply filters
    if (filters.type) {
      petsQuery = query(petsQuery, where('type', '==', filters.type));
    }
    if (filters.status) {
      petsQuery = query(petsQuery, where('status', '==', filters.status));
    }
    if (filters.ownerId) {
      petsQuery = query(petsQuery, where('ownerId', '==', filters.ownerId));
    }
    
    petsQuery = query(petsQuery, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(petsQuery);
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push({ id: doc.id, ...doc.data() });
    });
    
    return pets;
  } catch (error) {
    console.error('Error getting pets:', error);
    throw error;
  }
};

export const updatePet = async (petId, petData) => {
  try {
    const petRef = doc(db, 'pets', petId);
    await updateDoc(petRef, {
      ...petData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const petRef = doc(db, 'pets', petId);
    await deleteDoc(petRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};

// Adoption Requests Collection
export const createAdoptionRequest = async (requestData) => {
  try {
    const requestsRef = collection(db, 'adoptionRequests');
    const docRef = await addDoc(requestsRef, {
      ...requestData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating adoption request:', error);
    throw error;
  }
};

export const getAdoptionRequest = async (requestId) => {
  try {
    const requestRef = doc(db, 'adoptionRequests', requestId);
    const requestSnap = await getDoc(requestRef);
    
    if (requestSnap.exists()) {
      return { id: requestSnap.id, ...requestSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting adoption request:', error);
    throw error;
  }
};

export const getAdoptionRequests = async (userId, userType) => {
  try {
    let requestsQuery;
    
    if (userType === 'adopter') {
      // Get requests made by this adopter
      requestsQuery = query(
        collection(db, 'adoptionRequests'),
        where('adopterId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    } else {
      // Get requests for pets owned by this owner
      requestsQuery = query(
        collection(db, 'adoptionRequests'),
        where('ownerId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(requestsQuery);
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    
    return requests;
  } catch (error) {
    console.error('Error getting adoption requests:', error);
    throw error;
  }
};

export const updateAdoptionRequest = async (requestId, updates) => {
  try {
    const requestRef = doc(db, 'adoptionRequests', requestId);
    await updateDoc(requestRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating adoption request:', error);
    throw error;
  }
};

// Stories Collection
export const createStory = async (storyData) => {
  try {
    const storiesRef = collection(db, 'stories');
    const docRef = await addDoc(storiesRef, {
      ...storyData,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

export const getAllStories = async (filters = {}) => {
  try {
    let storiesQuery = collection(db, 'stories');
    
    if (filters.petType) {
      storiesQuery = query(storiesQuery, where('petType', '==', filters.petType));
    }
    
    storiesQuery = query(storiesQuery, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(storiesQuery);
    const stories = [];
    querySnapshot.forEach((doc) => {
      stories.push({ id: doc.id, ...doc.data() });
    });
    
    return stories;
  } catch (error) {
    console.error('Error getting stories:', error);
    throw error;
  }
};

export const updateStoryEngagement = async (storyId, field) => {
  try {
    const storyRef = doc(db, 'stories', storyId);
    await updateDoc(storyRef, {
      [field]: increment(1),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating story engagement:', error);
    throw error;
  }
};

// Shelters Collection
export const createShelter = async (shelterData) => {
  try {
    const sheltersRef = collection(db, 'shelters');
    const docRef = await addDoc(sheltersRef, {
      ...shelterData,
      rating: 0,
      reviews: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating shelter:', error);
    throw error;
  }
};

export const getAllShelters = async () => {
  try {
    const sheltersQuery = query(
      collection(db, 'shelters'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(sheltersQuery);
    const shelters = [];
    querySnapshot.forEach((doc) => {
      shelters.push({ id: doc.id, ...doc.data() });
    });
    
    return shelters;
  } catch (error) {
    console.error('Error getting shelters:', error);
    throw error;
  }
};

// Resources/Articles Collection
export const createArticle = async (articleData) => {
  try {
    const articlesRef = collection(db, 'articles');
    const docRef = await addDoc(articlesRef, {
      ...articleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

export const getAllArticles = async (category = null) => {
  try {
    let articlesQuery = collection(db, 'articles');
    
    if (category && category !== 'all' && category !== 'All') {
      articlesQuery = query(articlesQuery, where('category', '==', category));
    }
    
    articlesQuery = query(articlesQuery, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(articlesQuery);
    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    
    return articles;
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
  }
};

// Newsletter Subscriptions
export const subscribeNewsletter = async (email) => {
  try {
    const newsletterRef = collection(db, 'newsletter');
    await addDoc(newsletterRef, {
      email,
      subscribedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};
