import uvicorn
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from functools import lru_cache
import config
import custosFunctions

app = FastAPI()

# ENVIRONMENT VARIABLES


@lru_cache()
def get_settings():
    return config.Settings()

#GATEWAY_SERV_URL = get_settings().GATEWAY_SERV_URL
#SESSION_SERV_URL= get_settings().SESSION_SERV_URL


#origins = [GATEWAY_SERV_URL]
middleware = [Middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )
]


# EXCEPTION HANDLER
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        return Response("Internal server error", status_code=500)

app.middleware('http')(catch_exceptions_middleware)


app = FastAPI()
app = FastAPI(middleware=middleware)


@app.get("/")
def hello():
    return 'Hello'


def start():
    print('CUSTOS API SERVICE')
    uvicorn.run(app, host="127.0.0.1", port=8888)


if __name__ == '__main__':
    start()
