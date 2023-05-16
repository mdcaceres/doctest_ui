import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/admin/interfaces/client';
import { ClientService } from 'src/app/admin/service/client.service';
import swal  from 'sweetalert2';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  clientForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private clientService : ClientService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: {userId: string}) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const client: Client = {
      name: this.clientForm.value.name,
      email: this.clientForm.value.email,
      phone: this.clientForm.value.phone
    };

    // Send the client data to the server or perform desired actions
    console.log(client);

    this.clientService.create(client, this.data.userId).subscribe({
      next: data => {
        this.dialog.closeAll();
      },
      error: err => {
        console.log(err); 
        swal.fire("Error", "Error while saving the project", "error");
        this.dialog.closeAll();
      }
    })

    // Reset the form
    this.clientForm.reset();
  }
}
