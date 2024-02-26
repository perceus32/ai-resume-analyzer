from django.db import models

class Upload(models.Model):
    jobTitle = models.CharField(max_length=100)
    jobDescription = models.TextField()
    files = models.FileField(upload_to='uploads/')
