export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused';

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null
  created_at: string;
  updated_at: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_monthly: number;
  price_yearly: number;
  stripe_price_id_monthly: string | null;
  stripe_price_id_yearly: string | null;
  features: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier_id: string;
  status: SubscriptionStatus;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  tier_id: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  youtube_url: string | null;
  duration_seconds: number | null;
  sort_order: number;
  is_published: boolean;
  is_free_preview: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string | null;
  last_position_seconds: number;
  updated_at: string;
}

export interface Workbook {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  file_url: string;
  thumbnail_url: string | null;
  tier_id: string | null;
  download_count: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  body: string;
  category: string | null;
  is_pinned: boolean;
  is_locked: boolean;
  lesson_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
}

export interface CommunityLike {
  id: string;
  user_id: string;
  post_id: string | null;
  comment_id: string | null;
  created_at: string;
}

export interface CommunityPostWithMeta extends CommunityPost {
  profile: Pick<Profile, 'display_name' | 'avatar_url'>;
  comment_count: number;
  like_count: number;
  user_has_liked: boolean;
}

export interface CommunityCommentWithMeta extends CommunityComment {
  profile: Pick<Profile, 'display_name' | 'avatar_url'>;
  like_count: number;
  user_has_liked: boolean;
}
