import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const defaultArticles = [
  {
    title: 'New Pet Parent Survival Guide',
    description: 'Day-by-day checklist covering supplies, vet visits, bonding, and house rules for the first 30 days with your adopted pet.',
    category: 'new-parent',
    author: 'Dr. Sara Khan',
    readTime: '7 min read',
    featured: true
  },
  {
    title: 'Vaccination Timeline for Dogs & Cats',
    description: 'Up-to-date schedule for core and optional vaccines plus tips to keep records organised.',
    category: 'health',
    author: 'Happy Paws Clinic',
    readTime: '5 min read',
    featured: true
  },
  {
    title: 'DIY Healthy Treats Under 10 Minutes',
    description: 'Three vet-approved recipes using pantry ingredients that work for most breeds and sizes.',
    category: 'nutrition',
    author: 'Chef Ali Rehman',
    readTime: '4 min read',
    featured: false
  },
  {
    title: 'Leash Reactivity: Training Plan That Works',
    description: 'Step-by-step desensitisation routine plus printable progress tracker for reactive pups.',
    category: 'training',
    author: 'K9 Coach Maria',
    readTime: '9 min read',
    featured: false
  },
  {
    title: 'Seasonal Grooming Checklist',
    description: 'Brush types, bath frequency, and coat-care reminders for every season of the year.',
    category: 'grooming',
    author: 'Purrfect Styles Studio',
    readTime: '6 min read',
    featured: false
  },
  {
    title: 'How to Decode Common Cat Behaviours',
    description: 'From slow blinks to midnight zoomies, learn what your feline is trying to tell you.',
    category: 'behavioral',
    author: 'Feline Whisperers',
    readTime: '8 min read',
    featured: false
  },
  {
    title: 'Emergency Prep for Pet Owners',
    description: 'Printable emergency card, go-bag essentials, and how to include pets in family drills.',
    category: 'health',
    author: 'Rescue Ready Initiative',
    readTime: '10 min read',
    featured: true
  },
  {
    title: 'Choosing the Right Food Bowl',
    description: 'Material pros/cons (stainless, ceramic, silicone) and how bowl design impacts digestion.',
    category: 'nutrition',
    author: 'PetGear Lab',
    readTime: '3 min read',
    featured: false
  }
];

export const seedArticles = async () => {
  try {
    const articlesRef = collection(db, 'articles');
    const createdIds = [];

    for (const article of defaultArticles) {
      const docRef = await addDoc(articlesRef, {
        ...article,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      createdIds.push(docRef.id);
    }

    return { success: true, ids: createdIds };
  } catch (error) {
    console.error('Error seeding articles:', error);
    return { success: false, error };
  }
};

export default defaultArticles;
