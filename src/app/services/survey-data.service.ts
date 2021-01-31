import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from '../models/survey';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyDataService {

  constructor(private http: HttpClient  ) { }

  apiUrl = 'https://localhost:4200'

  getAll() {
    return this.http.get<Survey[]>(`${this.apiUrl}/surveys`);
  }

  getAnswers(question: string) {
    let answers = [];
    this.getAll().pipe(map(
      surveys => {
        return surveys.forEach( survey => {
          answers.push(survey.data.find(data => data.question === question))
        }
        )
      }
    )
    )
    return answers; 
  }

  submitResponse(survey: Survey) {
    return this.http.post(`${this.apiUrl}/surveys/submitResponse`, survey);
  }
}
