----------------------------------------------------------------------------------------
Instalar PGSQL 11 Ubuntu 18.04
----------------------------------------------------------------------------------------

sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main"
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-11

# Editar la configuracion
sudo vim /etc/postgresql/11/main/pg_hba.conf

# Cambiar el metodo a trust

>>>>>>>>>>>>

# Database administrative login by Unix domain socket
local   all             all                                     trust

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust

<<<<<<<<<<<<

sudo /etc/init.d/postgresql restart

----------------------------------------------------------------------------------------
Cambiar el directorio de base de datos
----------------------------------------------------------------------------------------

# Crear el directorio de datos
mkdir /u01/data/pgsql
sudo chown -R postgres:postgres /u01/data/pgsql

# Inicializar el directorio de datos
su postgres
/usr/lib/postgresql/11/bin/initdb -D /u01/data/pgsql

# Editar el archivo de configuracion
vim /etc/postgresql/11/main/postgresql.conf

# Cambiar el directorio

>>>>>>>>>>>>

data_directory = ‘/u01/data/pgsql’

<<<<<<<<<<<<

sudo /etc/init.d/postgresql restart
