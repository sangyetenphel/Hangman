from rest_framework import mixins, viewsets
from .models import Word
from .serializers import WordSerializer


# Only creating words is allowed. Listing, editing or deleting them would let
# anyone see every answer or wipe other players' games.
class WordView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
