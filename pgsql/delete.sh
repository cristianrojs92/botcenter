#! /bin/sh

#
# Elimina el usuario y la base de datos (leer README.txt para instrucciones de instalacion)
#

# Elimina la base de datos
sudo -u postgres /usr/lib/postgresql/11/bin/dropdb botcenterdb

# Elimina el usuario para la base de datos
sudo -u postgres /usr/lib/postgresql/11/bin/dropuser botcenteruser
