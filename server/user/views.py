from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from django.conf import settings
import os, random, string

from .serializers import UserSerializer
from .refugee_validate import validate
from .models import ValidationImage, User

# Create your views here.


class Register(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        data = request.data.copy()

        if data['role']=='RF':

            email = request.data.get('email')
            password = request.data.get('password')
            name = request.data.get('name')
            phone_number = request.data.get('phone_number')
            city = request.data.get('city')
            date_of_birth = request.data.get('date_of_birth')
            country = request.data.get('country')

            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already registered!'}, status=status.HTTP_400_BAD_REQUEST)

            user = User(email=email, password=password, name=name, phone_number=phone_number, city=city, country=country, date_of_birth=date_of_birth, role='RF')

            image_id = data.get('image_id')
            image_instance = ValidationImage.objects.filter(id=image_id).first()
            user.refugee_card = image_instance

            user.set_password(password)
            user.save()

        else:

            serializer = UserSerializer(data=data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

        return Response(status=status.HTTP_201_CREATED)


def get_random_text():
    return f"{''.join(random.choice(string.ascii_letters + string.digits) for _ in range(20))}"

class ValidateRefugee(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.data.get('id_proof')
        folder_name = get_random_text()
        while ValidationImage.objects.filter(folder_name=folder_name).exists():
            folder_name = get_random_text()
        instance = ValidationImage(file=file, folder_name=folder_name)
        instance.save()
        file_name = instance.file.name
        print(file_name)
        try:
            list = validate(file_name)
        except BaseException as e:
            with open(os.path.join(settings.BASE_DIR, 'logs', 'script_error.log'), 'a') as f:
                f.write(file_name)
                f.write('\n')
                f.write(str(e))
                f.write('\n\n')
            return Response({'error': 'Some unexpected error occured!'}, status=status.HTTP_400_BAD_REQUEST)
        if list[0]=='Invalid':
            return Response({'error': 'Invalid ID card!'}, status=status.HTTP_400_BAD_REQUEST)
        instance.unhrc_number = list[1]
        instance = instance.save()
        return Response({
            'id': instance.id,
            'unhrc_number': list[1]
        }, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid Credentials!'}, status=status.HTTP_400_BAD_REQUEST)

        if (user.role=='DR' and not user.is_verified_doctor):
            return Response({'error': 'Unverified Account!'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = Token.objects.get(user=user)
            token.delete()
        except:
            pass

        token = Token.objects.get_or_create(user=user)
        return Response({
            'token': token[0].key,
            'name': user.name,
            'role': user.role
        }, status=status.HTTP_200_OK)        


class UserDesignation(APIView):
    def get(self, request):
        user = request.user
        if user.role=='RF':
            return Response({'role': 'refigee'}, status=status.HTTP_200_OK)
        return Response({'role': 'doctor'}, status=status.HTTP_200_OK)
