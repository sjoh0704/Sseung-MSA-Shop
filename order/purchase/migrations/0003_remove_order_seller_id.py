# Generated by Django 3.2.4 on 2021-07-05 08:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('purchase', '0002_auto_20210705_0801'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='seller_id',
        ),
    ]
