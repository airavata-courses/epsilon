import uvicorn
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse

from functools import lru_cache
import config
import custosFunctions as cf

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
    #allow_origins=origins,
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

@app.post("/verifyUser")
async def verifyUser(info:Request):
    req_data=await info.json()
    try:
        cf.verifiy_user(req_data.admin_user_name, req_data.admin_password)
        print("Successfully verified user")
        return Response({"success":"true","message":"Successfully verified user"},200)
    except Exception as e:
        print("verifiy_user is not defined or user may not be created  in the teanant" + str(e))
        return Response({"success":"false"},500)


@app.post("/registerUsers")
async def registerUsers(info:Request):
    req_data=await info.json()
    try:
        cf.register_users(req_data.users)
        return Response({"success":"true"},200)
    except Exception:
        print("please defined method register_users")
        return Response({"success":"false"},500)


@app.post("/createGroups")
async def createGroups(info:Request):
    req_data=await info.json()
    try:
        cf.create_groups(req_data.groups)
        return Response({"success":"true"},200)
    except Exception as e:
        print(e)
        print("please defined method create_groups")
        return Response({"success":"false"},500)

@app.post("/allocateUsersToGroups")
async def allocateUsersToGroups(info:Request):
    req_data=await info.json()
    try:
        cf.allocate_users_to_groups(req_data.user_group_mapping)
        return Response({"success":"true"},200)
    except Exception:
        print("please defined method allocate_users_to_groups")
        return Response({"success":"false"},500)

@app.post("/allocateChildToParent")
async def allocateChildToParent(info:Request):
    req_data=await info.json()
    try:
        cf.allocate_child_group_to_parent_group(req_data.child_gr_parent_gr_mapping)
        return Response({"success":"true"},200)
    except Exception:
        print("please defined method allocate_child_group_to_parent_group")
        return Response({"success":"false"},500)

@app.post("/createPermission")
async def createPermission(info:Request):
    req_data=await info.json()
    try:
        cf.create_permissions(req_data.permissions)
        return Response({"success":"true"},200)
    except Exception:
        print("please defined method create_permissions")
        return Response({"success":"false"},500)

@app.post("/createEntityType")
async def createEntityType(info:Request):
    req_data=await info.json()
    try:
        cf.create_entity_types(req_data.entity_types)
        return Response({"success":"true"},200)
    except Exception:
        print("please defined method create_entity_types")
        return Response({"success":"false"},500)

@app.post("/registerResources")
async def registerResources(info:Request):
    req_data=await info.json()
    try:
        cf.register_resources(req_data.resources)
        return Response({"success":"true"},200)
    except Exception as e:
        print("Please defined method register_resources")
        return Response({"success":"false"},500)

@app.post("/shareResourceWithGroup")
async def shareResourceWithGroup(info:Request):
    req_data=await info.json()
    try:
        cf.share_resource_with_group(req_data.gr_sharings)
        return Response({"success":"true"},200)
    except Exception as e:
        print("please defined method share_resource_with_group")
        return Response({"success":"false"},500)


@app.post("/shareResourceWithUser")
async def shareResourceWithUser(info:Request):
    req_data=await info.json()
    try:
        cf.share_resource_with_user(req_data.sharings)
        return Response({"success":"true"},200)
    except Exception as e:
        print("Please defined method share_resource_with_user")
        return Response({"success":"false"},500)

@app.post("/checkUserPermission")
async def checkUserPermission(info:Request):
    req_data=await info.json()
    try:
        cf.check_user_permissions(req_data.users)
        return Response({"success":"true"},200)
    except Exception as e:
        print(e)
        print("please defined methos check_user_permissions")
        return Response({"success":"false"},500)



@app.post("/createSSH")
async def createSSH(info:Request):
    req_data=await info.json()
    try:
        token=cf.create_SSH_key(req_data.user_id,req_data.description)
        response = JSONResponse(content={"success":"true"})
        response.set_cookie(key="token", value=token)
        return response
    except Exception as e:
        print(e)


@app.post("/getSSH")
async def getSSH(info:Request):
    req_data=await info.json()






def start():
    print('CUSTOS API SERVICE')
    uvicorn.run(app, host="127.0.0.1", port=8888)

if __name__ == '__main__':
    start()