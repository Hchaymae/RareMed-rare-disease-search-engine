import re
import numpy as np
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from .models import Term, InvertedIndex

# Tokenisation du texte
def tokenize_text(text):
    text = text.lower().replace('\n', ' ')
    text = text.replace('©️', '').replace('\u00A0', ' ')
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'\[.*?\]', '', text)
    words = word_tokenize(text)
    stop_words = set(stopwords.words('english'))

    return [
        word for word in words
        if word not in stop_words
        and len(word) > 2
        and not any(char in word for char in ['β', 'α', 'µ', 'δ', 'γ'])
        and not (word.isdigit() and len(word) > 4)
    ]

# Lemmatization des mots
def lemmatize_words(words):
    lemmatizer = WordNetLemmatizer()
    return [lemmatizer.lemmatize(word, pos='n') for word in words]

# Fonction pour associer la requête aux documents
def match_query_to_documents(query_string):
    # Étape 1: Prétraitement de la requête
    processed_query = tokenize_text(query_string)
    processed_query = lemmatize_words(processed_query)

    # Étape 2: Mapper les termes de la requête aux IDs des termes
    term_to_id = {term.term: term.termid for term in Term.objects.all()}
    query_term_ids = [term_to_id[term] for term in processed_query if term in term_to_id]

    if not query_term_ids:
        return []

    # Étape 3: Construction du vecteur de la requête
    query_vector = {}
    for term_id in query_term_ids:
        inverted_entries = InvertedIndex.objects.filter(termid_id=term_id)
        query_vector[term_id] = sum(entry.tf_idf for entry in inverted_entries)

    # Normalisation du vecteur de la requête
    query_norm = np.sqrt(sum(value ** 2 for value in query_vector.values()))
    query_vector = {term_id: value / query_norm for term_id, value in query_vector.items()}

    # Étape 4: Récupérer les vecteurs des documents
    doc_vectors = {}
    for term_id, tfidf_score in query_vector.items():
        term_entries = InvertedIndex.objects.filter(termid_id=term_id).select_related('docid')
        for entry in term_entries:
            doc_id = entry.docid_id
            doc_vectors.setdefault(doc_id, {}).setdefault(term_id, 0)
            doc_vectors[doc_id][term_id] += entry.tf_idf

    # Normalisation des vecteurs des documents
    for doc_id, vector in doc_vectors.items():
        norm = np.sqrt(sum(value ** 2 for value in vector.values()))
        doc_vectors[doc_id] = {term_id: value / norm for term_id, value in vector.items()}

    # Étape 5: Calcul de la similarité cosinus
    similarities = []
    for doc_id, vector in doc_vectors.items():
        similarity = sum(query_vector.get(term_id, 0) * vector.get(term_id, 0) for term_id in query_vector)
        similarities.append((doc_id, similarity))

    # Étape 6: Classer les documents par similarité
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)

    # Retourner les résultats sous forme de tuples (doc_id, similarity_score)
    return similarities  # [(doc_id, similarity_score), (doc_id, similarity_score), ...]
