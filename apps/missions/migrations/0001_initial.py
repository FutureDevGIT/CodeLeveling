# Generated by Django 5.2 on 2025-04-30 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('difficulty', models.CharField(max_length=50)),
                ('xp_reward', models.IntegerField()),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
