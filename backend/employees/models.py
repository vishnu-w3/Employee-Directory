from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.name
