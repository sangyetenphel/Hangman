# Generated by Django 5.0.3 on 2024-05-24 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_word_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='hint',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='word',
            name='word',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]
