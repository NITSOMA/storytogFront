import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config.token';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { 
  CreateRequestPayload, 
  CreateStoryPayload, 
  NotificationListModel, 
  NotificationDetailModel,
  RequestChapter, 
  StoryModel, 
  VoteChapter, 
  VoteRequest,
  PaginatedResponse, 
  StoryListModel,
  Chapter,
  VoteStory,
  VoteRead,
  CommentRequest,
  CommentRead
} from '../models/storyTypes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private config = inject(APP_CONFIG);
  private http = inject(HttpClient);
  private router = inject(Router);

  private storyApi = `${this.config.apiUrl}/story/`;
  private storyChapterRequest = `${this.config.apiUrl}/story/requests/`;
  private storyChapterVoteApi = `${this.config.apiUrl}/story/requests/vote/`;
  private storyFinishVoteApi = `${this.config.apiUrl}/story/finish/`;
  private storyNotificationApi = `${this.config.apiUrl}/story/notifications/`;
  private ChapterApi = `${this.config.apiUrl}/story/chapters/`;


  private SocialVoteAPi = `${this.config.apiUrl}/social/vote/`;
  private SocialCommentApi = `${this.config.apiUrl}/social/comment/`;

  getStories(ordering: string = 'latest', page: number = 1): Observable<PaginatedResponse<StoryListModel>> {
    let params = new HttpParams()
      .set('ordering', ordering)
      .set('page', page.toString());

    return this.http.get<PaginatedResponse<StoryListModel>>(this.storyApi, { params });
  }

  getStoryDetail(pk: number): Observable<StoryModel> {
    return this.http.get<StoryModel>(`${this.storyApi}${pk}/`);
  }

  getChapter(storyPk: number, chapterNumber: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.ChapterApi}${storyPk}/${chapterNumber}/`);
  }

  createStory(data: CreateStoryPayload): Observable<StoryModel> {
    return this.http.post<StoryModel>(this.storyApi, data);
  }

  addChapter(data: CreateRequestPayload, pk: number): Observable<RequestChapter> {
    return this.http.post<RequestChapter>(`${this.storyChapterRequest}${pk}/`, data);
  }

  voteChapter(choice: VoteRequest, pk: number): Observable<VoteChapter> {
    return this.http.post<VoteChapter>(`${this.storyChapterVoteApi}${pk}/`, choice);
  }

  finishSuggestion(choice: VoteRequest, pk: number): Observable<any> {
    return this.http.post<any>(`${this.storyFinishVoteApi}${pk}/`, choice);
  }

  markNotificationAsRead(pk: number): Observable<NotificationDetailModel> {
    return this.http.patch<NotificationDetailModel>(`${this.storyNotificationApi}${pk}/`, { is_read: true });
  }

  getNotifications(): Observable<NotificationListModel[]> {
    return this.http.get<NotificationListModel[]>(this.storyNotificationApi);
  }

  getNotificationDetail(pk: number): Observable<NotificationDetailModel> {
    return this.http.get<NotificationDetailModel>(`${this.storyNotificationApi}${pk}/`);
  }

  chapterDelete(pk: number) {
    return this.http.delete(`${this.ChapterApi}${pk}/`);
  }


  voteToStory(voteData: VoteStory) {
    return this.http.post<VoteRead>(this.SocialVoteAPi, voteData)
  }


  addComment(commentData: CommentRequest){
    return this.http.post<CommentRead>(this.SocialCommentApi, commentData)
  }

  deleteComment(pk: number) {
    return this.http.delete(`${this.SocialCommentApi}${pk}/`)
  }

  editComment(pk:number, commentContent: CommentRequest) {
    return this.http.put(`${this.SocialCommentApi}${pk}/`, commentContent)

  } 
}