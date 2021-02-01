import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from '../services/survey-data.service';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

export class AnswerStatistics {
  answer: string;
  count: number;
}
export class QuestionStatistics {
  question: string;
  answerStatistics: AnswerStatistics[];
}

@Component({
  selector: 'app-survey-statistics',
  templateUrl: './survey-statistics.component.html',
  styleUrls: ['./survey-statistics.component.scss']
})
export class SurveyStatisticsComponent implements OnInit {
  currentUser: User;
  questionData: string[] = [];
  surveyData: QuestionStatistics[];
  questionMap = new Map<string, string[]>();
  answerNumbers: number = 0;

  constructor(private surveyDataService: SurveyDataService,
    private userService: UserService,
    private authenticationService: AuthenticationService) {
      this.currentUser = this.authenticationService.currentUserValue;
    }

  surveyTotals: number = 0;
  skyColorOptions: string[] = [
    "It is blue because it is blue",
    "Many science, such wow, very fascinate",
    "What really is blue?"
  ]

  eyeColorOptions: string[] = [
    'brown',
    'blue',
    'green',
    'gold',
    'red',
    'black',
    'white',
    'other'
  ];

  ngOnInit(): void {
    this.getTotalSurveys();
    this.questionStatistics('Why is the sky blue?', 'It is blue because it is blue');    
  }

  getTotalSurveys() {
    this.surveyDataService.getAll()
      .subscribe(surveys => this.surveyTotals = surveys.length);
  }

  getAnswers() {
    this.answerNumbers;
  }

  questionStatistics(question: string, answer: string) {
    this.surveyDataService.getAll().subscribe(
      surveys => {
        let answers: string[] = []
        surveys.forEach(survey => {
          let surveyData = survey.data.find(data => data.question === question)
          answers.push(surveyData.answer);
        })
        console.log(answers.filter(option => option === answer).length);
        this.answerNumbers = answers.filter(option => option === answer).length;
        console.log(this.answerNumbers);
      }
    )
  }

  
  



}
