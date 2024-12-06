from django.db import models

class Document(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)

    class Meta:
        db_table = 'doc_list'
        managed = False

    def __str__(self):
        return self.title


class Term(models.Model):
    termid = models.AutoField(primary_key=True, db_column='termid')
    term = models.CharField(max_length=255, db_column='term')

    class Meta:
        db_table = 'term_dict'

    def __str__(self):
        return self.term


class InvertedIndex(models.Model):
    termid = models.ForeignKey(
        Term, on_delete=models.CASCADE, db_column='termid', related_name='inverted_indices'
    )  
    docid = models.ForeignKey(
        Document, on_delete=models.CASCADE, db_column='docid', related_name='inverted_indices'
    ) 
    freq = models.IntegerField() 
    tf_idf = models.FloatField()  
    positions = models.TextField() 

    class Meta:
        db_table = 'inverted_index'  

    def __str__(self):
        return f"TermID: {self.termid.term}, DocID: {self.docid.title}"

