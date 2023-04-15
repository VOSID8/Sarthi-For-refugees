from rest_framework.serializers import ModelSerializer,ValidationError
from .models import User

allowed_extensions = ['jpg', 'jpeg', 'png', 'heic']

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('last_login', 'is_active', 'is_staff', 'is_admin', 'is_superuser')
    
    def validate_id_proof(self, value):
        if value.size>10485000:
            raise ValidationError('Image size limit exceeded. Maximum allowed size is 10MB')
        
        if value.name.split('.')[-1] not in allowed_extensions:
            raise ValidationError(f'Invalid file format. Allowed file formats are {", ".join(i for i in allowed_extensions)}')

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
