# from django.shortcuts import render
from api.models import Word
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

# Create your views here.
def hangman(request, id):
    word = get_object_or_404(Word, pk=id)
    word = {
        'name': word.name,
        # 'word': word.word,
        # 'hint': word.hint
    }
    return JsonResponse(word)