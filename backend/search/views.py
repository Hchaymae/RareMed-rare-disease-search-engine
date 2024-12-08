# from django.shortcuts import render
# from .models import Document
# from .utils import match_query_to_documents
# from rest_framework.decorators import api_view
# from rest_framework import status
# from django.http import JsonResponse
# from .serializers import DocumentWithScoreSerializer

# @api_view(['POST'])
# def search_view(request):
#     query = request.data.get('query')

#     if query:  # If the query is not empty
#         doc_ids_with_scores = match_query_to_documents(query)  # Get document IDs and their similarity scores
        
#         # Sort the documents by similarity score in descending order
#         doc_ids_with_scores.sort(key=lambda x: x[1], reverse=True)  # Sort by the second item (score)

#         # Extract the document IDs and scores
#         doc_ids = [doc_id for doc_id, _ in doc_ids_with_scores]
#         doc_scores = {doc_id: score for doc_id, score in doc_ids_with_scores}

#         # Retrieve the documents that match the IDs
#         documents = Document.objects.filter(id__in=doc_ids)

#         # Create a list of documents with their corresponding scores, ensuring that the order is preserved
#         doc_data = []
#         for doc_id in doc_ids:
#             doc = documents.get(id=doc_id)  # Get document by ID
#             score = doc_scores.get(doc.id, 0)  # Get the score for this document
#             doc_data.append({'document': doc, 'score': score})
        
#         print(doc_data)

#         serializer = DocumentWithScoreSerializer(doc_data, many=True)

#         return JsonResponse({'doc_data': serializer.data, 'query': query})
#     else:  # If the query is empty
#         return JsonResponse({'doc_data': [], 'query': query})


from django.shortcuts import render
from .models import Document
from .utils import match_query_to_documents
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from .serializers import DocumentWithScoreSerializer

@api_view(['POST'])
def search_view(request):
    query = request.data.get('query')

    if query:  # If the query is not empty
        doc_ids_with_scores = match_query_to_documents(query)  # Get document IDs and their similarity scores
        
        # Sort the documents by similarity score in descending order
        doc_ids_with_scores.sort(key=lambda x: x[1], reverse=True)  # Sort by the second item (score)

        # Extract the document IDs and scores
        doc_ids = [doc_id for doc_id, _ in doc_ids_with_scores]
        doc_scores = {doc_id: score for doc_id, score in doc_ids_with_scores}

        # Retrieve the documents that match the IDs
        documents = Document.objects.filter(id__in=doc_ids)

        # Create a list of documents with their corresponding scores, ensuring that the order is preserved
        doc_data = []
        for doc_id in doc_ids:
            doc = documents.get(id=doc_id)  # Get document by ID
            score = doc_scores.get(doc.id, 0)  # Get the score for this document
            doc_data.append({'document': doc, 'score': score})
        
        print(doc_data)

        # Serialize the documents with their corresponding scores
        serializer = DocumentWithScoreSerializer(doc_data, many=True)

        return JsonResponse({'doc_data': serializer.data, 'query': query})
    else:  # If the query is empty
        return JsonResponse({'doc_data': [], 'query': query})
