import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'https://portfolio-backend-ztqd.onrender.com/sendmail';
private apirating='https://portfolio-backend-ztqd.onrender.com/rate';
private getRatingsApiUrl = 'https://portfolio-backend-ztqd.onrender.com/ratings';

  constructor(private http: HttpClient) { }

  sendemail(payload: EmailPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
   submitRating(ratingData: { rating: string; rating_message: string; username: string }): Observable<any> {
    return this.http.post(this.apirating, ratingData);
  }
   getRatings(): Observable<any[]> {
    return this.http.get<any[]>(this.getRatingsApiUrl);
  }
}
 