import os
from sklearn.preprocessing import LabelEncoder
import cv2
import torch
import pickle
import numpy as np
from keras_facenet import FaceNet

embedder = FaceNet()
model_yolo = torch.hub.load('ultralytics/yolov5', 'custom', path='model/best.pt' )
base_folder_path = 'image_people/'
Y=[]

known_face_names = []
known_face_encoding = []
person_folders = [f for f in os.listdir(base_folder_path) if os.path.isdir(os.path.join(base_folder_path, f))]
parth_name=[]
EMBEDDED_X =[]
for person_folder in person_folders:
    ## นำโฟลเดอร์ชื่อและโฟลเดอร์ path มารวมกัน
    person_folder_path = os.path.join(base_folder_path, person_folder)
    parth=person_folder
    ## เข้าถึงไฟล์ภาพในโฟลเดอร์
    image_files = [f for f in os.listdir(person_folder_path)]   
    for image_file in image_files:
        ##นำชื่อไฟล์มาต่อกัน
        image_path = os.path.join(person_folder_path, image_file) 
        ##อ่านภาพที่ได้
        image = cv2.imread(image_path)
        #แปลงภาพให้เป็นขาวดำ
        gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        ##ใช้ model yolo ในการตรวจจับใบหน้า
        results = model_yolo(gray_frame)
        ##เข้าถึงข้อมูลใบหน้า
        pred_boxes = results.xyxy[0].cpu().numpy()[:, :4]  
        for box in pred_boxes :
            ## Map ข้อมูลจาก pred_boxes มาเก็บไว้
            x_min, y_min, x_max, y_max = map(int, box)
            ##ขีดเส้นรอบใบหน้า
            cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
            ##กำหนดขอบเขตของภาพ
            my_face = image[y_min:y_max, x_min:x_max]
            
            ##เปลี่ยนขนาดภาพตามขอบเขตข้างบน จะได้ภาพเป็น array
            my_face = cv2.resize(my_face, (160,160))
                
            #3D(160x160x3)
            my_face = my_face.astype('float32')

            #4D(nonex160x160x3)
            my_face = np.expand_dims(my_face,axis=0)
                
            #512D (1x1x512)
            yhat = embedder.embeddings(my_face)

            
            #print(image_path)
            parth_name.append(parth)
            EMBEDDED_X.append(yhat[0])     
            
                 
                
np.savez_compressed('model/faces_embedding.npz',EMBEDDED_X,parth_name)

encoder = LabelEncoder()
encoder.fit(parth_name)
Y = encoder.transform(parth_name)
Y=np.asarray(Y)    
 
EMBEDDED_X = np.array(EMBEDDED_X)
from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(EMBEDDED_X, Y, shuffle=True, random_state=17)

from sklearn.svm import SVC
model = SVC(kernel='linear', probability=True)
model.fit(X_train, Y_train)
ypreds_train = model.predict(X_train)
ypreds_test = model.predict(X_test)

#save the model
with open('model/svm_model_160x160.pkl','wb') as f:
    pickle.dump(model,f)
