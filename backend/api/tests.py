from rest_framework import status
from rest_framework.test import APITestCase

from .models import Word


class CreateWordTests(APITestCase):

    def test_creates_word_and_returns_its_id(self):
        response = self.client.post('/api/', {'word': 'apple'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Word.objects.get(pk=response.data['id']).word, 'apple')

    def test_stores_words_in_lowercase(self):
        # The game keyboard only has a-z, so "Apple" would otherwise be unsolvable
        response = self.client.post('/api/', {'word': '  Apple '}, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['word'], 'apple')

    def test_rejects_missing_or_empty_word(self):
        for payload in ({}, {'word': ''}, {'word': '   '}):
            response = self.client.post('/api/', payload, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, payload)

        self.assertEqual(Word.objects.count(), 0)

    def test_rejects_words_that_are_not_letters_only(self):
        for word in ('ice cream', 'r2d2', 'hello!'):
            response = self.client.post('/api/', {'word': word}, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, word)

    def test_rejects_words_longer_than_25_letters(self):
        response = self.client.post('/api/', {'word': 'a' * 26}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class WordPrivacyTests(APITestCase):

    def setUp(self):
        self.word = Word.objects.create(word='secret')

    def test_cannot_list_every_word(self):
        response = self.client.get('/api/')

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_cannot_read_edit_or_delete_words_through_the_api(self):
        url = f'/api/{self.word.pk}/'

        self.assertEqual(self.client.get(url).status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(self.client.put(url, {'word': 'changed'}, format='json').status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(self.client.delete(url).status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Word.objects.get(pk=self.word.pk).word, 'secret')
