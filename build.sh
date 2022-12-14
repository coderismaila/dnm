#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

python manage.py createsuperuser_if_none_exists --username $SUPERUSER_USERNAME --password $SUPERUSER_PASSWORD --email $SUPERUSER_EMAIL