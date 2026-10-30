from django.test import TestCase

from api.models import Word


class SharedGameTests(TestCase):

    def test_returns_the_word_for_a_shared_game(self):
        word = Word.objects.create(word='apple')

        response = self.client.get(f'/hangman/{word.pk}')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'word': 'apple'})

    def test_unknown_game_returns_404(self):
        response = self.client.get('/hangman/9999')

        self.assertEqual(response.status_code, 404)
