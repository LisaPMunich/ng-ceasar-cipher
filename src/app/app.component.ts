import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-cesar-cypher';
  inputText: string = "";
  shiftValue = "";
  encodedText: string = "";
  decodedText: string = "";
  loading: boolean | undefined;
  isLoading = false;
  showDecodeBlock = false;
  loadingBlock: any;


  ngOnInit(): void {
  }

  private validateIfCharacterIsALetter(currentLetter: any) {
    return (/[a-zA-Z]/).test(currentLetter)
  }

  clear(){
    this.inputText = "";
    this.shiftValue = "";
    this.encodedText = "";
    this.decodedText = "";
  }

  encodeInput(): void{
    const shiftValue = Number(this.shiftValue) % 26; //edge case of input of high number
    let alphabetLower: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
    let alphabetUpper: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let encodedText = "";
    this.isLoading = true;


    for(let i = 0; i < this.inputText.length; i++) {
      let currentLetter = this.inputText[i];

      if (!this.validateIfCharacterIsALetter(currentLetter)) {
        encodedText += currentLetter;
        continue;
      }

      if(currentLetter == currentLetter.toLowerCase()) {
        let currentIndex = alphabetLower.indexOf(currentLetter);
        let newIndex = currentIndex + shiftValue;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        encodedText += alphabetLower[newIndex];
        console.log("Lower", encodedText);
      }
      else if(currentLetter == currentLetter.toUpperCase()) {
        let currentIndex = alphabetUpper.indexOf(currentLetter);
        let newIndex = currentIndex + shiftValue;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        encodedText += alphabetUpper[newIndex];
        console.log("Upper", encodedText);
      }
    }
    this.encodedText = encodedText;
    this.isLoading = false;
  }

  decodeInput(): void{
    const shiftValue = Number(this.shiftValue) % 26; //edge case of input of high number
    let alphabetLower: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
    let alphabetUpper: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.isLoading = true;
    let decodedText = "";


    for(let i = 0; i < this.encodedText.length; i++) {
      let currentLetter = this.encodedText[i];

      if (!this.validateIfCharacterIsALetter(currentLetter)) {
        decodedText += currentLetter;
        continue;
      }

      if(currentLetter == currentLetter.toLowerCase()) {
        let currentIndex = alphabetLower.indexOf(currentLetter);
        let newIndex = currentIndex - shiftValue;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        decodedText += alphabetLower[newIndex];
        console.log("Lower", decodedText);
      }
      else if(currentLetter == currentLetter.toUpperCase()) {
        let currentIndex = alphabetUpper.indexOf(currentLetter);
        let newIndex = currentIndex - shiftValue;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        decodedText += alphabetUpper[newIndex];
        console.log("Upper", decodedText);
      }
    }

    this.decodedText = decodedText;
    this.isLoading = false;
  }

}





