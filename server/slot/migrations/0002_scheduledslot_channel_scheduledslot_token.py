# Generated by Django 4.1.7 on 2023-02-26 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slot', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduledslot',
            name='channel',
            field=models.CharField(default='', max_length=1500),
        ),
        migrations.AddField(
            model_name='scheduledslot',
            name='token',
            field=models.CharField(default='', max_length=2500),
        ),
    ]