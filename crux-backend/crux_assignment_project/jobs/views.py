import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UploadSerializer
import openai
from rest_framework import status
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.core.files.storage import default_storage
from django.conf import settings
logger = logging.getLogger(__name__)

@api_view(['POST'])
def upload_files(request):
    serializer = UploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        job_title = request.POST.get('jobTitle')
        job_description = request.POST.get('jobDescription')
        files = request.FILES.getlist('files')

        relevance_scores = {}
        for file in files:
            
            file_path = default_storage.save(file.name, file)
            file_url = settings.MEDIA_URL + file_path
            
            with default_storage.open(file_path) as f:
                resume_text = f.read()

            relevance_score = calculate_relevance_score(resume_text, job_description)
            relevance_scores[file.name] = relevance_score

        return Response({'relevance_scores': relevance_scores}, status=201)
    return Response(serializer.errors, status=400)

# def calculate_relevance_score_openai(resume_text, job_description):
#     prompt = f"Resume: {resume_text}\nJob Description: {job_description}\nRelevance Score:"
#     response = openai.Completion.create(
#         engine="text-davinci-002",  
#         prompt=prompt,
#         max_tokens=50,  
#         stop=["\n"],  
#         temperature=0,  
#         n=1,  
#         echo=False 
#     )
#     relevance_score = float(response.choices[0].text)
#     return relevance_score

# @csrf_exempt  
# def test_view(request):
#     logger.info("hello")
#     if request.method == 'POST':
#         # logger.error("hi")
#         data = json.loads(request.body)
#         # logger.error(f'Request body:{request.body}')
#         # logger.error(data)
#         message = data.get('message', 'No message provided')
#         # logger.error(message)
        
#         try:
#             return JsonResponse({'message': message})
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Only POST requests are allow'}, status=405)

def calculate_relevance_score(resume_text, job_description_text):
    text = [resume_text, job_description_text]  #tokenize

    count_vectorizer = CountVectorizer(decode_error='ignore').fit_transform(text)

    cosine_sim = cosine_similarity(count_vectorizer)

    relevance_score = cosine_sim[0][1]

    min_score = 0
    max_score = 10

    scaled_relevance_score = min_score + (max_score - min_score) * relevance_score

    return scaled_relevance_score*100