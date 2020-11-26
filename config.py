import yaml

db = yaml.safe_load(open('db.yaml'))
MYSQL_HOST = db['mysql_host']
MYSQL_USER = db['mysql_user']
MYSQL_PASSWORD = db['mysql_password']
MYSQL_DB = db['mysql_database']
TEMPLATES_AUTO_RELOAD = True
