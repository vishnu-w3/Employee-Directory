"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from employees import views
from django.contrib import admin

urlpatterns = [
    path("admin/", admin.site.urls),
    path('employees/', views.list_employees, name='list_employees'),
    path('employees/create', views.create_employee, name='create_employee'),
    path('employees/update/<int:id>', views.update_employee, name='update_employee'),
    path('employees/delete/<int:id>', views.delete_employee, name='delete_employee'),
]
