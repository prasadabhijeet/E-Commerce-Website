import { Component, OnInit } from '@angular/core';
import { ApprovalType } from 'src/app/models/models';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  approvalTypes = ApprovalType;
  approvalForm: FormGroup;
  selectedApprovalType: ApprovalType;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.approvalForm = this.fb.group({
    approvalType: ['']
   });

   this.bindEvents()
  }

  bindEvents(){
    const approvalFormControls = (<any>this.approvalForm).controls;
    const approvalTypeChanges$ = approvalFormControls.approvalType.valueChanges;

    approvalTypeChanges$.subscribe(value => {
      if (value != null) {
        this.selectedApprovalType = value;
      }
    });
  }

}
