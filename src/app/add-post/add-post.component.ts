import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataserviceService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements AfterViewInit {

  @ViewChild('editor') editor!: ElementRef<HTMLIFrameElement>;
  title: string = ''; // Title input
  imagePreview: string | ArrayBuffer | null = null; // Image preview
  selectedImage: File | null = null; // File to upload

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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  uploadImage(): Observable<any> {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage);
      return this.ds.uploadImage(formData);
    }
    return new Observable(observer => observer.complete());
  }

  postContent(): void {
    const iframe = this.editor.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      const content = doc.body.innerHTML;
      const postData: any = { title: this.title, content };

      if (this.selectedImage) {
        this.uploadImage().subscribe(response => {
          postData.imageUrl = response.imageUrl; // Update with your API response structure
          this.ds.createPost(postData).subscribe(() => {
            this.dialogRef.close();
          }, error => {
            console.error('Error posting content:', error);
          });
        }, error => {
          console.error('Error uploading image:', error);
        });
      } else {
        this.ds.createPost(postData).subscribe(() => {
          this.dialogRef.close();
        }, error => {
          console.error('Error posting content:', error);
        });
      }
    }
  }

  closeEditor(): void {
    this.dialogRef.close();
  }
}
