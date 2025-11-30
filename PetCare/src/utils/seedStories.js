import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const fabricatedStories = [
  {
    title: "Max Found His Forever Home! 🏡",
    story: "After spending 8 months at the shelter, Max finally met his perfect match. Sarah was looking for an active companion for her morning runs, and Max was the perfect fit! Now they're inseparable, exploring new trails every weekend. Max has gained 5 pounds of healthy weight and his coat is shinier than ever. Thank you to everyone who shared his story!",
    petName: "Max",
    petType: "Dog",
    adopterName: "Sarah Johnson",
    adoptionDate: "2024-10-15",
    imageUrl: "",
    likes: 234,
    comments: 45,
    shares: 67
  },
  {
    title: "Luna's Amazing Recovery Journey ❤️",
    story: "Luna was found abandoned and malnourished. Thanks to the dedicated care at Happy Paws Shelter and her new mom Jennifer, she's now a healthy, playful kitty who loves sunbathing by the window. Her transformation in just 3 months has been nothing short of miraculous. She now weighs a healthy 8 pounds and purrs non-stop!",
    petName: "Luna",
    petType: "Cat",
    adopterName: "Jennifer Martinez",
    adoptionDate: "2024-09-22",
    imageUrl: "",
    likes: 456,
    comments: 89,
    shares: 123
  },
  {
    title: "Charlie Brings Joy to Retirement Home 🎉",
    story: "Charlie, a gentle golden retriever, has found his calling as a therapy dog at Sunshine Retirement Home. After being adopted by the facility director Mike, Charlie now spends his days bringing smiles to residents. He's certified as a therapy dog and has become the most popular 'employee' at the home!",
    petName: "Charlie",
    petType: "Dog",
    adopterName: "Mike Anderson",
    adoptionDate: "2024-11-01",
    imageUrl: "",
    likes: 678,
    comments: 134,
    shares: 201
  },
  {
    title: "Bella Saves the Day! 🦸‍♀️",
    story: "This brave rescue dog proved adoption works both ways. Two months after being adopted by the Thompson family, Bella alerted them to a gas leak in the middle of the night, potentially saving their lives. She's now not just a pet, but a hero and beloved family guardian. The family says adopting Bella was the best decision they ever made.",
    petName: "Bella",
    petType: "Dog",
    adopterName: "Thompson Family",
    adoptionDate: "2024-08-10",
    imageUrl: "",
    likes: 892,
    comments: 167,
    shares: 345
  },
  {
    title: "Whiskers Found Love After 3 Years 😻",
    story: "At 7 years old, Whiskers had been at the shelter longer than any other cat. People always passed him by for kittens. Then Emma walked in looking for a mature, calm companion. It was love at first sight! Whiskers now rules Emma's apartment and has his own Instagram with 5,000 followers. Never give up on senior pets!",
    petName: "Whiskers",
    petType: "Cat",
    adopterName: "Emma Davis",
    adoptionDate: "2024-07-18",
    imageUrl: "",
    likes: 567,
    comments: 98,
    shares: 156
  },
  {
    title: "Rocky's Second Chance at Life 🌟",
    story: "Rocky was returned to the shelter three times due to his high energy. Then trainer James adopted him and channeled that energy into agility training. Now Rocky is a champion in local competitions and helps James train other rescue dogs. Sometimes all a dog needs is the right person who understands them!",
    petName: "Rocky",
    petType: "Dog",
    adopterName: "James Wilson",
    adoptionDate: "2024-06-05",
    imageUrl: "",
    likes: 743,
    comments: 112,
    shares: 189
  },
  {
    title: "Mittens Completes Our Family 👨‍👩‍👧‍👦",
    story: "After losing our elderly cat, our home felt empty. We adopted Mittens, a shy 2-year-old who had been overlooked. Within weeks, she came out of her shell and now greets us at the door every day. Our daughter says Mittens helped heal her broken heart. Rescue pets truly do rescue us back.",
    petName: "Mittens",
    petType: "Cat",
    adopterName: "Rodriguez Family",
    adoptionDate: "2024-10-30",
    imageUrl: "",
    likes: 421,
    comments: 76,
    shares: 134
  },
  {
    title: "Duke: From Streets to Sweet Home 🏠",
    story: "Duke survived on the streets for 2 years before being rescued. He was fearful of everyone. With patience and love from his adopter Rachel, Duke has transformed into a confident, loving companion. He now volunteers at the shelter to help socialize other fearful dogs. His journey inspires everyone who meets him.",
    petName: "Duke",
    petType: "Dog",
    adopterName: "Rachel Kim",
    adoptionDate: "2024-09-14",
    imageUrl: "",
    likes: 812,
    comments: 156,
    shares: 278
  },
  {
    title: "Snowball's Purr-fect Match ❄️",
    story: "Snowball, a beautiful white Persian, needed a quiet home due to her anxiety. Retired librarian Margaret provided exactly that. Now Snowball spends her days lounging on Margaret's lap while she reads. Margaret says Snowball gave her a purpose in retirement and they're both thriving together.",
    petName: "Snowball",
    petType: "Cat",
    adopterName: "Margaret Brown",
    adoptionDate: "2024-08-27",
    imageUrl: "",
    likes: 389,
    comments: 67,
    shares: 92
  },
  {
    title: "Buddy Became a Best Friend 🤝",
    story: "Ten-year-old Alex was struggling with anxiety. His parents adopted Buddy, a calm and patient Labrador, as an emotional support animal. The bond between them is incredible. Alex's confidence has soared, and Buddy never leaves his side. Their story shows the powerful healing impact of rescue pets on children.",
    petName: "Buddy",
    petType: "Dog",
    adopterName: "Miller Family",
    adoptionDate: "2024-10-08",
    imageUrl: "",
    likes: 956,
    comments: 203,
    shares: 412
  },
  {
    title: "Cleo: A Queen Finds Her Castle 👑",
    story: "Cleo was a stray mama cat who had kittens at the shelter. All her babies got adopted, but Cleo waited. Finally, cat lover Diana adopted her. Cleo now lives like royalty - she has her own room with a window perch overlooking the garden. Diana says Cleo deserved a palace after being such a good mom.",
    petName: "Cleo",
    petType: "Cat",
    adopterName: "Diana Foster",
    adoptionDate: "2024-07-30",
    imageUrl: "",
    likes: 534,
    comments: 89,
    shares: 145
  },
  {
    title: "Zeus Overcame His Past 💪",
    story: "Zeus came from an abusive situation and was aggressive towards men. Trainer and adopter Marcus worked with him for months using positive reinforcement. Today, Zeus is a certified therapy dog who helps veterans with PTSD. His transformation proves that with love and patience, any dog can heal.",
    petName: "Zeus",
    petType: "Dog",
    adopterName: "Marcus Green",
    adoptionDate: "2024-06-20",
    imageUrl: "",
    likes: 1023,
    comments: 234,
    shares: 567
  },
  {
    title: "Ginger's Golden Years Begin 🌅",
    story: "At 12 years old, Ginger was surrendered when her elderly owner passed away. Most people wanted young cats, but not retired nurse Patricia. She specifically wanted a senior cat to give them the best final years. Ginger and Patricia now spend peaceful days together, proving senior pets deserve love too.",
    petName: "Ginger",
    petType: "Cat",
    adopterName: "Patricia Lee",
    adoptionDate: "2024-09-03",
    imageUrl: "",
    likes: 678,
    comments: 145,
    shares: 234
  },
  {
    title: "Ace Became a Running Partner 🏃‍♂️",
    story: "Marathon runner Tom wanted a training companion. Ace, a high-energy Border Collie mix, was perfect! They train together every day, and Ace even completed his first 5K race. Tom says Ace keeps him motivated and accountable. They're now training for their first half-marathon together!",
    petName: "Ace",
    petType: "Dog",
    adopterName: "Tom Harris",
    adoptionDate: "2024-08-15",
    imageUrl: "",
    likes: 445,
    comments: 78,
    shares: 123
  },
  {
    title: "Pumpkin's Halloween Miracle 🎃",
    story: "Found abandoned on Halloween in a pumpkin patch, this tiny orange kitten was near death. The shelter nursed her back to health and named her Pumpkin. Artist Sophie adopted her and Pumpkin became her muse. Sophie now donates 10% of her art sales to the shelter that saved Pumpkin.",
    petName: "Pumpkin",
    petType: "Cat",
    adopterName: "Sophie Chen",
    adoptionDate: "2024-11-05",
    imageUrl: "",
    likes: 789,
    comments: 167,
    shares: 289
  },
  {
    title: "Bear Brings Adventure Home 🏔️",
    story: "Outdoor enthusiast Kevin wanted a hiking buddy. Bear, a Husky mix, was returned twice for being 'too active.' Kevin and Bear are now perfect partners, conquering mountain trails every weekend. Bear even has his own backpack! Kevin says Bear has made him a better hiker and a happier person.",
    petName: "Bear",
    petType: "Dog",
    adopterName: "Kevin Walsh",
    adoptionDate: "2024-07-12",
    imageUrl: "",
    likes: 612,
    comments: 134,
    shares: 198
  },
  {
    title: "Princess Finally Got Her Throne 👸",
    story: "Princess was labeled 'difficult' because she didn't like other pets. Single professional Lisa wanted just one cat to spoil. Princess is now the queen of Lisa's apartment, with custom furniture and gourmet meals. Lisa says Princess's loyalty and affection make every day special. One pet doesn't mean less love!",
    petName: "Princess",
    petType: "Cat",
    adopterName: "Lisa Wang",
    adoptionDate: "2024-10-12",
    imageUrl: "",
    likes: 423,
    comments: 89,
    shares: 134
  },
  {
    title: "Scout's Nose for Success 🐕‍🦺",
    story: "Adopted from the shelter at 6 months, Scout showed incredible intelligence. His adopter, police officer Jake, had him trained as a detection dog. Now Scout works alongside Jake, helping find missing persons. He's proven that rescue dogs can excel in professional roles. Scout is a true hero!",
    petName: "Scout",
    petType: "Dog",
    adopterName: "Jake Morrison",
    adoptionDate: "2024-05-25",
    imageUrl: "",
    likes: 1156,
    comments: 267,
    shares: 634
  },
  {
    title: "Olive Brightened Dark Days ☀️",
    story: "During a difficult time battling depression, Maya adopted Olive from the shelter. Olive's playful antics and unconditional love gave Maya a reason to get up each morning. Now thriving, Maya volunteers at the shelter to help others find their own 'Olive.' She says this little cat saved her life.",
    petName: "Olive",
    petType: "Cat",
    adopterName: "Maya Patel",
    adoptionDate: "2024-09-19",
    imageUrl: "",
    likes: 892,
    comments: 178,
    shares: 312
  },
  {
    title: "Rusty's Farm Life Dream 🌾",
    story: "City shelter dog Rusty was stressed and anxious. Then farmer Joe visited looking for a farm dog. Rusty found his calling! He now lives on 50 acres, herding chickens and greeting visitors at the farm stand. Joe says Rusty was meant to be a country dog and has never been happier. Location matters for pets too!",
    petName: "Rusty",
    petType: "Dog",
    adopterName: "Joe Campbell",
    adoptionDate: "2024-06-28",
    imageUrl: "",
    likes: 567,
    comments: 123,
    shares: 178
  }
];

export const seedStories = async () => {
  try {
    const storiesRef = collection(db, 'stories');
    let successCount = 0;
    
    for (const story of fabricatedStories) {
      try {
        await addDoc(storiesRef, {
          ...story,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        successCount++;
        console.log(`Added story: ${story.title}`);
      } catch (error) {
        console.error(`Failed to add story ${story.title}:`, error);
      }
    }
    
    console.log(`Successfully added ${successCount} out of ${fabricatedStories.length} stories`);
    return { success: true, count: successCount };
  } catch (error) {
    console.error('Error seeding stories:', error);
    return { success: false, error };
  }
};

export default fabricatedStories;
