import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements AfterViewInit {

  @ViewChild('editor') editor!: ElementRef<HTMLIFrameElement>;

  // Variable to control the visibility of the modal
  isModalOpen = true; // Set to true or false based on your initial state

  constructor() { }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  initializeEditor(): void {
    const iframe = this.editor.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      doc.open();
      doc.write(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
            <style>
              body { margin: 0; padding: 10px; }
              div { margin: 10px; }
              button { margin: 5px; }
            </style>
          </head>
          <body contenteditable="true" style="height: 100%; margin: 0;">
            <!-- Content Editable Area -->
          </body>
        </html>
      `);
      doc.close();
      doc.designMode = "on";
    }
  }

  execCommand(command: string, value?: string): void {
    const iframe = this.editor.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      doc.execCommand(command, false, value);
    }
  }

  onFontChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedFont = target.value;
    this.execCommand('fontName', selectedFont);
  }

  onFontSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedSize = target.value;
    this.execCommand('fontSize', selectedSize);
  }

  onColorChange(event: Event, command: string): void {
    const target = event.target as HTMLInputElement;
    const colorValue = target.value;
    this.execCommand(command, colorValue);
  }

  // Method to toggle the modal visibility
  closeModal(): void {
    this.isModalOpen = false;
  }
}
