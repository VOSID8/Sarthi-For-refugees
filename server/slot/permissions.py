from rest_framework.permissions import BasePermission


class IsDoctor(BasePermission):
    message = 'Only Doctors are authorised to visit this endpoint.'

    def has_permission(self, request, view):
        user = request.user

        return user is not None and user.is_verified_doctor and user.role=='DR'


class IsRefugee(BasePermission):
    message  = 'Only Refugees are authorised to visit this endpoint.'

    def has_permission(self, request, view):
        user = request.user

        return user is not None and user.role=='RF'
