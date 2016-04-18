## Steps to run WebApp
1. Clone the project
2. Run `npm install` inside the 'WebApp' directory
3. Run `bower install` inside the 'WebApp' directory
4. Create a directory 'data' inside the WebApp directory
5. Run `mongod --dbpath <path to WebApp directory>\data\`
6. Run `nodemon app.js`
7. Application will run on port 1399.

## Steps to run WeaveProxy
1. Run `source myvenv/bin/activate.csh` inside the 'WeaveProxy' directory to active the virtual environtment for Python
2. Run `python manage.py runserver 0.0.0.0:1398`
3. Application will run on port 1398.

### One time setup for WeaveProxy (inside the 'WeaveProxy' directory, only for the first time)
1. `virtualenv --python=python2.7 myvenv`
2. `source myvenv/bin/activate.csh`
3. `pip install django==1.9.5`
4. `pip install --upgrade google-api-python-client`
5. `python manage.py migrate`
6. `python manage.py runserver 0.0.0.0:1398`

> For testing purposes I have an instance of the server running on http://omega.myusc.net:1398 [DEA]
