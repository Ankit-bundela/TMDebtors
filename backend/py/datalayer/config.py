from os import path
from xml.etree import ElementTree
from datalayer.exceptions import DataLayerException

class DBConfiguration:
	def __init__(self,host,port,database,user,password):
		self.exceptions=dict()
		self.has_exceptions=False
		self.host=host
		self.port=port
		self.user=user
		self.database=database
		self.password=password
		self._validate_values()
	def _validate_values(self):
		if isinstance(self.host,str)==False:
			self.exceptions["host"]=('T',f"host is of type{type(self.host)},it should be of type{type('A')}")
		if isinstance(self.port,int)==False:
			self.exceptions["port"]=('T',f"port is of type{type(self.port)},it should be of type{type(10)}")
		if isinstance(self.database,str)==False:
			self.exceptions["databse"]=('T',f"database is of type{type(self.database)},it should be of type{type('A')}")
		if isinstance(self.user,str)==False:
			self.exceptions["user"]=('T',f"user is of type{type(self.user)},it should be of type{type('A')}")
		if isinstance(self.password,str)==False:
			self.exceptions["password"]=('T',f"password is of type{type(self.password)},it should be of type{type('A')}")
		if ('host' in self.exceptions)==False and len(self.host)==0:
			self.exceptions["host"]=('V',"host ip/name missing")
		if('port' in self.exceptions)==False and (self.port<=0 or self.port>=65535):
			self.exceptions["port"]=('V',f"port is {self.port},it should be >=1 and <=65535")
		if('database' in self.exceptions)==False and len(self.database)==0:
			self.exceptions["database"]=('V',"database name missing")
		if('user' in self.exceptions)==False and len(self.user)==0:
			self.exceptions["user"]=('V',"user missing")
		if('password' in self.exceptions)==False and len(self.password)==0:
			self.exceptions["password"]=('V',"password  missing")
		if len(self.exceptions)>0:self.has_exceptions=True

class DBUtility:
	def getDBConfiguration():
		if path.isfile("dbconfig.xml")==False:
			raise DataLayerException("dbConfig.xml with database connection details is missing,refer documentation")
		f=open("dbconfig.xml","r")
		try:
			xmlTree=ElementTree.parse(f)
		except ElementTree.ParseError as parseError:
			raise DataLayerException("contents of dbconfig.xml are malformed")
		finally:
			f.close()
		rootNode=xmlTree.getroot()
		host=None
		port=None
		database=None
		user=None
		password=None
		for node in rootNode:
			if node.tag=="host":host=node.text
			if node.tag=="port":port=node.text
			if node.tag=="name":database=node.text
			if node.tag=="user":user=node.text
			if node.tag=="password":password=node.text
		if port!=None:
			try:
				p=int(port)
			except:
				raise DataLayerException(f"port in dbconfig.xml is of typr{type(port)},it should be of type{type(10)}")
		return DBConfiguration(host,int(port),database,user,password)
