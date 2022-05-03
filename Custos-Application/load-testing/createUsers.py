import pandas as pd
from tqdm import tqdm
df=pd.DataFrame(columns=['username','First Name','Last Name','Email','Password'])
userids=[]
fname=[]
lname=[]
email=[]
password=[]
gname=[]
userType=["PROJECT","EXPERIMENT","ASSIGNMENT"] #Created  using create Entity
groupNames=["Admin","Read Only Admin","Gateway User","Science User","Service User"]
utype=[]
for i in tqdm(range(12000,12005)):
	userids.append("custosuser"+str(i))
	fname.append("User")
	lname.append(str(i))
	email.append("custosuser"+str(i)+"@gmail.com")
	password.append("12345678")
	utype.append(userType[i%3])
	gname.append(groupNames[i%5])
df['username']=userids
df['First Name']=fname
df['Last Name']=lname
df['Email']=email
df['Password']=password
df['type']=utype
df['Groupname']=gname
#print(df)
df.to_csv('userdata.csv',header=False)
	

