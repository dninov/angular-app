import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  let id = this.route.snapshot.paramMap.get("uid");
  console.log(id);

  }
}
