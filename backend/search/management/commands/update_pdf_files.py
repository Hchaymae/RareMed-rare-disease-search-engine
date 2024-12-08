import os
import difflib
from django.core.management.base import BaseCommand
from django.conf import settings
from search.models import Document  # Adjust the import according to your app and model name

class Command(BaseCommand):
    help = 'Update the pdf_file for PDF files if the title matches'

    def handle(self, *args, **kwargs):
        pdf_directory = os.path.join(settings.MEDIA_ROOT, 'documents/pdfs')
        
        # Check if the directory exists
        if not os.path.exists(pdf_directory):
            self.stdout.write(self.style.ERROR(f"The directory {pdf_directory} does not exist."))
            return
        
        # Loop through the PDF files in the directory
        for filename in os.listdir(pdf_directory):
            if filename.endswith(".pdf"):
                pdf_title = filename.replace('.pdf', '')  # Remove the '.pdf' extension
                self.stdout.write(f"Processing PDF: {pdf_title}")

                # Compare with the titles in the Document model
                similar_docs = Document.objects.all()
                
                for doc in similar_docs:
                    # Compare titles using difflib to allow partial matching
                    ratio = difflib.SequenceMatcher(None, pdf_title.lower(), doc.title.lower()).ratio()
                    if ratio > 0.8:  # You can adjust the threshold as needed
                        self.stdout.write(f"Found a match for {doc.title} (Ratio: {ratio*100:.2f}%)")
                        
                        # Save the relative URL (without '/media/')
                        pdf_file = os.path.join('documents/pdfs', filename)  # Relative path
                        doc.pdf_file = pdf_file  # Assuming pdf_file is the field where you want to store the URL
                        doc.save()
                        self.stdout.write(f"Saved URL for document: {doc.title} -> {pdf_file}")
                        break  # Stop after finding the first match
