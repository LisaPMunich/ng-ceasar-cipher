import {Component} from '@angular/core';

const ALPHABET_LOWERCASE = "abcdefghijklmnopqrstuvwxyz".split("");
const ALPHABET_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Angular Caesar Cypher';
    inputText: string = "";
    shiftValue = "";
    encodedText: string = "";
    decodedText: string = "";
    loading: boolean | undefined;
    isLoading = false;
    showDecodeBlock = false;
    loadingBlock: any;
    imagePath = 'https://caesarcipher.net/wp-content/uploads/2022/11/caesar-cipher-wheel-.webp';


    private validateIfCharacterIsALetter(currentLetter: any) {
        return (/[a-zA-Z]/).test(currentLetter)
    }

    clear() {
        this.inputText = "";
        this.shiftValue = "";
        this.encodedText = "";
        this.decodedText = "";
    }

    getAlphabet(letter: string): string[] {

        if (letter == letter.toLowerCase()) {
            return ALPHABET_LOWERCASE;
        } else {
            return ALPHABET_UPPERCASE;
        }
    }

    shiftIndexForward(currentIndex: number, shiftValue: number): number {
        let newIndex = currentIndex + shiftValue;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        return newIndex;
    }

    shiftIndexBackward(currentIndex: number, shiftValue: number): number {
        let newIndex = currentIndex - shiftValue;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        return newIndex;
    }

    encodeInput(): void {
        const shiftValue = Number(this.shiftValue) % 26; //edge case of input of high number
        let encodedText = "";
        this.isLoading = true;


        for (let i = 0; i < this.inputText.length; i++) {
            let currentLetter = this.inputText[i];

            if (!this.validateIfCharacterIsALetter(currentLetter)) {
                encodedText += currentLetter;
                continue;
            }

            let currentIndex = this.getAlphabet(currentLetter).indexOf(currentLetter);
            let newIndex = this.shiftIndexForward(currentIndex, shiftValue);
            encodedText += this.getAlphabet(currentLetter)[newIndex];
        }
        this.encodedText = encodedText;
        this.isLoading = false;
    }

    decodeInput(): void {
        const shiftValue = Number(this.shiftValue) % 26; //edge case of input of high number
        this.isLoading = true;
        let decodedText = "";


        for (let i = 0; i < this.encodedText.length; i++) {
            let currentLetter = this.encodedText[i];

            if (!this.validateIfCharacterIsALetter(currentLetter)) {
                decodedText += currentLetter;
                continue;
            }

            let currentIndex = this.getAlphabet(currentLetter).indexOf(currentLetter);
            let newIndex = this.shiftIndexBackward(currentIndex, shiftValue);
            decodedText += this.getAlphabet(currentLetter)[newIndex];
        }

        this.decodedText = decodedText;
        this.isLoading = false;
    }
}





