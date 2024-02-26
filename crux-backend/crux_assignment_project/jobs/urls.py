from django.urls import path
# from .views import test_view
from .views import upload_files
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # path('test/', test_view, name='test-view'),
    path('upload/', upload_files, name='upload_files')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)