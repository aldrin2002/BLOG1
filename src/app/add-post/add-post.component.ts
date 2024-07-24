import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataserviceService } from '../services/data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements AfterViewInit {
  @ViewChild('editor') editor!: ElementRef<HTMLIFrameElement>;
  title: string = ''; // Title input
  Created_by: string = ''; // Author input

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    private ds: DataserviceService // Inject the service to handle API requests
  ) { }

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
              img { max-width: 100%; height: auto; }
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

  postContent(): void {
    const iframe = this.editor.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!doc) {
      console.error('Could not access the iframe document.');
      return;
    }

    const content = doc.body.innerHTML;
    const postData = { title: this.title, content, Created_by: this.Created_by, status: 'draft' };

    this.ds.sendApiRequest('addpost', postData).subscribe({
      next: (response: any) => {
        console.log('Post created successfully:', response);
        if (response && response.code === 200) {
          this.dialogRef.close();
        } else {
          console.error('Failed to create post:', response.message);
        }
      },
      error: (error: any) => {
        console.error('Error posting content:', error);
      }
    });
  }

  closeEditor(): void {
    this.dialogRef.close();
  }
}
