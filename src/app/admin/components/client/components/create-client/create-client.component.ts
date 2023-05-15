import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/admin/interfaces/client';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  clientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      return;
    }

    const client: Client = {
      name: this.clientForm.value.name,
      email: this.clientForm.value.email,
      phone: this.clientForm.value.phone
    };

    // Send the client data to the server or perform desired actions
    console.log(client);

    // Reset the form
    this.clientForm.reset();
  }
}
