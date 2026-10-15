export type UserRole = 'admin' | 'member';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  balance: number;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
}

export interface Reward {
  id: string;
  userId: string;
  offerId: string;
  title: string;
  amount: number;
  offerType: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid';
  createdAt: string;
  paymentMethod: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface AppState {
  users: AppUser[];
  offers: Offer[];
  rewards: Reward[];
  payouts: PayoutRequest[];
  supportMessages: SupportMessage[];
  sessionUserId: string | null;
}

const STORAGE_KEY = 'dailyearn-jay-state';

export const initialUsers: AppUser[] = [
  { id: 'admin-1', name: 'JAY Admin', email: 'admin@dailyearn.co.za', password: 'admin123', role: 'admin', balance: 0, createdAt: '2026-10-01T12:00:00.000Z' },
  { id: 'member-1', name: 'Alicia Moodley', email: 'member@dailyearn.co.za', password: 'member123', role: 'member', balance: 0, createdAt: '2026-10-02T12:00:00.000Z' },
];

export const initialOffers: Offer[] = [
  { id: 'offer-1', title: 'Brand visit survey', description: 'Share your honest feedback on a retail experience questionnaire.', category: 'Survey', reward: 80 },
  { id: 'offer-2', title: 'Product review task', description: 'Write a brief product review after trying a promotional offer.', category: 'Content', reward: 120 },
  { id: 'offer-3', title: 'Digital engagement check', description: 'Confirm whether a campaign landing page loads and is clear to understand.', category: 'Verification', reward: 65 },
  { id: 'offer-4', title: 'Travel discovery form', description: 'Complete one short activity-based travel discovery response.', category: 'Research', reward: 90 },
  { id: 'offer-5', title: 'Retail loyalty feedback', description: 'Provide high-quality feedback on a loyalty program usability test.', category: 'Survey', reward: 110 },
  { id: 'offer-6', title: 'App usability review', description: 'Rate the checkout flow and identify any issues in a mobile experience.', category: 'Testing', reward: 150 },
];

export const initialRewards: Reward[] = [
  { id: 'reward-1', userId: 'member-1', offerId: 'offer-1', title: 'Brand visit survey', amount: 80, offerType: 'Survey', status: 'confirmed', createdAt: '2026-10-05T10:00:00.000Z' },
  { id: 'reward-2', userId: 'member-1', offerId: 'offer-2', title: 'Product review task', amount: 120, offerType: 'Content', status: 'pending', createdAt: '2026-10-09T12:00:00.000Z' },
  { id: 'reward-3', userId: 'member-1', offerId: 'offer-3', title: 'Digital engagement check', amount: 65, offerType: 'Verification', status: 'confirmed', createdAt: '2026-10-10T16:00:00.000Z' },
];

export const initialPayouts: PayoutRequest[] = [
  { id: 'payout-1', userId: 'member-1', amount: 250, status: 'pending', createdAt: '2026-10-11T13:00:00.000Z', paymentMethod: 'Bank transfer' },
];

export const defaultState: AppState = {
  users: initialUsers,
  offers: initialOffers,
  rewards: initialRewards,
  payouts: initialPayouts,
  supportMessages: [],
  sessionUserId: 'member-1',
};

export function getAppState(): AppState {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as AppState;
    } catch {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    }
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  return defaultState;
}

export function saveAppState(nextState: AppState) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const appState = getAppState();
  return appState.users.find((user) => user.id === appState.sessionUserId) ?? null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    const appState = getAppState();
    saveAppState({ ...appState, sessionUserId: null });
    window.location.href = '/login';
  }
}
