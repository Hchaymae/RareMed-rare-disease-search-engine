import os
from django.conf import settings
print(os.path.join(settings.MEDIA_ROOT, 'documents/pdfs'))
