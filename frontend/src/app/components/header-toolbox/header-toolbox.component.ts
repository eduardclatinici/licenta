import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  showOrHide:boolean=false;  

  constructor() { }

  ngOnInit() {
    window.addEventListener("click",(event)=>{
      if(event.target != document.getElementById("settingsWheel"))
      this.showOrHide=false;
    });
  }

  clicked(){
    this.showOrHide=!this.showOrHide;
 
   }

}
