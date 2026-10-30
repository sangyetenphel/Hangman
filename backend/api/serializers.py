import re

from rest_framework import serializers
from .models import Word

WORD_PATTERN = re.compile(r"^[a-z]+$")


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        # fields = ['id', 'name', 'word', 'hint']
        fields = ['id', 'word']
        extra_kwargs = {'word': {'required': True, 'allow_blank': False, 'allow_null': False}}

    def validate_word(self, value):
        # The game's keyboard only has the letters a-z, so store words in lowercase
        word = value.strip().lower()
        if not WORD_PATTERN.match(word):
            raise serializers.ValidationError("Use letters only (a-z), with no spaces, numbers or symbols.")
        return word
