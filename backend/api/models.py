from django.db import models

# Create your models here.
class Word(models.Model):
    name = models.CharField(max_length=25, default="Anonymous")
    word = models.CharField(max_length=25)
    hint = models.CharField(max_length=25)