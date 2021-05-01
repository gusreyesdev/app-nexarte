import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

//Services
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorsUtility } from 'src/app/models/errors-utility';
import { Quote } from 'src/app/models/quote';
import { CarService } from 'src/app/services/car.service';
import { CityService } from 'src/app/services/city.service';
import { QuoteService } from 'src/app/services/quote.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  public cars = [];
  public states = [];
  public cities = [];

  public errorUtility: any;
  public quote: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public formControlGroup = new FormGroup({
    carFormControl: new FormControl('', [
      Validators.required
    ]),

    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+')
    ]),

    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    phoneFormControl: new FormControl('', [
      Validators.required,
      Validators.max(1111111111)
    ]),

    stateFormControl: new FormControl('', [
      Validators.required
    ]),

    cityFormControl: new FormControl('', [
      Validators.required
    ]),

    checkFormControl: new FormControl('', [
    ]),

  });


  constructor(private carService: CarService, private stateService: StateService,
    private cityService: CityService, private quoteService: QuoteService ,  private spinner: NgxSpinnerService,
    private snackComponent: MatSnackBar,
  ) {
    this.errorUtility = new ErrorsUtility();
    this.quote = new Quote();
  }

  ngOnInit(): void {
    this.getModelsCars();
    this.getStates();
    this.onValueChanges();
  }

  getModelsCars() {
    this.spinner.show();

    this.carService.getall().subscribe(data => {
      this.cars = data;
      this.spinner.hide();
    })
  }

  getStates() {
    this.spinner.show();

    this.stateService.getall().subscribe(data => {
      this.states = data;
      this.spinner.hide();
    })
  }

  onValueChanges(): void {
    this.formControlGroup.get("stateFormControl").valueChanges.subscribe(selectedValue => {

      if (selectedValue != undefined) {

        this.spinner.show();

        this.cityService.getCities(selectedValue).subscribe(data => {
          this.cities = data;
          this.spinner.hide();
        });

      }
    });
  }

  getErrorCar() {
    return this.errorUtility.getError(this.formControlGroup.get('carFormControl')).msg;
  }

  getErrorName() {
    return this.errorUtility.getError(this.formControlGroup.get('nameFormControl')).msg;
  }

  getErrorEmail() {
    return this.errorUtility.getError(this.formControlGroup.get('emailFormControl')).msg;
  }

  getErrorPhone() {
    return this.errorUtility.getError(this.formControlGroup.get('phoneFormControl')).msg;
  }

  getErrorState() {
    return this.errorUtility.getError(this.formControlGroup.get('stateFormControl')).msg;

  }

  getErrorCity() {
    return this.errorUtility.getError(this.formControlGroup.get('cityFormControl')).msg;
  }

  getErrorCheck() {
    return this.errorUtility.getError(this.formControlGroup.get('checkFormControl')).msg;
  }



  onSave() {

    if (this.formControlGroup.get('carFormControl').errors != null) {
      this.openSnackBar("Modelo " + this.errorUtility.getError(this.formControlGroup.get('carFormControl')).msg);
    }

    else if (this.formControlGroup.get('nameFormControl').errors != null) {
      this.openSnackBar("Nombre " + this.errorUtility.getError(this.formControlGroup.get('nameFormControl')).msg);
    }

    else if (this.formControlGroup.get('emailFormControl').errors != null) {
      this.openSnackBar("Correo " + this.errorUtility.getError(this.formControlGroup.get('emailFormControl')).msg);
    }

    else if (this.formControlGroup.get('phoneFormControl').errors != null) {
      this.openSnackBar("Celular " + this.errorUtility.getError(this.formControlGroup.get('phoneFormControl')).msg);
    }

    else if (this.formControlGroup.get('stateFormControl').errors != null) {
      this.openSnackBar("Departamento " + this.errorUtility.getError(this.formControlGroup.get('stateFormControl')).msg);
    }

    else if (this.formControlGroup.get('cityFormControl').errors != null) {
      this.openSnackBar("Ciudad " + this.errorUtility.getError(this.formControlGroup.get('cityFormControl')).msg);
    }

    else if (this.formControlGroup.get('checkFormControl').value == false || this.formControlGroup.get('checkFormControl').value == "") {
      this.openSnackBar(this.errorUtility.getError(this.formControlGroup.get('checkFormControl')).msg);
    }
    
    this.quote.car_model = this.formControlGroup.get('carFormControl').value;
    this.quote.name_client = this.formControlGroup.get('nameFormControl').value;
    this.quote.email_client = this.formControlGroup.get('emailFormControl').value;
    this.quote.phone_client = this.formControlGroup.get('phoneFormControl').value;
    this.quote.state_id = this.formControlGroup.get('stateFormControl').value;
    this.quote.city_id = this.formControlGroup.get('cityFormControl').value;


    this.quoteService.saveQuote(this.quote).subscribe(data => {

      if(data == 'quote_success_new'){
        this.openSnackBar('Cotizacion Realizada Correctamente');
      }

      else if(data == 'quote_success_another_day'){
        this.openSnackBar('Cotizacion Realizada Nuevamente');
      }

      else if(data == 'quote_same_day'){
        this.openSnackBar('Ya se realizo cotizacion con el cliente el dia de hoy');
      }

    });



  }

  openSnackBar(message: string,) {
    this.snackComponent.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000
    });

  }

}
