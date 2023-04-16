from agora_token_builder import RtcTokenBuilder
from django.conf import settings
import random, time
from datetime import datetime, timedelta

from slot.models import ScheduledSlot

def createToken(slot):
    channelName = f"{slot.doctor.name}_{slot.patient.name}_{slot.time.strftime('YYYY-MM-DD')}"
    uid = slot.uid
    slot.uid += 1
    slot.save()
    expirationTimeSeconds = 3600 * 24
    currentTime = time.time()
    role = 1
    privilegeExpiresTs = currentTime + expirationTimeSeconds

    token = RtcTokenBuilder.buildTokenWithUid(settings.AGORA_APP_ID, settings.AGORA_CERTIFICATE, channelName, uid, role, privilegeExpiresTs)
    # print(token)

    return {'token': token, 'channel': channelName, 'uid': uid}

def createTokens():
    slots = ScheduledSlot.objects.filter(time__lte=datetime.now()+timedelta(minutes=10), token1='').all()
    for slot in slots:
        createToken(slot)
