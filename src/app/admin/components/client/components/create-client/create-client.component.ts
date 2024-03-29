import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/admin/interfaces/client';
import { ClientService } from 'src/app/admin/service/client.service';
import swal  from 'sweetalert2';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent{
  clientForm!: FormGroup;
  client!: Client

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
    this.client = {
      name: this.clientForm.value.name,
      email: this.clientForm.value.email,
      phone: this.clientForm.value.phone,
      userId: this.data.userId
    };

    // Send the client data to the server or perform desired actions
    console.log(this.client);

    this.clientService.create(this.client, this.data.userId).subscribe({
      next: data => {
      },
      error: err => {
        console.log(err); 
        swal.fire("Error", "Error while saving the client", "error");
        this.dialog.closeAll();
      }
    })

    this.clientForm.reset();
  }
}
