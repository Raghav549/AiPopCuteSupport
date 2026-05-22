import { User, Post, Comment } from '@/types';

export const AI_USER: User = {
  id: 'ai-001',
  numericId: 1,
  name: 'Ai',
  username: 'aipopgirl',
  email: 'aipopgirl@demo.com',
  password: 'ai123456789',
  role: 'creator',
  verified: true,
  avatar: '/ai-avatar.jpg',
  cover: '/ai-cover.jpg',
  bio: `My name is Ai.\nI'm taking part in the contest to decide who is pop and cute.\nMy hobbies are watching baseball, seeing some comedians and playing games.\nThe goal is to be a person who can support someone.\nI am working on studying, doing self-improvement and delivering.\n\nPlease cheer me on!!`,
  mixChannelId: '18641424',
  goalVotes: 10000,
  isPrivate: false,
  createdAt: '2024-01-01T00:00:00Z',
};

export const MOCK_USERS: User[] = [
  AI_USER,
  { id: 'user-002', numericId: 2, name: 'Sakura', username: 'sakura_fan', email: 'sakura@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', cover: '', bio: 'Ai supporter #1! 🌸', isPrivate: false, createdAt: '2024-01-15T00:00:00Z' },
  { id: 'user-003', numericId: 3, name: 'Yuki', username: 'yuki_cheers', email: 'yuki@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', cover: '', bio: 'Supporting Ai every day! ✨', isPrivate: false, createdAt: '2024-01-20T00:00:00Z' },
  { id: 'user-004', numericId: 4, name: 'Haru', username: 'haru_pop', email: 'haru@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', cover: '', bio: 'Pop culture fan 🎵', isPrivate: false, createdAt: '2024-02-01T00:00:00Z' },
  { id: 'user-005', numericId: 5, name: 'Mika', username: 'mika_cute', email: 'mika@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', cover: '', bio: 'Cute things lover 🎀', isPrivate: false, createdAt: '2024-02-10T00:00:00Z' },
  { id: 'user-006', numericId: 6, name: 'Ren', username: 'ren_gamer', email: 'ren@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', cover: '', bio: 'Gamer and Ai fan 🎮', isPrivate: false, createdAt: '2024-02-15T00:00:00Z' },
  { id: 'user-007', numericId: 7, name: 'Aoi', username: 'aoi_star', email: 'aoi@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', cover: '', bio: 'Star chaser ⭐', isPrivate: true, createdAt: '2024-02-20T00:00:00Z' },
  { id: 'user-008', numericId: 8, name: 'Kenta', username: 'kenta_baseball', email: 'kenta@demo.com', password: 'pass123', role: 'user', verified: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', cover: '', bio: 'Baseball and pop ⚾', isPrivate: false, createdAt: '2024-03-01T00:00:00Z' },
];

export const MOCK_POSTS: Post[] = [
  { id: 'post-001', userId: 'ai-001', caption: "Good morning everyone! 🌸 Today's goal: keep smiling and doing my best! Thank you all for your support! #popandcute #contest #ai", media: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['popandcute', 'contest', 'ai'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 342, commentsCount: 28, sharesCount: 15, viewsCount: 1520, downloadsCount: 45, createdAt: '2024-03-10T08:00:00Z' },
  { id: 'post-002', userId: 'ai-001', caption: "Baseball season is starting! ⚾ Can't wait to watch my favorite team play! Who else loves baseball? #baseball #hobbies", media: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['baseball', 'hobbies'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 256, commentsCount: 19, sharesCount: 8, viewsCount: 980, downloadsCount: 12, createdAt: '2024-03-09T15:30:00Z' },
  { id: 'post-003', userId: 'ai-001', caption: "Studying hard today! 📚 Self-improvement never stops. What are you all learning? #study #selfimprovement #growth", media: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['study', 'selfimprovement', 'growth'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 198, commentsCount: 32, sharesCount: 22, viewsCount: 870, downloadsCount: 5, createdAt: '2024-03-08T12:00:00Z' },
  { id: 'post-004', userId: 'ai-001', caption: "Gaming time! 🎮 Playing my favorite game to relax after studying. Balance is important! #gaming #relax #fun", media: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['gaming', 'relax', 'fun'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 421, commentsCount: 45, sharesCount: 18, viewsCount: 2100, downloadsCount: 30, createdAt: '2024-03-07T20:00:00Z' },
  { id: 'post-005', userId: 'ai-001', caption: "Thank you for 5000 cheer votes on this website! 🎉💛 Your support means the world to me! Let's keep going together! #milestone #thankyou #support", media: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['milestone', 'thankyou', 'support'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 567, commentsCount: 89, sharesCount: 45, viewsCount: 3200, downloadsCount: 8, createdAt: '2024-03-06T10:00:00Z' },
  { id: 'post-006', userId: 'user-002', caption: "Just voted for Ai today! 💛 She's amazing! #cheerforai #popandcute", media: '', mediaType: undefined, hashtags: ['cheerforai', 'popandcute'], visibility: 'public', allowComments: true, allowDownload: false, likesCount: 45, commentsCount: 5, sharesCount: 2, viewsCount: 120, downloadsCount: 0, createdAt: '2024-03-10T09:30:00Z' },
  { id: 'post-007', userId: 'user-003', caption: "Day 30 of cheering for Ai! 🌟 Never missing a day! #streak #support #ai", media: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['streak', 'support', 'ai'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 78, commentsCount: 12, sharesCount: 6, viewsCount: 340, downloadsCount: 3, createdAt: '2024-03-09T18:00:00Z' },
  { id: 'post-008', userId: 'user-004', caption: "Pop and cute contest is so fun to follow! Good luck everyone especially Ai! 🎵", media: '', mediaType: undefined, hashtags: ['popandcute', 'contest'], visibility: 'public', allowComments: true, allowDownload: false, likesCount: 34, commentsCount: 3, sharesCount: 1, viewsCount: 95, downloadsCount: 0, createdAt: '2024-03-08T14:00:00Z' },
  { id: 'post-009', userId: 'ai-001', caption: "Comedy show tonight was hilarious! 😂 Laughter is the best medicine! Who's your favorite comedian? #comedy #laughing #fun", media: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['comedy', 'laughing', 'fun'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 312, commentsCount: 56, sharesCount: 12, viewsCount: 1800, downloadsCount: 7, createdAt: '2024-03-05T22:00:00Z' },
  { id: 'post-010', userId: 'ai-001', caption: "New week, new goals! 💪 This week I want to: study more, improve my skills, and connect with all of you! #motivation #goals #newweek", media: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=600&fit=crop', mediaType: 'image', hashtags: ['motivation', 'goals', 'newweek'], visibility: 'public', allowComments: true, allowDownload: true, likesCount: 289, commentsCount: 41, sharesCount: 20, viewsCount: 1450, downloadsCount: 15, createdAt: '2024-03-04T07:00:00Z' },
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'cmt-001', userId: 'user-002', postId: 'post-001', content: 'You always brighten my day Ai! 🌟', likesCount: 12, createdAt: '2024-03-10T08:30:00Z' },
  { id: 'cmt-002', userId: 'user-003', postId: 'post-001', content: 'Keep going! We all believe in you! 💛', likesCount: 8, createdAt: '2024-03-10T09:00:00Z' },
  { id: 'cmt-003', userId: 'user-005', postId: 'post-001', content: 'Good morning! Sending all my support! ✨', likesCount: 5, createdAt: '2024-03-10T09:15:00Z' },
  { id: 'cmt-004', userId: 'user-004', postId: 'post-004', content: 'What game are you playing?? 🎮', likesCount: 15, createdAt: '2024-03-07T20:30:00Z' },
  { id: 'cmt-005', userId: 'ai-001', postId: 'post-004', parentId: 'cmt-004', content: 'It is a secret! 😄 But I love RPGs!', likesCount: 45, createdAt: '2024-03-07T21:00:00Z' },
  { id: 'cmt-006', userId: 'user-006', postId: 'post-005', content: 'Congrats on 5000! Next stop 10000! 🎉', likesCount: 22, createdAt: '2024-03-06T10:30:00Z' },
  { id: 'cmt-007', userId: 'user-008', postId: 'post-002', content: 'Baseball fans unite! ⚾ Which team?', likesCount: 9, createdAt: '2024-03-09T16:00:00Z' },
];

export const INITIAL_VOTE_COUNT = 6847;

export const CSS_FILTERS = [
  { name: 'Normal', value: 'none' },
  { name: 'Bright', value: 'brightness(1.2)' },
  { name: 'Warm', value: 'sepia(0.3) saturate(1.3)' },
  { name: 'Cool', value: 'hue-rotate(20deg) saturate(0.9)' },
  { name: 'Vintage', value: 'sepia(0.5) contrast(1.1)' },
  { name: 'Fade', value: 'saturate(0.7) brightness(1.1)' },
  { name: 'Drama', value: 'contrast(1.3) saturate(1.2)' },
  { name: 'Noir', value: 'grayscale(1) contrast(1.2)' },
  { name: 'Bloom', value: 'brightness(1.15) saturate(1.3)' },
  { name: 'Sunset', value: 'sepia(0.4) hue-rotate(-10deg) saturate(1.4)' },
  { name: 'Ocean', value: 'hue-rotate(180deg) saturate(0.8)' },
  { name: 'Forest', value: 'hue-rotate(90deg) saturate(0.7)' },
  { name: 'Pink', value: 'hue-rotate(320deg) saturate(1.2)' },
  { name: 'Crisp', value: 'contrast(1.2) brightness(1.05)' },
  { name: 'Soft', value: 'blur(0.5px) brightness(1.1)' },
  { name: 'Pop', value: 'saturate(1.8) contrast(1.1)' },
  { name: 'Matte', value: 'saturate(0.8) contrast(0.9) brightness(1.1)' },
  { name: 'Glow', value: 'brightness(1.3) saturate(1.1)' },
  { name: 'Shadow', value: 'brightness(0.85) contrast(1.2)' },
  { name: 'Dreamy', value: 'blur(0.3px) saturate(1.2) brightness(1.1)' },
];
