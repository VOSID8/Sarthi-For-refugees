from django.conf import settings

import cv2
import numpy as np
import os
import pytesseract
import csv


def validate(file_name):
    # pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
    scale = 0.5
    point1 = []
    point2 = []
    myPoints = []
    # path = 'TargetFile'
    path = os.path.join(settings.MEDIA_ROOT, 'validate')
    # myPic = os.listdir(path)
    myPic = os.listdir(path)
    # imgQ = cv2.imread('TargetFile\\'+myPic[0])
    imgQ = cv2.imread(os.path.join(settings.MEDIA_ROOT, file_name))

    per = 25

    orb = cv2.ORB_create(1000)
    kp1,des1 = orb.detectAndCompute(imgQ,None)


    for j,y in enumerate(myPic):
        img = cv2.imread(path + "/" + y)
        #cv2.imshow(y,img)
        kp2,des2 = orb.detectAndCompute(img,None)
        bf = cv2.BFMatcher(cv2.NORM_HAMMING)
        matches = bf.match(des2,des1)
        matches = list(matches)
        matches.sort(key= lambda x: x.distance)
        good = matches[:int(len(matches)*(per/100))]
        imgMatch = cv2.drawMatches(img,kp2,imgQ,kp1,good[:100],None,flags=2)
        #cv2.imshow(y,imgMatch)

        srcPoints = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)
        dstPoints = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)

        M,_ = cv2.findHomography(srcPoints,dstPoints,cv2.RANSAC,5.0)
        h, w, c = img.shape
        imgScan = cv2.warpPerspective(img,M,(w,h))
        #cv2.imshow(y, imgScan)

        imgShow = imgScan.copy()
        imgMask = np.zeros_like(imgShow)

        myData = []

        img = cv2.resize(img, (0, 0), None, scale, scale)
        height, width, channels = img.shape
        myPoints.append([(0, 0), (int(height // scale), int(width // scale)), 'Card', 'Refugee'])

        roi = myPoints

        for x,r in enumerate(roi):
            cv2.rectangle(imgMask,(r[0][0],r[0][1]),(r[1][0],r[1][1]),(0,255,0),cv2.FILLED)
            imgShow = cv2.addWeighted(imgShow,0.99,imgMask,0.1,0)

        imgCrop = imgScan[r[0][1]:r[1][1], r[0][0]:r[1][0]]
        #cv2.imshow(str(x),imgCrop)

        #print(f'{r[3]} :{pytesseract.image_to_string(imgCrop)}')
        myData.append(pytesseract.image_to_string(imgCrop))

    final = []
    tempstr = " "
    for i in myData:
        if i=='\n':
            final+=tempstr
        else:
            tempstr+=i


    final1 = myData[0]
    final2 = final1.split('\n')
    final3 = []
    final3 += ["Invalid"]
    with open(os.path.join(settings.BASE_DIR, 'data/valid.csv'), 'r', encoding='utf-8-sig') as file:
        reader = csv.reader(file)
        for row in reader:
            print(row[0])
            if final2[0] == row[0]:
                final3[0] = "Valid"
            else:
                continue

    final3 += [final2[0]]
    final3 += [final2[8]]
    final3 += [final2[10]]
    final3 += [final2[12]]
    print(final3)

    return final3

'''doc = aw.Document()
builder = aw.DocumentBuilder(doc)
for i in range(len(myData)):
    builder.write(myData[i])
doc.save(myPicList[0]+".docx")'''

#cv2.imshow("KeyPointsQuery",imgKp1)
#cv2.imshow("Output",imgQ)
cv2.waitKey(0)