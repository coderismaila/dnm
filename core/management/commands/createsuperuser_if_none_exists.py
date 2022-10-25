from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """
    Create a superuser if none exists
    Example:
        manage.py createsuperuser_if_none_exists --user=admin --password=changeme
    """

    def add_arguments(self, parser):
        parser.add_argument("--username", required=True)
        parser.add_argument("--password", required=True)
        parser.add_argument("--email", default="admin@ketsa.com")
        return super().add_arguments(parser)

    def handle(self, *args, **options):
        User = get_user_model()

        if User.objects.exists():
            return

        username = options["username"]
        password = options["password"]
        email = options["email"]

        user = User.objects.create(
            username=username,
            email=email,
            is_staff=True,
            is_superuser=True,
        )
        user.set_password(password)
        user.is_staff = True
        user.is_superuser

        user.save()

        self.stdout.write(f'Local user "{username}" was created')
