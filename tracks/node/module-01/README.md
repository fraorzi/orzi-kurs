# Moduł 01 — strumieniowy analizator NDJSON

Pierwszy moduł wieloplikowy tracka Node: realny ticket zamiast pojedynczej
funkcji. Łączy framing linii (09), dekodowanie UTF-8 między chunkami (04),
limity zasobów (16), tolerancję błędów z budżetem oraz anulowanie przez
AbortSignal (05). Wejście jest strumieniowe — analiza działa w stałej
pamięci niezależnie od rozmiaru logu.
