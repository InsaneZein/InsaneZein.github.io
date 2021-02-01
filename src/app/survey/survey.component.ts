import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SurveyDataService } from '../services/survey-data.service';
import { Survey } from '../models/survey';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  surveyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private surveyDataService: SurveyDataService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  forkInRoad = 'When you come to a fork in the road, and there are no options left,which way do you go?';
  skyBlue = 'Why is the sky blue?';
  eyeColors = 'What color are the eyes of the most interesting person you know?';
  greenThings = 'Examine your surroundings. How many green things do you see?';
  petGoatName = 'What did/would you name your first pet goat?';


  skyColorOptions: string[] = [
    "It is blue because it is blue",
    "Many science, such wow, very fascinate",
    "What really is blue?"
  ];

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

  pathOptions: string[] = ["left", "counter-left"]

  createForm() {
    this.surveyForm = this.formBuilder.group({
      goatName: [''],
      skyColor: [''],
      fork: [''],
      eyeColors: [''],
      greenNumber: ['']
    })
  }

  buildSurveyData() {
    let surveyBody: Survey = {
      id: 0,
      token: 'fake-jwt-token',
      data: [
        {question: this.forkInRoad, answer: this.surveyForm.get('fork').value},
        {question: this.skyBlue, answer: this.surveyForm.get('skyColor').value},
        {question: this.eyeColors, answer: this.surveyForm.get('eyeColors').value},
        {question: this.greenThings, answer: this.surveyForm.get('greenNumber').value},
        {question: this.petGoatName, answer: this.surveyForm.get('goatName').value}
      ],

    }
    return surveyBody
  }

  onSubmit() {
    var surveyData = this.buildSurveyData();
    this.surveyDataService.submitResponse(surveyData)
    .pipe(first())
        .subscribe(
          data => {
            console.log('form submitted successfully');
            this.snackbar.open('Form submitted successfully');
          },
          error => {
            console.error('form submission error')
            this.snackbar.open('Error encountered in form submission');
          });
  }

}
