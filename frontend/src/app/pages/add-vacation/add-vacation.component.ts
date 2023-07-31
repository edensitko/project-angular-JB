import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.css']
})
export class AddVacationComponent implements OnInit {
  newVacationForm: FormGroup;
  newVacationData: any;
  selectedImage: File;
  imagePreview: string | ArrayBuffer | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

 

  ngOnInit(): void {
    this.newVacationForm = this.formBuilder.group({
      destination: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', [Validators.required, this.futureDateValidator]], 
      end_date: ['', [Validators.required, this.futureDateValidator]],
      price: ['', [Validators.required, this.priceValidator]],
      image_url: [''],
    });
  }

  priceValidator(control: AbstractControl): { [key: string]: any } | null {
    const price = control.value;
    if (price < 0 || price > 10000) {
      return { invalidPrice: true };
    }
    return null;
  }


  onImageSelected(event: any) {
    const file = event.target.files[0]; 
    this.selectedImage = file; 

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string; 
    };
    reader.readAsDataURL(this.selectedImage); 
    console.log(this.selectedImage.name)
    console.log(this.selectedImage)

  }


  futureDateValidator(control: FormControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      return { pastDate: true, message: 'Please select a future date.' };
    }
  
    return null;
  }
  
  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(event: any): void {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.handleImagePreview({ target: { files: [file] } });
  }
  triggerImageUpload(): void {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }
  handleImagePreview(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected File:', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedImage = file;
  
    
      }
    }
  
addVacation(): void {
    if (this.newVacationForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('destination', this.newVacationForm.value.destination);
    formData.append('description', this.newVacationForm.value.description);
    formData.append('start_date', this.newVacationForm.value.start_date);
    formData.append('end_date', this.newVacationForm.value.end_date);
    formData.append('price', this.newVacationForm.value.price);
    formData.append('image_url', this.selectedImage.name); 
  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    this.http.post('http://localhost:4000/api/vac/addVac', formData, { headers }).subscribe(
      (res) => {
        alert('Vacation added successfully');
        console.log('Vacation added successfully');
        console.log(res);
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error('Failed to add vacation', error);
      }
    );
  }
  
}
