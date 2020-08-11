from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

class IsUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_authenticated:
            if request.user.is_superuser:
                return True
            else:
                return obj.owner.id == request.user.id
        else:
            return False
