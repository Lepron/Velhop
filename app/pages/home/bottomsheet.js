import {Component, EventEmitter, OnChanges, SimpleChange, OnInit} from '@angular/core';
import {TimerWrapper} from '@angular/core/src/facade/async';

@Component({
  selector: 'bottom-sheet',
  inputs : ['id','title','useState','vDispo','pDispo','cbAvailable','emplacement','type'],
  outputs : ['setLvl1','canvasResize'],
  templateUrl : 'build/pages/home/bottomsheet.html'
})
export class bottomSheet {

  constructor() {
	this.setLvl1 = new EventEmitter();
	this.canvasResize = new EventEmitter();
	this.photoHeight=230;
	this.screenHeight= window.innerHeight;
	this.lvl0height = 90;
	this.lvl1height = window.innerHeight - this.photoHeight +10; //450
	this.height=0;
	this.topPhoto = this.screenHeight;
	this.valueGoToBot=160;
	this.move=false;
	this.movePhoto=false;
	this.counter=0;
	this.titleDivClass="lvl0class";
	this.classheight="lvltest";
	this.photoclass="photo";
	this.btnVisibility="hidden";
    this.photo="";
  }
  
  tapEvent(event){
	this.classheight="lvlfreeheight";
	this.photoclass="photofree";
	//console.log(event);
	if(window.innerHeight - event.changedPointers[0].clientY < this.lvl1height && this.move==false && this.height>0){
		if(window.innerHeight - event.changedPointers[0].clientY >=this.lvl0height){
			if(this.height>this.lvl0height+1){
				this.titleDivClass="lvl1class";
			}
			/*if(this.height<=this.lvl0height+5){
				this.titleDivClass="lvl0class";
			}*/
			this.height = ( window.innerHeight - event.changedPointers[0].clientY ) ;
			this.setPhoto();
		}
		else{
			this.height = this.lvl0height;
			this.titleDivClass="lvl0class";
		}
	}
	if(event.changedPointers[0].clientY < window.innerHeight-this.height){
		this.setEtape1();
	}
	
	if(event.isFinal==true){
		if(this.height<this.valueGoToBot){
			//this.height = this.lvl0height;
			this.setEtape0();
		}
		else{
			this.setEtape1();
		}
			console.log("---- swipe up end -----");
	}
 }
    
isStation(){
   return(this.title.includes("Station"));
}
isBoutique(){
    if(this.title.includes("Boutique")||this.title.includes("boutique")){
        return true;
    }
    else{
        return false;
    }
} 
 
 close(){
	this.height = "0";
	this.topPhoto= this.screenHeight;
	this.titleDivClass="lvl0class";
	this.btnVisibility="hidden";
	this.canvasResize.next({ bottomSheetHeight: this.height });
 }
 
 setEtape0(){
     
			this.photoclass="photo";
			this.classheight="lvltest";
	this.height = "90";
	this.topPhoto= this.screenHeight;
	this.titleDivClass="lvl0class";
	this.btnVisibility="visible";
	this.canvasResize.next({ bottomSheetHeight: this.height });
 }
 
 setEtape1(){
     
			this.photoclass="photo";
			this.classheight="lvltest";
	this.height=this.lvl1height;
	this.topPhoto= 0;
	this.btnVisibility="visible";
	this.titleDivClass="lvl1class";
 }
    
switchEtape(){
    if(this.topPhoto==0){
        this.setEtape0();
    }
    else{
        this.setEtape1();
    }
}

isEtape1(){
    if(this.topPhoto==0){
        return true;
    }
    else{
        return false;
    }
}
isCbAvailable(){
 if(this.cbAvailable==1){
        return true;
    }
    else{
        return false;
    }
}
    
getHoraires(){
    var res=this.id;
  if(res==0){
        res = "Ouvert du lundi au vendredi : en continu de 8h à 19h<br>samedi : de 9h30 à 12h30 et de 14h à 17h30<br>dimanche et jours fériés : fermé";
  }
  else if(res==12){
        res="Ouvert du lundi au vendredi : en continu de 8h à 19h<br>samedi : de 9h30 à 12h30 et de 14h à 17h30<br>dimanche et jours fériés : fermé"
  }else if (res==14){
      res="Ouver du lundi au vendredi : de 9h à 12h30 et de 13h30 à 18h30<br>samedi, dimanche et jours fériés : fermé";
  }
  else {
      res="1000"
  }
  return res;
}
 
 setPhoto(){
	var topValuePhoto = this.screenHeight - Math.round(((this.height-this.lvl0height)/(this.lvl1height-this.lvl0height))* this.screenHeight );
	//console.log(topValuePhoto+ "%");
	this.topPhoto= topValuePhoto;
 }
 
  ngOnChanges(value) {
    this.title=this.title.replace("Vélhop ","");
    this.photo="img/photos/"+this.id+".PNG";
	//console.log(value);
	if("useState" in value){
		if(value.useState.currentValue=="true"){
			this.setEtape0();
		}
		if(value.useState.currentValue=="false"){
			this.close();
		}
	}
  }
 

}