 export interface Chapter {
  id: number;
  chapter_number: number;
  content: string;
  author_username: string;
  created_at: string;
  author: number;
}

export interface StoryModel {
  id: number;
  title: string;
  created_at: string;
  is_completed: boolean;
  first_chapter: Chapter | null;
  co_authors: string[];
  total_chapters: number;
  comments?: CommentRead[];
  rating: number;
}

export interface StoryListModel {
  id: number;
  title: string;
  created_at: string;
  is_completed: boolean;
  chapters_count: number;
  co_authors_count: number;
  first_chapter_snippet: string; 
  co_authors: string[];
}

export interface CreateStoryPayload {
  title: string;
  first_chapter_content: string;
}

export interface VoteChapter {
  id: number;
  user_username: string;
  choice: boolean;
}

export interface VoteRequest {
  choice: boolean;
}

export interface RequestChapter {
  id: number;
  story: number;
  author_username: string;
  author_id: number;
  chapter_number: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  total_approvals: number;
  total_rejections: number;
  votes: VoteChapter[];
}

export interface CreateRequestPayload {
  content: string;
}

export interface NotificationListModel {
  id: number;
  is_read: boolean;
  created_at: string;
  story_title: string;
  author_username: string;
}

export interface NotificationDetailModel {
  id: number;
  is_read: boolean;
  created_at: string;
  story_title: string;
  requested_chapter: RequestChapter;
}

export interface UserProfileModel {
  id: number;
  username: string;
  email: string;
  about: string;
  profile_image: string | null;
  cover_image: string | null;
  notifications: NotificationListModel[];
  contributed_stories: StoryListModel[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}



export interface VoteStory {
  story_id: number;

  vote_number: number;
  

}


export interface VoteRead {
  id: number;
  user: number;
  vote_number: number;
  story_id: number;
  story_title: string;
  user_username: string;
  created_at: string

}



export interface CommentRequest {
  story_id?: number;
  content: string;




}




export interface CommentRead {
  id: number;
  author: number;
  story_id: number;
  content: string
  author_username: string;
  created_at: string

} 