from fastapi import FastAPI 
from fastapi.responses import JSONResponse

app = FastAPI(docs_url="/status_docs", redoc_url="/status_redoc")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ให้ทุกโดเมนสามารถเข้าถึงได้
    allow_credentials=True,
    allow_methods=["*"],  # ให้สามารถใช้ทุก method (GET, POST, etc.)
    allow_headers=["*"],  # ให้สามารถใช้ทุก header
)

users = [
    {"name": "parsan", "status": "0"},
    {"name": "atirarj", "status": "0"},
    {"name": "apiwat", "status": "0"},
    {"name": "yotaka", "status": "0"},
    {"name": "piyanuch", "status": "0"},
    {"name": "chaluemwut", "status": "0"},
    {"name": "saweth", "status": "0"},
    {"name": "prapas", "status": "0"},
    {"name": "jagraphon", "status": "0"},
    {"name": "jakkrit", "status": "0"},
    {"name": "adisak", "status": "0"},
    {"name": "komen", "status": "0"}
    # เพิ่มข้อมูลเพิ่มเติมตรงนี้
]

@app.get("/")
def read_root():
    return JSONResponse(content=users)

@app.get("/update_status")
def update_status(name, status):
    for user in users:
        if user['name'] == name:
            user['status'] = status
            return JSONResponse({'message': 'Status updated successfully'})
    return JSONResponse({'message': 'User not found'}), 404
