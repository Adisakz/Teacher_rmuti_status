import cv2
import torch
import numpy as np
from sklearn.preprocessing import LabelEncoder
import pickle
from keras_facenet import FaceNet
import requests
import threading

def send_out_http_request(final_name):
    response = requests.get(f"https://status_api.pcnone.com/update_status?name={final_name}&status=0",verify=False)
    response_text = response.text
    print(response_text+"OUT")

def send_in_http_request(final_name):
    response = requests.get(f"https://status_api.pcnone.com/update_status?name={final_name}&status=1",verify=False)
    response_text = response.text
    print(response_text+"IN")          
# โหลดโมเดล YOLOv5 จากไฟล์ best.pt
model_yolo = torch.hub.load('ultralytics/yolov5', 'custom', path='model/best.pt' )
facenet = FaceNet()

faces_embeddings = np.load('model/faces_embedding.npz')
Y = faces_embeddings['arr_1']
encoder = LabelEncoder()
Y = np.append(Y, 'unknown')
encoder.fit(Y)

model = pickle.load(open('model/svm_model_160x160.pkl', 'rb'))
print("Program runing....")
# เริ่มต้นใช้กล้องเว็บแคม

def get_class (my_face):
    my_face = my_face.astype('float32')
    my_face = np.expand_dims(my_face,axis=0)
    ypred = facenet.embeddings(my_face)
    #เปรียบเทียบแต่ละคลาสว่าเหมือนคลาสไหนที่สุด
    face_name = model.predict(ypred)
    face_dis = model.predict_proba(ypred)
    max_face_dis = np.max(face_dis)
    
    print(max_face_dis)
    if max_face_dis <= 0.3:
        
        final_name = 'unknown'
    else:
        final_name = encoder.inverse_transform(face_name)[0]
    return final_name
    
   


cap = cv2.VideoCapture(0)  # 0 หมายถึงใช้กล้องหลักของคอมพิวเตอร์
cap2 = cv2.VideoCapture(1) # 1 หมายถึงใช้กล้องรองของคอมพิวเตอร์
cap2.set(cv2.CAP_PROP_FPS,30)
if not (cap.isOpened()):
    print("ไม่สามารถเปิดกล้องได้")
else :
#cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
#cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

#display_width = 640
#display_height = 360
    while True:
        ret, frame = cap.read()
        #frame = cv2.resize(frame, (display_width, display_height))

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Perform face detection using YOLO
        results = model_yolo(gray_frame)
        pred_boxes = results.xyxy[0].cpu().numpy()[:, :4]
        confidences = results.xyxy[0].cpu().numpy()[:, 4]
        for box ,conf in zip(pred_boxes ,confidences):
                ## Map ข้อมูลจาก pred_boxes มาเก็บไว้
                x_min, y_min, x_max, y_max = map(int, box)
                if (conf > 0.7):
                    ##ขีดเส้นรอบใบหน้า
                    cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
                    ##กำหนดขอบเขตของภาพ
                    my_face = frame[y_min:y_max, x_min:x_max]
                
                    ##เปลี่ยนขนาดภาพตามขอบเขตข้างบน จะได้ภาพเป็น array
                    my_face = cv2.resize(my_face, (160,160))
                
                    final_name = get_class (my_face)
                    if final_name == 'unknown':
                        cv2.putText(frame, 'Unknown', (10, 30 ), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,255), 1, cv2.LINE_AA)
                    else:
                        cv2.putText(frame, str(final_name), (10, 30 ), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,255), 1, cv2.LINE_AA)
                        thread = threading.Thread(target=send_out_http_request, args=(final_name,))
                        thread.start()
                        
                    cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)  # วาด bounding box
                    #cv2.putText(frame,str (final_name), (x_min, y_max + 20), cv2.FONT_HERSHEY_SIMPLEX,
                    #  0.8, (255,0,255), 1, cv2.LINE_AA)
                    
        ret2, frame2 = cap2.read()
        #frame = cv2.resize(frame, (display_width, display_height))
        # Perform face detection using YOLO
        gray_frame = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
        results2 = model_yolo(gray_frame)
        pred_boxes2 = results2.xyxy[0].cpu().numpy()[:, :4]
        confidences2 = results2.xyxy[0].cpu().numpy()[:, 4]
        for box2 ,conf2 in zip(pred_boxes2 ,confidences2):
                ## Map ข้อมูลจาก pred_boxes มาเก็บไว้
                x_min2, y_min2, x_max2, y_max2 = map(int, box2)
                if (conf2 > 0.7):
                    ##ขีดเส้นรอบใบหน้า
                    cv2.rectangle(frame2, (x_min2, y_min2), (x_max2, y_max2), (0, 255, 0), 2)
                    ##กำหนดขอบเขตของภาพ
                    my_face2 = frame2[y_min2:y_max2, x_min2:x_max2]
                
                    ##เปลี่ยนขนาดภาพตามขอบเขตข้างบน จะได้ภาพเป็น array
                    my_face2 = cv2.resize(my_face2, (160,160))
                
                    final_name2 = get_class (my_face2)
                    if final_name2 == 'unknown':
                        cv2.putText(frame2, 'Unknown', (10, 30 ), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,255), 1, cv2.LINE_AA)
                    else:
                        cv2.putText(frame2, str(final_name2), (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,255), 1, cv2.LINE_AA)
                        thread = threading.Thread(target=send_in_http_request, args=(final_name2,))
                        thread.start()
                        
                    cv2.rectangle(frame2, (x_min2, y_min2), (x_max2, y_max2), (0, 255, 0), 2)  # วาด bounding box            
                    
                    
        
        cv2.imshow("Face OUT", frame) 
        cv2.imshow("Face IN", frame2) 
        if (cv2.waitKey(1) & 0xFF == ord('q')) or not ret:
            break

# ปิดกล้องเว็บแคมและปิดหน้าต่าง
cap.release()
cv2.destroyAllWindows()
