from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404, redirect
import json
from .models import Employee

@csrf_exempt
def list_employees(request):
    employees = list(Employee.objects.all().values())
    return JsonResponse(employees, safe=False)

@csrf_exempt
def create_employee(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Employee.objects.create(**data)
        return redirect('list_employees')

@csrf_exempt
def update_employee(request, id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        employee = get_object_or_404(Employee, pk=id)
        for key, value in data.items():
            setattr(employee, key, value)
        employee.save()
        return redirect('list_employees')

@csrf_exempt
def delete_employee(request, id):
    if request.method == 'DELETE':
        employee = get_object_or_404(Employee, pk=id)
        employee.delete()
        return redirect('list_employees')
