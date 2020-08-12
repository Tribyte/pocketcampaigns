from adventurer.models import Adventurer
def adventurer_processor(request):
    if(not request.user.is_authenticated): return {}
    adventurer = Adventurer.objects.get(pk=request.user.pk)
    return { 'adventurer': adventurer }