import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from'@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  // providers: [provideNativeDateAdapter()],
})
export class DialogComponent implements OnInit{
  freshnessList = ["Completed", "Not Completed"]

  productForm !: FormGroup

  actionBtn: String = "Save"

  

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA)  public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){}


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      employeeName :['',Validators.required],
      employeeNumber :['',Validators.required],
      kind : ['',Validators.required],
      quantity : ['',Validators.required]
    })      

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls["employeeName"].setValue(this.editData.employeeName);
      this.productForm.controls["employeeNumber"].setValue(this.editData.employeeNumber);
      this.productForm.controls["kind"].setValue(this.editData.kind);

    }    
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Employee added succesfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error :()=>{
            alert("Error while adding")
          }
        })
      }else{
        this.updateProduct()
      }
    }
  }
    updateProduct(){
      this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Updated Succesfully")
          this.productForm.reset()
          this.dialogRef.close('update')
        },
        error:()=>{
          alert("Error while updating!!!")
        }
      })
    }
  }



function provideNativeDateAdapter(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}

