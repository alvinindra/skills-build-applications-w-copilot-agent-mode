from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes Team')
        dc = Team.objects.create(name='DC', description='DC Superheroes Team')

        self.stdout.write('Creating users...')
        users_data = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': marvel, 'is_superhero': True},
            {'name': 'Captain America', 'email': 'cap@marvel.com', 'team': marvel, 'is_superhero': True},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': dc, 'is_superhero': True},
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': dc, 'is_superhero': True},
        ]
        
        users = []
        for u_data in users_data:
            user = User.objects.create(**u_data)
            users.append(user)

        self.stdout.write('Creating activities...')
        Activity.objects.create(user=users[0], activity_type='Flying', duration=60, date=date.today())
        Activity.objects.create(user=users[2], activity_type='Training', duration=120, date=date.today())

        self.stdout.write('Creating workouts...')
        Workout.objects.create(name='Avenger Drill', description='High intensity training')
        Workout.objects.create(name='Justice League Routine', description='Strength and agility')

        self.stdout.write('Creating leaderboards...')
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data'))
